class Octopus {
    constructor(sea, level) {
        this.sea = sea
        this.level = +level
        this.neighbours = []
        this.flashed = false
        this.flashes = 0
    }

    bind(neighbour) {
        if (!neighbour)
            return
        this.neighbours.push(neighbour)
    }

    advance() {
        this.level++
        if (this.level === 10)
            this.flash()
    }

    flash() {
        if (this.flashed)
            return
        this.flashed = true
        this.sea.counter++
        for (let neighbour of this.neighbours)
            neighbour.advance()
    }

    reset() {
        if (!this.flashed)
            return
        this.flashed = false
        this.level = 0
    }
}

class Solver {
    octopi = []
    flatOctopi = []
    counter = 0

    constructor(data) {
        for (let input of data) {
            const line = []
            for (let level of [...input])
                line.push(new Octopus(this, level))
            this.octopi.push(line)
        }
        for (let y = 0; y < this.octopi.length; y++) {
            const line = this.octopi[y]
            for (let x = 0; x < line.length; x++) {
                const octopus = line[x]
                octopus.bind(this.octopi[y-1]?.[x-1])
                octopus.bind(this.octopi[y-1]?.[x-0])
                octopus.bind(this.octopi[y-1]?.[x+1])
                octopus.bind(this.octopi[y-0]?.[x-1])
                octopus.bind(this.octopi[y-0]?.[x+1])
                octopus.bind(this.octopi[y+1]?.[x-1])
                octopus.bind(this.octopi[y+1]?.[x-0])
                octopus.bind(this.octopi[y+1]?.[x+1])
            }
        }
        this.flatOctopi = this.octopi.flat()
    }

    step() {
        for (let octopus of this.flatOctopi)
            octopus.advance(this)
        for (let octopus of this.flatOctopi)
            octopus.reset()
    }

    advance(times) {
        for (let i = 0; i < times; i++) {
            this.step()
        }
        return this.counter
    }

    get result() {
        return this.counter
    }
}

class Solver2 extends Solver {
    seekUnity() {
        this.counter = 0
        let steps = 0
        while (this.counter < this.flatOctopi.length) {
            this.counter = 0
            this.step()
            steps++
        }
        return steps
    }

}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver(data)

    return solver.advance(100)

}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
    let solver = new Solver2(data)

    return solver.seekUnity()
}

