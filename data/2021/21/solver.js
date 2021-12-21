const die = (x) => [0n, ...new Array(x).fill(1n)]
function combo(die, dice) {
    const result = new Array(die.length + dice.length - 1).fill(0n)
    for (let i = 0; i < die.length; i++)
        for (let j = 0; j < dice.length; j++)
            result[i+j] += die[i] * dice[j]
    return result
}
function rollChances(number, size) {
    let x = die(size)
    let result = die(size)
    for (let i = 1; i < number; i++)
        result = combo(result, x)
    console.log(result)
    return result
}


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
    winningScore = 21
    rolls = rollChances(3, 3)

    constructor(data) {
        this.states = {}
        this.wins = [0n, 0n]
        this.add(1n, 0, 0, +data[0].split(" ").pop(), +data[1].split(" ").pop(), 0)
    }

    add(amount, ...state) {
        const id = state.join(",")
        this.states[id] = (this.states[id] ?? 0n) + amount
    }

    get(...state) {
        const id = state.join(",")
        return this.states[id] ?? 0n
    }

    advance(s1, s2, p1, p2, n) {
        const base = this.get(s1, s2, p1, p2, n)
        if (base === 0)
            return

        for (let roll = 0; roll < this.rolls.length; roll++) {
            const outcomes = base * this.rolls[roll]
            if (outcomes === 0n)
                continue
            const position = (p1 - 1 + roll) % 10 + 1
            const score = s1 + position
            if (score >= this.winningScore)
                this.wins[n] += outcomes
            else
                this.add(outcomes, s2, score, p2, position, 1-n)
        }
    }

    get result() {
        for (let s1 = 0; s1 < this.winningScore; s1++)
            for (let s2 = 0; s2 < this.winningScore; s2++)
                for (let p1 = 1; p1 < 11; p1++)
                    for (let p2 = 1; p2 < 11; p2++)
                        for (let n = 0; n < 2; n++)
                            if (n)
                                this.advance(s1, s2, p1, p2,n)
                            else
                                this.advance(s2, s1, p2, p1,n)
        return this.wins[0] > this.wins[1] ? this.wins[0] : this.wins[1]
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

