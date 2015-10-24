import { COMPRESS, DECOMPRESS } from './types';

export function compress(file) {
  return {
    type: COMPRESS,
    file
  }
}

export function decompress(file) {
  return {
    type: DECOMPRESS,
    file
  }
}
