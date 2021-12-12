class Cave {
    connections = []
    visited = 0

    constructor(name, double) {
        this.name = name
        this.end = name === 'end'
        this.start = name === 'start'
        this.small = name[0] === name.toLowerCase()[0]
        this.allowDouble = double
    }

    visit(doubled = false) {
        if (this.small && this.visited && (doubled || !this.allowDouble || this.start))
            return 0

        if (this.end)
            return 1

        if (this.small)
            this.visited++

        let paths = 0
        for(let cave of this.connections)
            paths += cave.visit(doubled || (this.visited === 2))

        if (this.small)
            this.visited--

        return paths
    }

    connectTo(other) {
        this.connections.push(other)
        other.connections.push(this)
    }

}

class Solver {
    caves = {}
    constructor(data, double = false) {
        this.double = double
        for (let input of data) {
            const caves = input.split("-").map(name => this.getCave(name))
            caves[0].connectTo(caves[1])
        }
    }

    getCave(name) {
        if (this.caves[name])
            return this.caves[name]
        return this.caves[name] = new Cave(name, this.double)
    }

    get result() {
        return this.caves['start'].visit()
    }
}

class Solver2 extends Solver {
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
    let solver = new Solver(data, true)

    return solver.result
}

