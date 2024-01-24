export class mem {
  private mem: number[];

  constructor(size: number = 1024 * 1024 * 512) {
    this.mem = new Array<number>(size).fill(0);
  }

  read(address: number): number {
    return this.mem[address];
  }

  write(address: number, value: number): void {
    if (value >= 0 && value <= 0xff) {
      this.mem[address] = value;
    } else {
      throw new Error("Invalid value");
    }
  }
}
