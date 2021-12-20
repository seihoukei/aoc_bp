class Solver {
    infinite = 0
    data = []

    constructor(data) {
        this.algorithm = [...data[0]].map(x => +(x==="#"))
        this.map = data.slice(2).map(x => [...(x + "..")].map(x => +(x==="#")))
    }

    step() {
        const empty = this.infinite * 7
        this.infinite = this.algorithm[this.infinite * 511]

        const sx = this.map[0].length
        const sy = this.map.length + 3

        for (let y = 0; y < this.map.length; y++) {
            let line = this.data[y] ??= []
            let char = empty
            for (let x = 0; x < sx; x++)
                line[x] = char = char << 1 & 6 | this.map[y][x]
        }

        for (let y = 0; y < sy; y++) {
            let line = this.map[y] ??= []
            for (let x = 0; x < sx; x++)
                line[x] = this.algorithm[
                    (this.data[y-2]?.[x] ?? empty) << 6 |
                    (this.data[y-1]?.[x] ?? empty) << 3 |
                    (this.data[y]?.[x] ?? empty)
                ]
            line[sx] = line[sx+1] = this.infinite
        }
    }

    enhance(steps) {
        for (let step = 0; step < steps; step++)
            this.step()
        return this.map.reduce((v,x) => v + [...x].reduce((v,x) => v + x), 0)
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver(data)

    return solver.enhance(2)
}

export function part2 (data, raw) {
    let solver = new Solver(data)

    return solver.enhance(50)
}

