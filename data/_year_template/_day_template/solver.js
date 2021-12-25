class Solver {
    constructor(data) {
        for (let input of data) {
        }
    }

    get result() {
        return 0
    }
}

class Solver2 {
    get result() {
        return 0
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