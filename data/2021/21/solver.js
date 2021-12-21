class Dice {
    value = 100
    next() {
        return this.value = this.value % 100 + 1
    }

    roll(n) {
        let result = 0
        for (let i = 0; i < n; i++)
            result += this.next()
        return result
    }
}

class Solver {
    positions = []
    scores = [0,0]
    player = 0
    players = 0
    turn = 0
    length = 10

    constructor(data) {
        for (let input of data) {
            this.positions.push(Number(input.split(" ").pop()))
            this.scores.push(0)
            this.players++
            this.player = this.players - 1
        }
        this.dice = new Dice()
    }

    advance() {
        this.turn++
        this.player = (this.player + 1) % this.players
        this.positions[this.player] = (this.positions[this.player] - 1 + this.dice.roll(3)) % this.length + 1
        this.scores[this.player] += this.positions[this.player]
    }

    get result() {
        while (this.scores[this.player] < 1000)
            this.advance()
        return this.scores[1 - this.player] * this.turn * 3
    }
}

class Solver2 {
    constructor(data) {
        this.states = {}
        this.wins = [0, 0]
        this.add(1, 0, 0, +data[0].split(" ").pop(), +data[1].split(" ").pop(), 0)
    }

    add(amount, ...state) {
        const id = state.join(",")
        this.states[id] = (this.states[id] ?? 0) + amount
    }

    get(...state) {
        const id = state.join(",")
        return this.states[id] ?? 0
    }

    advance(s1, s2, p1, p2, n) {
        const base = this.get(s1, s2, p1, p2, n)
        if (base === 0)
            return

        const rolls = [0,0,0,1,3,6,7,6,3,1]
        for (let roll = 3; roll < 10; roll++) {
            const position = (p1 - 1 + roll) % 10 + 1
            const score = s1 + position
            const outcomes = base * rolls[roll]
            if (score >= 21)
                this.wins[n] += outcomes
            else
                this.add(outcomes, s2, score, p2, position, 1-n)
        }
    }

    get result() {
        for (let s1 = 0; s1 < 21; s1++)
            for (let s2 = 0; s2 < 21; s2++)
                for (let p1 = 1; p1 < 11; p1++)
                    for (let p2 = 1; p2 < 11; p2++)
                        for (let n = 0; n < 2; n++)
                            if (n)
                                this.advance(s1, s2, p1, p2,n)
                            else
                                this.advance(s2, s1, p2, p1,n)
        return Math.max(...this.wins)
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

