export class riscv64gc {
  constructor() {
    // General-Purpose Registers
    this.registers = new Array(32).fill(BigInt(0));
    // x0 is hardwired to zero and cannot be changed.
    this.registers[0] = BigInt(0);
  }

  setRegister(index, value) {
    if (index === 0) {
      console.error("Cannot modify x0 register");
      return;
    }
    this.registers[index] = BigInt(value);
  }

  getRegister(index) {
    return this.registers[index];
  }

  decode(instruction) {
    // ...
  }

  execute(executable_as_bytearray) {
    for (let i = 0; i < executable_as_bytearray.length; i += 4) {
      const instruction = executable_as_bytearray.slice(i, i + 4);
      const { opcode, operands } = this.decode(instruction);
      // ...
    }
  }
}
