class Counter {
    amounts = []

    constructor(data) {
        for (let input of data)
            this.calculate(input.trim())
    }

    calculate(bits) {
        for (let i = 0; i < bits.length; i++) {
            this.amounts[i] = (this.amounts[i] ?? 0) + (bits[i] === "1" ? 1 : -1)
        }
    }

    getBinary(reverse = false) {
        return this.amounts.map(x => (x > 0 ^ reverse) ? "1" : "0").join("")
    }

    get gamma() {
        return parseInt(this.getBinary(), 2)
    }

    get epsilon() {
        return parseInt(this.getBinary(true), 2)
    }
}

class Scanner {
    entries = {}

    constructor(data) {
        for (let input of data) {
            for (let i = 0; i < input.length; i++) {
                const entry = input.slice(0, i+1)
                this.entries[entry] = (this.entries[entry] ?? 0) + 1
            }
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

    get oxygen() {
        return parseInt(this.getBinary(), 2)
    }

    get co2() {
        return parseInt(this.getBinary(true), 2)
    }
}

export function part1 (data) {
    const counter = new Counter(data)

    return counter.gamma * counter.epsilon
}

export function part2 (data) {
    const scanner = new Scanner(data)

    return scanner.oxygen * scanner.co2
}