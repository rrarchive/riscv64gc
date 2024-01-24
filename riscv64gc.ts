import { memory } from "./memory";

export class riscv64gc {
  private registers: number[];
  private mem: memory;

  constructor(m: memory) {
    this.registers = new Array<number>(32).fill(0);
    this.mem = m;
  }

  setRegister(index: number, value: number | number): void {
    if (index !== 0) this.registers[index] = value;
  }

  getRegister(index: number): number {
    return this.registers[index];
  }

  decode(instruction: number[]): { opcode: number; operands: number[] } {
    let instr =
      (instruction[0] |
        (instruction[1] << 8) |
        (instruction[2] << 16) |
        (instruction[3] << 24)) >>>
      0;

    let opcode = instr & 0x7f;
    let operands: number[] = [];

    let rd: number;
    let rs1: number;
    let rs2: number;
    let funct3: number;
    let funct7: number;
    let imm: number;
    let imm1: number;
    let imm2: number;
    let imm3: number;
    let imm4: number;

    switch (opcode) {
      case 0x33: // R-type format
        rd = (instr >>> 7) & 0x1f;
        funct3 = (instr >>> 12) & 0x7;
        rs1 = (instr >>> 15) & 0x1f;
        rs2 = (instr >>> 20) & 0x1f;
        funct7 = (instr >>> 25) & 0x7f;
        operands = [rd, funct3, rs1, rs2, funct7];
        break;
      case 0x13: // I-type format
      case 0x3: // I-type format
        rd = (instr >>> 7) & 0x1f;
        funct3 = (instr >>> 12) & 0x7;
        rs1 = (instr >>> 15) & 0x1f;
        imm = (instr >>> 20) & 0xfff;
        operands = [rd, funct3, rs1, imm];
        break;
      case 0x23: // S-type format
        imm1 = (instr >>> 7) & 0x1f;
        funct3 = (instr >>> 12) & 0x7;
        rs1 = (instr >>> 15) & 0x1f;
        rs2 = (instr >>> 20) & 0x1f;
        imm2 = (instr >>> 25) & 0x1f;
        imm = (imm1 | (imm2 << 5)) & 0xfff;
        operands = [funct3, rs1, rs2, imm];
        break;
      case 0x63: // SB-type format
        imm1 = (instr >>> 7) & 0x1f;
        funct3 = (instr >>> 12) & 0x7;
        rs1 = (instr >>> 15) & 0x1f;
        rs2 = (instr >>> 20) & 0x1f;
        imm2 = (instr >>> 25) & 0x3f;
        imm = (imm1 | (imm2 << 5)) & 0xfff;
        operands = [funct3, rs1, rs2, imm];
        break;
      case 0x37: // U-type format
      case 0x17: // U-type format
        rd = (instr >>> 7) & 0x1f;
        imm = (instr >>> 12) & 0xfffff;
        operands = [rd, imm];
        break;
      case 0x6f: // UJ-type format
        rd = (instr >>> 7) & 0x1f;
        imm1 = (instr >>> 12) & 0xff;
        imm2 = (instr >>> 20) & 0x1;
        imm3 = (instr >>> 21) & 0x3ff;
        imm4 = (instr >>> 31) & 0x1;
        imm = (imm1 | (imm2 << 8) | (imm3 << 9) | (imm4 << 19)) & 0xfffff;
        operands = [rd, imm];
        break;
      default:
        break;
    }

    return { opcode, operands };
  }

  execute(executable: number[]): void {
    for (let pc = 0; pc < executable.length; pc += 4) {
      let instruction = executable.slice(pc, pc + 4);
      let { opcode, operands } = this.decode(instruction);
      switch (opcode) {
        case 0x33: // R-type format
          let rd = operands[0];
          let funct3 = operands[1];
          let rs1 = operands[2];
          let rs2 = operands[3];
          let funct7 = operands[4];
          switch (funct3) {
            case 0x0: // add
              this.registers[rd] = this.registers[rs1] + this.registers[rs2];
              break;
            case 0x1: // sll
              this.registers[rd] = this.registers[rs1] << this.registers[rs2];
              break;
            case 0x2: // slt
              this.registers[rd] =
                this.registers[rs1] < this.registers[rs2] ? 1 : 0;
              break;
            case 0x3: // sltu
              this.registers[rd] =
                this.registers[rs1] < this.registers[rs2] ? 1 : 0;
              break;
            case 0x4: // xor
              this.registers[rd] = this.registers[rs1] ^ this.registers[rs2];
              break;
            case 0x5: // srl
              this.registers[rd] = this.registers[rs1] >> this.registers[rs2];
              break;
            case 0x6: // or
              this.registers[rd] = this.registers[rs1] | this.registers[rs2];
              break;
            case 0x7: // and
              this.registers[rd] = this.registers[rs1] & this.registers[rs2];
              break;
            case 0x20: // sub
              this.registers[rd] = this.registers[rs1] - this.registers[rs2];
              break;
            default:
              break;
          }
          break;
        case 0x13: // I-type format
          rd = operands[0];
          funct3 = operands[1];
          rs1 = operands[2];
          let imm = operands[3];
          switch (funct3) {
            case 0x0: // addi
              this.registers[rd] = this.registers[rs1] + imm;
              break;
            case 0x1: // slli
              this.registers[rd] = this.registers[rs1] << imm;
              break;
            case 0x2: // slti
              this.registers[rd] = this.registers[rs1] < imm ? 1 : 0;
              break;
            case 0x3: // sltiu
              this.registers[rd] = this.registers[rs1] < imm ? 1 : 0;
              break;
            case 0x4: // xori
              this.registers[rd] = this.registers[rs1] ^ imm;
              break;
            case 0x5: // srli
              this.registers[rd] = this.registers[rs1] >> imm;
              break;
            case 0x6: // ori
              this.registers[rd] = this.registers[rs1] | imm;
              break;
            case 0x7: // andi
              this.registers[rd] = this.registers[rs1] & imm;
              break;
            case 0x20: // subi
              this.registers[rd] = this.registers[rs1] - imm;
              break;
            default:
              break;
          }
          break;
        case 0x3: // I-type format
          rd = operands[0];
          funct3 = operands[1];
          rs1 = operands[2];
          imm = operands[3];
          switch (funct3) {
            case 0x0: // lb
              this.registers[rd] = this.mem.readByte(this.registers[rs1] + imm);
              break;
            case 0x1: // lh
              this.registers[rd] = this.mem.readHalfWord(
                this.registers[rs1] + imm
              );
              break;
            case 0x2: // lw
              this.registers[rd] = this.mem.readWord(this.registers[rs1] + imm);
              break;
            case 0x4: // lbu
              this.registers[rd] = this.mem.readUnsignedByte(
                this.registers[rs1] + imm
              );
              break;
            case 0x5: // lhu
              this.registers[rd] = this.mem.readUnsignedHalfWord(
                this.registers[rs1] + imm
              );
              break;
            default:
              break;
          }
          break;
        case 0x23: // S-type format
          funct3 = operands[0];
          rs1 = operands[1];
          rs2 = operands[2];
          imm = operands[3];
          switch (funct3) {
            case 0x0: // sb
              this.mem.writeByte(
                this.registers[rs1] + imm,
                this.registers[rs2]
              );
              break;
            case 0x1: // sh
              this.mem.writeHalfWord(
                this.registers[rs1] + imm,
                this.registers[rs2]
              );
              break;
            case 0x2: // sw
              this.mem.writeWord(
                this.registers[rs1] + imm,
                this.registers[rs2]
              );
              break;
            default:
              break;
          }
          break;
        case 0x63: // SB-type format
          funct3 = operands[0];
          rs1 = operands[1];
          rs2 = operands[2];
          imm = operands[3];
          switch (funct3) {
            case 0x0: // beq
              if (this.registers[rs1] === this.registers[rs2]) {
                pc += imm << 2;
              }
              break;
            case 0x1: // bne
              if (this.registers[rs1] !== this.registers[rs2]) {
                pc += imm << 2;
              }
              break;
            case 0x4: // blt
              if (this.registers[rs1] < this.registers[rs2]) {
                pc += imm << 2;
              }
              break;
            case 0x5: // bge
              if (this.registers[rs1] >= this.registers[rs2]) {
                pc += imm << 2;
              }
              break;
            case 0x6: // bltu
              if (this.registers[rs1] >>> 0 < this.registers[rs2] >>> 0) {
                pc += imm << 2;
              }
              break;
            case 0x7: // bgeu
              if (this.registers[rs1] >>> 0 >= this.registers[rs2] >>> 0) {
                pc += imm << 2;
              }
              break;
            default:
              break;
          }
          break;
        case 0x37: // U-type format
          rd = operands[0];
          imm = operands[1];
          this.registers[rd] = imm;
          break;
        case 0x17: // U-type format
          rd = operands[0];
          imm = operands[1];
          this.registers[rd] = imm;
          break;
        case 0x6f: // UJ-type format
          rd = operands[0];
          imm = operands[1];
          this.registers[rd] = imm;
          break;
        default:
          break;
      }
    }
  }
}
