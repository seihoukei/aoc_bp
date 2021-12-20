class Solver {
    bits = new Set()
    infinite = 0

    constructor(data) {
        this.conversion = data[0]
        let y = 0
        this.x0 = -1
        this.x1 = data[2].length
        this.y0 = -1
        for (let input of data.slice(2)) {
            [...input].map((b,x) => b === "#" ? this.bits.add(`${x},${y}`) : 0)
            y++
        }
        this.y1 = y
    }

    step() {
        let nextBits = new Set()
        for (let y = this.y0 - 1; y <= this.y1 + 1; y++){
            for (let x = this.x0 - 1; x <= this.x1 + 1; x++) {
                let value = 0
                for (let dy = -1; dy <= 1; dy++)
                    for (let dx = -1; dx <= 1; dx++) {
                        value *= 2
                        if (x + dx <= this.x0 || x + dx >= this.x1 || y + dy <= this.y0 || y + dy >= this.y1)
                            value += this.infinite
                        else
                            value += this.bits.has(`${x + dx},${y + dy}`) ? 1 : 0
                    }
                    if (this.conversion[value] === "#")
                        nextBits.add(`${x},${y}`)
            }
        }
        this.infinite = (this.conversion[this.infinite ? 511 : 0] === "#") ? 1 : 0
        this.x0 -= 1
        this.y0 -= 1
        this.x1 += 1
        this.y1 += 1
        this.bits = nextBits
    }

    log() {
        for (let y = this.y0; y <= this.y1; y++) {
            let s = ""
            for (let x = this.x0; x <= this.x1; x++) {
                s += this.bits.has(`${x},${y}`) ? "#" : "."
            }
            console.log(s)
        }
    }

    result(steps) {
        for (let step = 0; step < steps; step++)
            this.step()
        return this.bits.size
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver(data)

    return solver.result(2)
}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
    let solver = new Solver(data)

    return solver.result(50)
}

