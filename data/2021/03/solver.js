class Counter {
    constructor(data) {
        for (let input of data)
            this.calculate(input.trim())
    }

    calculate(bits) {
        this.amounts ??= []
        for (let i = 0; i < bits.length; i++) {
            this.amounts[i] = (this.amounts[i] ?? 0) + (bits[i] === "1" ? 1 : -1)
        }
    }

    getBinary(reverse = false) {
        return this.amounts.map(x => (x > 0 ^ reverse) ? "1" : "0").join("")
    }

    get maxBits() {
        return parseInt(this.getBinary(), 2)
    }

    get minBits() {
        return parseInt(this.getBinary(true), 2)
    }
}

class Scanner extends Counter{
    calculate(bits) {
        this.entries ??= {}

        for (let i = 0; i < bits.length; i++) {
            const entry = bits.slice(0, i+1)
            this.entries[entry] = (this.entries[entry] ?? 0) + 1
        }
    }

    getBinary(reverse = false) {
        let value = ""
        const entries = this.entries

        while (true) {
            if (!entries[value + "1"]) {
                if (!entries[value + "0"])
                    break
                value += "0"
                continue
            }

            if (!entries[value + "0"]) {
                value += "1"
                continue
            }

            if (reverse ^ entries[value + "1"] >= entries[value + "0"])
                value += "1"
            else
                value += "0"
        }

        return value
    }
}

export function part1 (data) {
    const counter = new Counter(data)

    return counter.maxBits * counter.minBits
}

export function part2 (data) {
    const scanner = new Scanner(data)

    return scanner.maxBits * scanner.minBits
}