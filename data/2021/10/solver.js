class Solver {
    static COSTS = {
        '(' : 1,
        '[' : 2,
        '{' : 3,
        '<' : 4,
        ')' : 3,
        ']' : 57,
        '}' : 1197,
        '>' : 25137,
    }

    lines = []
    stack = []

    constructor(data) {
        for (let input of data) {
            this.lines.push(input)
        }
    }

    checkLine(line) {
        this.stack.length = 0
        for (let item of [...line]) {
            if (item === '(' || item === '[' || item === '{' || item === '<') {
                this.stack.push(item)

            } else {
                const pair = this.stack.pop() + item
                if (pair === '()' || pair === '[]' || pair === '{}' || pair === '<>')
                    continue
                this.fail(item)
                return
            }
        }
        this.success()
    }

    execute() {
        for (let line of this.lines) {
            this.checkLine(line)
        }
        return this.result
    }

    fail(item) {}

    success() {}

    get result() {
        return 0
    }
}

class Solver1 extends Solver {
    output = 0

    fail(item) {
        this.output += Solver.COSTS[item]
    }

    get result() {
        return this.output
    }
}

class Solver2 extends Solver {
    values = []

    success() {
        let x, value = 0
        while (x = this.stack.pop())
            value = 5 * value + Solver.COSTS[x]

        this.values.push(value)
    }

    get result() {
        return this.values.sort((x,y) => x-y)[this.values.length / 2 | 0]
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver1(data)

    return solver.execute()
}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
    let solver = new Solver2(data)

    return solver.execute()
}