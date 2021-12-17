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
    get result() {
        let count = 0
        this.x0 = +this.x0
        this.y0 = +this.y0
        this.x1 = +this.x1
        this.y1 = +this.y1
        for (let dx = 1; dx <= this.x1; dx++)
            for (let dy = this.y0; dy < -this.y0; dy++) {
                let x = 0
                let y = 0
                let vx = dx
                let vy = dy
                while (y >= this.y0) {
                    x += vx
                    y += vy
                    if (vx > 0)
                        vx--
                    vy -= 1
                    if (x >= this.x0 && x <= this.x1 && y >= this.y0 && y <= this.y1) {
                        count++
                        break
                    }
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

