class Solver {
    infinite = 0
    map = []
    data = []

    constructor(data) {
        this.algorithm = [...data[0]].map(x => +(x==="#"))
        for (let input of data.slice(2)) {
            let char = 0
            const line = [...(input + "..")].map(x => char = char << 1 & 6 | +(x==="#"))
            this.map.push(line)
        }
    }

    step() {
        const empty = this.infinite * 7
        this.infinite = this.algorithm[this.infinite * 511]
        const newChar = this.infinite * 7

        const sx = this.map[0].length
        const sy = this.map.length + 2

        ;[this.data, this.map] = [this.map, this.data]

        for (let y = 0; y < sy; y++) {
            let line = this.map[y] ??= []
            let char = newChar
            for (let x = 0; x < sx; x++)
                line[x] = char = char << 1 & 6 | this.algorithm[
                    (this.data[y-2]?.[x] ?? empty) << 6 |
                    (this.data[y-1]?.[x] ?? empty) << 3 |
                    (this.data[y]?.[x] ?? empty)
                ]
            line[sx] = char = char << 1 & 6 | this.infinite
            line[sx+1] = char = char << 1 & 6 | this.infinite
        }
    }

    enhance(steps) {
        for (let step = 0; step < steps; step++)
            this.step()
        return this.map.reduce((v,x) => v + x.reduce((v,x) => v + (x & 1)), 0)
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
