export class mem {
  constructor(size = 1024 * 1024 * 512) {
    // Default size: 512MB
    this.mem = new Uint8Array(size);
  }

  read(address) {
    return this.mem[address];
  }

  write(address, value) {
    this.mem[address] = value;
  }
}
