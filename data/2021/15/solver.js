class Solver {
    map = []
    constructor(data) {
        for (let input of data) {
            this.map.push([...input].map(Number))
        }
    }

    get result() {
        const start = this.map[0][0]
        for (let i = this.map.length + this.map[0].length - 3; i >= 0; i--) {
            for (let x = 0; x < this.map[0].length; x++) {
                if (this.map[i-x]?.[x] === undefined)
                    continue
                this.map[i-x][x] += Math.min(this.map[i-x+1]?.[x] ?? Infinity, this.map[i-x]?.[x+1] ?? Infinity)
            }
        }
        return this.map[0][0] - start
    }
}

class Solver2 extends Solver {
    expand() {
        for (let line of this.map) {
            const base = [...line]
            for (let i = 0; i < 4; i++)
                line.push(...base.map(x => (x + i) % 9 + 1))
        }
        const base = [...this.map]
        for (let i = 0; i < 4; i++) {
            for (let line of base) {
                this.map.push(line.map(x => (x + i) % 9 + 1))
            }
        }
    }

    get result() {
        const costs = this.map.map(x => x.map(x => Infinity))
        let horizon = new Set([[this.map[0].length - 1, this.map.length - 1]])
        costs[this.map.length-1][this.map[0].length - 1] = 0
        while (horizon.size > 0) {
            const nextHorizon = new Set()
            for (let [x,y] of horizon) {
                for (let [dx, dy] of [[-1,0],[1,0],[0,1],[0,-1]]) {
                    if (this.map[y + dy]?.[x + dx] === undefined)
                        continue
                    if (costs[y + dy][x+dx] <= costs[y][x] + this.map[y][x])
                        continue
                    costs[y + dy][x+dx] = costs[y][x] + this.map[y][x]
                    nextHorizon.add([x+dx,y+dy])
                }
            }
            horizon = nextHorizon
        }
        return costs[0][0]
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
    solver.expand()

    return solver.result
}

