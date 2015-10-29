import * as ftp from './ftp';
import * as files from './files';

['getFile', 'children', 'isDirectory', 'readFile', 'writeFile',
 'createFile', 'createDirectory', 'remove', 'move', 'copy'].forEach(method => {
   exports[method] = (...args) => {
     return window.ftpMode ? ftp[method](...args) : files[method](...args);
   }
 });

let CACHE = files.CACHE;
let FTP_CACHE = ftp.FTP_CACHE;

export { CACHE, FTP_CACHE };
