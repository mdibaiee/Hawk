import { COMPRESS, DECOMPRESS } from './types';

export function compress(file, name) {
  return {
    type: COMPRESS,
    file, name
  }
}

export function decompress(file) {
  return {
    type: DECOMPRESS,
    file
  }
}
