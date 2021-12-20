class Solver {
    infinite = "."

    constructor(data) {
        this.conversion = data[0]
        this.map = data.slice(2)
    }

    step() {
        const newMap = []
        for (let y = 0; y < this.map.length + 3; y++) {
            let line = ""
            for (let x = 0; x < this.map[0].length + 3; x++) {
                let value = 0
                for (let dy = 0; dy < 3; dy++)
                    for (let dx = 0; dx < 3; dx++) {
                        value *= 2
                        value += (this.map[y+dy-2]?.[x+dx-2] ?? this.infinite) === "#" ? 1 : 0
                    }
                line += this.conversion[value]
            }
            newMap.push(line)
        }
        this.map = newMap
        this.infinite = this.conversion[this.infinite === "." ? 0 : 511]
    }

    result(steps) {
        for (let step = 0; step < steps; step++)
            this.step()
        return this.map.reduce((v,x) => v + [...x].reduce((v,x) => v + (x === "#" ? 1 : 0),0), 0)
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

