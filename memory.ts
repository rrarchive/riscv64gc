export class memory {
  private mem: number[];

  constructor(size: number = 1024 * 1024 * 512) {
    this.mem = new Array<number>(size).fill(0);
  }

  readByte(address: number): number {
    return this.mem[address];
  }

  writeByte(address: number, value: number): void {
    this.checkValue(value);
    this.mem[address] = value;
  }

  readHalfWord(address: number): number {
    return this.mem[address] | (this.mem[address + 1] << 8);
  }

  writeHalfWord(address: number, value: number): void {
    this.checkValue(value);
    this.mem[address] = value & 0xff;
    this.mem[address + 1] = (value & 0xff00) >> 8;
  }

  readWord(address: number): number {
    return (
      this.mem[address] |
      (this.mem[address + 1] << 8) |
      (this.mem[address + 2] << 16) |
      (this.mem[address + 3] << 24)
    );
  }

  writeWord(address: number, value: number): void {
    this.checkValue(value);
    this.mem[address] = value & 0xff;
    this.mem[address + 1] = (value & 0xff00) >> 8;
    this.mem[address + 2] = (value & 0xff0000) >> 16;
    this.mem[address + 3] = (value & 0xff000000) >> 24;
  }

  readUnsignedByte(address: number): number {
    return this.mem[address] >>> 0;
  }

  readUnsignedHalfWord(address: number): number {
    return (this.mem[address] | (this.mem[address + 1] << 8)) >>> 0;
  }

  private checkValue(value: number): void {
    if (value < 0 || value > 0xff) throw new Error("Invalid value");
  }
}
