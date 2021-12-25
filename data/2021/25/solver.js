class Solver {
    map = []
    next = []
    constructor(data) {
        for (let input of data) {
            this.map.push([...input])
        }
    }

    advance() {
        let moved = false
        for (let y = 0; y < this.map.length; y++) {
            this.next[y] = [...this.map[y]]
        }
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[0].length; x++) {
                if (this.map[y][x] !== ".")
                    continue

                let lx = x - 1
                if (lx < 0)
                    lx = this.map[0].length - 1
                if (this.map[y][lx] === ">") {
                    this.next[y][lx] = "."
                    this.next[y][x] = ">"
                    moved = true
                    continue
                }
            }
        }
        ;[this.next, this.map] = [this.map, this.next]

        for (let y = 0; y < this.map.length; y++) {
            this.next[y] = [...this.map[y]]
        }
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[0].length; x++) {
                if (this.map[y][x] !== ".")
                    continue

                let ty = y - 1
                if (ty < 0)
                    ty = this.map.length - 1
                if (this.map[ty][x] === "v") {
                    this.next[ty][x] = "."
                    this.next[y][x] = "v"
                    moved = true
                    continue
                }
            }
        }
        ;[this.next, this.map] = [this.map, this.next]
        return moved
    }

    log() {
        for (let line of this.map)
            console.log(line.join(""))
    }

    get result() {
        let i = 0
        while (++i)
            if (!this.advance())
                break

/*
        this.advance()
        this.log()
*/
        return i
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
    let solver = new Solver2(data)

    return solver.result
}

