import { Memory } from './memory.js';

export class CPU {
    constructor() {
        // General-Purpose Registers
        this.ax = 0; // Accumulator Register
        this.bx = 0; // Base Register
        this.cx = 0; // Count Register
        this.dx = 0; // Data Register

        // Index Registers
        this.si = 0; // Source Index
        this.di = 0; // Destination Index

        // Pointer Registers
        this.sp = 0; // Stack Pointer
        this.bp = 0; // Base Pointer
        this.ip = 0; // Instruction Pointer

        // Segment Registers
        this.cs = 0; // Code Segment
        this.ds = 0; // Data Segment
        this.ss = 0; // Stack Segment
        this.es = 0; // Extra Segment
        this.fs = 0; // Additional Segment (FS)
        this.gs = 0; // Additional Segment (GS)

        // Flags Register (EFLAGS)
        this.flags = {
            cf: 0, // Carry Flag
            pf: 0, // Parity Flag
            af: 0, // Auxiliary Carry Flag
            zf: 0, // Zero Flag
            sf: 0, // Sign Flag
            tf: 0, // Trap Flag
            if: 0, // Interrupt Enable Flag
            df: 0, // Direction Flag
            of: 0, // Overflow Flag
            iopl: 0, // I/O Privilege Level
            nt: 0, // Nested Task Flag
            rf: 0, // Resume Flag
            vm: 0, // Virtual 8086 Mode Flag
            ac: 0, // Alignment Check
            vif: 0, // Virtual Interrupt Flag
            vip: 0, // Virtual Interrupt Pending
            id: 0  // ID Flag
        };

        // Control Registers
        this.cr0 = 0;
        this.cr1 = 0; // Reserved, not used in i486
        this.cr2 = 0;
        this.cr3 = 0;
        this.cr4 = 0;

        // Floating-Point Unit (FPU) Registers
        this.fpu = new Array(8).fill(0); // st0 to st7
    }

    execute(instruction) {
        // Decode and execute the instruction
        // This will involve checking the opcode, operands, modifying registers, flags, and memory
        // Example: this.ax = this.bx + this.cx; if this is what the instruction dictates
        // Update CPU state accordingly
    }
}
