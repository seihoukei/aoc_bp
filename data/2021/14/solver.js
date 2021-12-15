class Solver {
    inserts = {}

    constructor(data) {
        this.line = data[0]
        for (let input of data.slice(2)) {
        //    this.replaces.push(input.split(" => "))
            const [search, insert] = input.split(" -> ")
            this.inserts[search] = insert
        }
    }

    result(n) {
        let s = this.line[0]
        for (let i = 0; i < n; i++) {
            for (let item of [...this.line.slice(1)]) {
                s += this.inserts[s.slice(-1)+item] ?? ""
                s += item
            }
            this.line = s
            s = this.line[0]
        }
        s = this.line

        const counts = {}
        for (let item of [...s])
            counts[item] = (counts[item] ?? 0) + 1

        console.log(counts)

        return Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
    }
}

class Solver2 extends Solver {
    pairs = {}
    nextPairs = {}

    addPair(pair, amount = 0) {
        this.nextPairs[pair] = (this.nextPairs[pair] ?? 0) + amount
    }

    result(n) {
        for (let i = 0; i < this.line.length - 1; i++)
            this.addPair(this.line.slice(i, i+2), 1)
        for(let i = 0; i < n; i++) {
            this.pairs = Object.assign({}, this.nextPairs)
            for (let [search, insert] of Object.entries(this.inserts)) {
                this.addPair(search[0] + insert, this.pairs[search] ?? 0)
                this.addPair(insert + search[1], this.pairs[search] ?? 0)
                this.addPair(search, -(this.pairs[search] ?? 0))
            }
        }
        this.pairs = Object.assign({}, this.nextPairs)
        const counts = []
        counts[this.line[0]] = 1
        counts[this.line[this.line.length-1]] = (counts[this.line[this.line.length-1]] ?? 0) + 1
        for (let [pair, amount] of Object.entries(this.pairs)) {
            counts[pair[0]] = (counts[pair[0]] ?? 0) + amount
            counts[pair[1]] = (counts[pair[1]] ?? 0) + amount
        }
        return (Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))) / 2
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver2(data)

    return solver.result(10)
}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
    let solver = new Solver2(data)

    return solver.result(40)
}

