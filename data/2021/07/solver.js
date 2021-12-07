class Solver {
    positions = {}
    constructor(data) {
        for (let input of data) {
            this.positions[input] = (this.positions[input] ?? 0) + 1
        }
    }

    weight(shift) {
        return shift
    }

    get result() {
        const min = Math.min(...Object.keys(this.positions))
        const max = Math.max(...Object.keys(this.positions))
        const costs = []
        for (let i = min; i <= max; i++) {
            let cost = 0

            for (let [position, amount] of Object.entries(this.positions)) {
                const shift = Math.abs(position - i)
                cost += amount * this.weight(shift)
            }

            costs.push(cost)
        }
        return Math.min(...costs)
    }
}

class Solver2 extends Solver {
    weight(shift) {
        return shift * (shift + 1) / 2
    }
}

export function part1 (data, raw) {
    let solver = new Solver(raw.split(",").map(Number))

    return solver.result
}

export function part2 (data, raw) {
    let solver = new Solver2(raw.split(",").map(Number))

    return solver.result
}

