class Solver {
    bits = ""

    constructor(data) {
        for (let input of data[0]) {
            this.bits += `0000${Number(`0x${input}`).toString(2)}`.slice(-4)
        }
        this.packet = this.getPacket()
    }

    readBits(x) {
        const result = +`0b${this.bits.slice(0,x)}`
        this.bits = this.bits.slice(x)
        return result
    }

    getPacket() {
        const packet = {
            version : this.readBits(3),
            id : this.readBits(3),
        }
        if (packet.id === 4) {
            packet.value = 0
            while (this.readBits(1)) {
                packet.value = packet.value * 16 + this.readBits(4)
            }
            packet.value = packet.value * 16 + this.readBits(4)
        } else {
            packet.subpackets = []
            if (this.readBits(1)) {
                const amount = this.readBits(11)
                for (let i = 0; i < amount; i++)
                    packet.subpackets.push(this.getPacket(false))
            } else {
                const amount = this.readBits(15)
                const l = this.bits.length - amount
                while (this.bits.length > l)
                    packet.subpackets.push(this.getPacket())
            }
        }
        return packet
    }

    getVersion(packet) {
        return packet.version + (packet.subpackets ? packet.subpackets.reduce((v,x) => v + this.getVersion(x), 0) : 0)
    }

    get result() {
//        return JSON.stringify(this.packets)
        return this.getVersion(this.packet)
    }
}

class Solver2 extends Solver {
    calculatePacket(packet) {
        switch (packet.id) {
            case 0:
                return packet.subpackets.reduce((v,x) => v + this.calculatePacket(x), 0)
                break;
            case 1:
                return packet.subpackets.reduce((v,x) => v * this.calculatePacket(x), 1)
                break;
            case 2:
                return Math.min(...packet.subpackets.map(x => this.calculatePacket(x)))
                break;
            case 3:
                return Math.max(...packet.subpackets.map(x => this.calculatePacket(x)))
                break;
            case 4:
                return packet.value
                break;
            case 5:
                return this.calculatePacket(packet.subpackets[0]) > this.calculatePacket(packet.subpackets[1]) ? 1 : 0
                break;
            case 6:
                return this.calculatePacket(packet.subpackets[0]) < this.calculatePacket(packet.subpackets[1]) ? 1 : 0
                break;
            case 7:
                return this.calculatePacket(packet.subpackets[0]) == this.calculatePacket(packet.subpackets[1]) ? 1 : 0
                break;
        }
    }

    get result() {
        return this.calculatePacket(this.packet)
//        return this.packets.reduce((v,x) => v + this.getVersion(x), 0)
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver(data)

    return solver.result
}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
    let solver = new Solver2(data)

    return solver.result
}

