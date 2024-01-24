export class riscv64gc {
  constructor() {
    // General-Purpose Registers
  }

  execute(executable_as_bytearray) {
    for (let i = 0; i < executable_as_bytearray.length; i += 4) {
      const instruction = executable_as_bytearray.slice(i, i + 4);
      const { opcode, operands } = this.decode(instruction);

      switch (opcode) {
        case "ADD":
          // Example for an ADD instruction
          break;
        // Other cases for different opcodes go here
        // ...
        default:
          console.error("Unknown opcode:", opcode);
          break;
      }
    }
  }

  decode(instruction) {
    // ...
  }
}
