export class Memory {
    constructor(size = 1024 * 1024 * 512) { // Default size: 512MB
        this.memory = new Uint8Array(size);
    }

    read(address) {
        return this.memory[address];
    }

    write(address, value) {
        this.memory[address] = value;
    }
}
