import { refresh } from 'actions/files-view';
import { bind } from 'store';
import EventEmitter from 'events';
import { humanSize, reportError, normalize, type, getLength } from 'utils';

export let FTP_CACHE = {};
let socket;
let connection = new EventEmitter();
connection.setMaxListeners(99);

export let queue = Object.assign([], EventEmitter.prototype);

export async function connect(properties = {}) {
  let { host, port, username, password } = properties;

  let url = encodeURI(host);
  socket = navigator.mozTCPSocket.open(url, port);

  socket.ondata = e => {
    console.log('<', e.data);
    connection.emit('data', e.data);
  }

  socket.onerror = e => {
    connection.emit('error', e.data);
  }

  socket.onclose = e => {
    connection.emit('close', e.data);
  }

  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      send(`USER ${username}`);
      send(`PASS ${password}`);
      resolve(socket);

      window.ftpMode = true;
    }

    socket.onerror = reject;
    socket.onclose = reject;
  });
}

export async function disconnect() {
  socket.close();
  window.ftpMode = false;
}

export function listen(ev, fn) {
  socket.listen(ev, fn);
}

export function send(command, ...args) {
  args = args.filter(arg => arg);
  let cmd = command + (args.length ? ' ' : '') + args.join(' ');

  console.log('>', cmd);
  socket.send(cmd + '\n');
}

export async function cwd(dir = '') {
  send('CWD', dir);
}

const PWD_REGEX = /257 "(.*)"/;
export async function pwd() {
  return new Promise((resolve, reject) => {
    connection.on('data', function listener(data) {
      if (data.indexOf('current directory') === -1) return;
      let dir = data.match(PWD_REGEX)[1];
      resolve(normalize(dir));

      connection.removeListener('data', listener);
    });

    send('PWD');
  });
}

export async function pasv() {
  return new Promise((resolve, reject) => {
    connection.on('data', function listener(data) {
      if (data.indexOf('Passive') === -1) return;

      // format: |||port|
      let port = parseInt(data.match(/\|{3}(\d+)\|/)[1]);

      connection.removeListener('data', listener);

      resolve(port);
    });

    send('EPSV');
  });
}

const LIST_EXTRACTOR = /(.*?)\s+(\d+)\s+(\w+)\s+(\w+)\s+(\w+)\s+(\w+)\s+(\d+)\s+(\d+:?\d+)+\s+(.*)/;
export async function list(dir = '') {
  let index = queue.push(port => {
    return secondary({ host: socket.host, port }).then(({data}) => {
      send('LIST', dir);

      return data.then(items => {
        return items.split('\n').map(item => {
          if (item.indexOf('total') > -1 || !item) return;

          let match = item.match(LIST_EXTRACTOR);

          return {
            path: normalize(dir + '/'),
            type: match[1][0] === 'd' ? 'Directory' : 'File',
            permissions: match[1].slice(1),
            links: +match[2],
            owner: match[3],
            group: match[4],
            size: +match[5],
            lastModification: {
              month: match[6],
              day: match[7],
              time: match[8]
            },
            name: match[9]
          }
        }).filter(item => item);
      }, reportError)
    });
  });

  return handleQueue(index - 1);
}

export async function namelist(dir = '') {
  let index = queue.push(port => {
    return secondary({ host: socket.host, port }).then(({data}) => {
      send('NLST', dir);

      return data.then(names => names.split('\n'), reportError);
    });
  });

  return handleQueue(index - 1);
}

export async function secondary(properties = {}) {
  let { host, port } = properties;

  let url = encodeURI(host);

  send('TYPE', 'I');

  return new Promise((resolve, reject) => {
    let alt = navigator.mozTCPSocket.open(url, port);

    alt.onopen = e => {
      let data = new Promise((resolve, reject) => {
        let d = '';
        alt.ondata = e => {
          d += e.data;
        }
        alt.onerror = e => {
          reject(e.data);
        }
        alt.onclose = e => {
          console.log('<<', d);
          resolve(d);
        }
      });
      resolve({data});
    }
  })
}

const BUFFER_SIZE = 32000;
export async function secondaryWrite(properties = {}, content) {
  let { host, port } = properties;

  let url = encodeURI(host);

  send('TYPE', 'I');

  return new Promise((resolve, reject) => {
    let alt = navigator.mozTCPSocket.open(url, port);

    alt.onopen = () => {
      console.log('>>', content);
      let step = 0;

      (function send() {
        if (!content) return;

        let chunk = content.slice(0, BUFFER_SIZE);
        content = content.slice(BUFFER_SIZE);

        if (alt.send(chunk)) {
          send();
        } else {
          alt.ondrain = () => {
            console.log('drain');
            send();
          }
        }
      }());
    }

    alt.onclose = () => {
      resolve();
    }
  })
}

export async function children(dir = '', gatherInfo) {
  dir = normalize(dir);
  if (FTP_CACHE[dir]) return FTP_CACHE[dir];

  let childs = gatherInfo ? await list(dir) : await namelist(dir);

  FTP_CACHE[dir] = childs;

  return childs;
}

export async function getFile(path = '') {
  path = normalize(path);

  let ls = await list(path);

  return ls[0];
}

export async function isDirectory(path = '') {
  return (await getFile(path)).type === 'Directory';
}

export async function readFile(path = '') {
  path = normalize(path);

  let index = queue.push(port => {
    return secondary({ host: socket.host, port }).then(({data}) => {
      send('RETR', path);

      return data;
    });
  })

  return handleQueue(index - 1);
}

export async function writeFile(path = '', content) {
  let index;
  path = normalize(path);

  if (type(content) === 'Blob') {
    let reader = new FileReader();

    index = queue.push(port => {
      return new Promise((resolve, reject) => {
        reader.addEventListener('loadend', () => {
          send('TYPE', 'I');
          send('STOR', path);

          secondaryWrite({ host: socket.host, port }, reader.result)
          .then(resolve, reject);
        });

        reader.readAsBinaryString(content);
      })
    });
  } else {
    index = queue.push(port => {
      send('STOR', path);
      return secondaryWrite({ host: socket.host, port }, content);
    });
  }

  return handleQueue(index - 1);
}

export async function createFile(path = '') {
  return writeFile(path, '');
}

export async function createDirectory(path = '') {
  path = normalize(path);

  send('MKD', path);
}

export async function remove(path = '') {
  path = normalize(path);

  let ls = await list(path);
  send('DELE', path);
  send('DELE', path + '/*.*');
  send('RMD', path);
}

export async function move(file, newPath = '') {
  let path = normalize(file.path + file.name);
  newPath = normalize(newPath);

  send('RNFR', path);
  send('RNTO', newPath);
}

export async function copy(file, newPath = '') {
  let path = normalize(file.path + file.name);
  newPath = normalize(newPath);

  let content = await readFile(path);
  console.log(content);

  return writeFile(newPath, content);
}

const LOOP_INTERVAL = 100;
(function loopQueue() {
  if (queue.length) {
    pasv().then(queue[0]).then(result => {
      queue.emit('done', {listener: queue[0], result});
      queue.splice(0, 1);
      loopQueue();
    });
  } else {
    setTimeout(loopQueue, LOOP_INTERVAL);
  }
}());

async function handleQueue(index) {
  let fn = queue[index];

  return new Promise(resolve => {
    queue.on('done', ({listener, result}) => {
      if (listener === fn) resolve(result);
    });
  });
}
