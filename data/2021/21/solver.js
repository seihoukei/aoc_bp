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
    position = []
    wins = [0, 0]

    constructor(data) {
        for (let input of data) {
            this.position.push(Number(input.split(" ").pop()))
        }
    }

    advance(s1, s2, p1, p2, n, base) {
        const rolls = [0,0,0,1,3,6,7,6,3,1]
        for (let roll = 3; roll < 10; roll++) {
            const position = (p1 - 1 + roll) % 10 + 1
            const score = s1 + position
            const outcomes = base * rolls[roll]
            if (score >= 21)
                this.wins[n] += outcomes
            else
                this.advance(s2, score, p2, position, 1-n, outcomes)
        }
    }

    get result() {
        this.advance(0,0,this.position[0],this.position[1], 0, 1)
        return this.wins.join(",")
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

