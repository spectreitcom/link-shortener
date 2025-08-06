const BASE62_CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function toBase62(num: number) {
  if (num === 0) return '0';
  let result = '';
  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

function getBitsAsNumber(buffer: Buffer, startBit: number, length: number) {
  let value = 0;
  for (let i = 0; i < length; i++) {
    const bitIndex = startBit + i;
    const byteIndex = Math.floor(bitIndex / 8);
    const bitPosInByte = 7 - (bitIndex % 8);

    const bit = (buffer[byteIndex] >> bitPosInByte) & 1;
    value = (value << 1) | bit;
  }
  return value;
}

export function getBitsAsBase62(
  buffer: Buffer,
  startBit: number,
  length: number,
) {
  const num = getBitsAsNumber(buffer, startBit, length);
  return toBase62(num);
}
