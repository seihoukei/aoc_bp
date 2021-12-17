class Solver {
    constructor(data) {
        //target area: x=20..30, y=-10..-5
        Object.assign(this, data[0].match(/x=(?<x0>[-0-9]+)\.\.(?<x1>[-0-9]+), y=(?<y0>[-0-9]+)\.\.(?<y1>[-0-9]+)/).groups)
    }

    get result() {
        const ymax = -this.y0

        return ymax * (ymax - 1) / 2
    }
}

class Solver2 extends Solver {
    getStep(dy, y) {
        const d = (2 * dy + 1) ** 2 - 8 * y
        return ((2 * dy + 1) + d ** 0.5) / 2
    }

    getDx(step, x) {
        return x / step + (step - 1) / 2
    }

    get result() {
        let count = 0

        for (let dy = +this.y0; dy < -this.y0; dy++) {
            const start = Math.ceil(this.getStep(dy, +this.y1))
            const end = Math.floor(this.getStep(dy, +this.y0))
            for (let step = start; step <= end; step++) {
                const right = Math.floor(this.getDx(step, +this.x1))
                const left = Math.ceil(this.getDx(step, +this.x0))
                count += right - left + 1
            }
        }
        return count
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

