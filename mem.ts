export class mem {
  private mem: Uint8Array;

  constructor(size: number = 1024 * 1024 * 512) { // Default size: 512MB
    this.mem = new Uint8Array(size);
  }

  read(address: number): number {
    return this.mem[address];
  }

  write(address: number, value: number): void {
    this.mem[address] = value;
  }
}
