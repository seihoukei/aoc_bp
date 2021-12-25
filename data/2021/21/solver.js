const POSITIONS = 10
const MAX_SCORE = 21
const DICE = 3
const DIE_SIZE = 3

const die = (x) => [0n, ...new Array(x).fill(1n)]
function combo(die, dice) {
    const result = new Array(POSITIONS).fill(0n)
    for (let i = 0; i < die.length; i++)
        for (let j = 0; j < dice.length; j++)
            result[(i+j) % POSITIONS] += die[i] * dice[j]
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
    rolls = rollChances(DICE, DIE_SIZE)

    constructor(data) {
        this.states = new Array(3).fill(0)
                                  .map(x => new Array(POSITIONS + 1).fill(0)
                                  .map(x => new Array(MAX_SCORE).fill(0n)
                                  ))
        this.wins = [0n, 0n]
        this.universes = [1n, 1n]
        this.states[0][+data[0].split(" ").pop()][0] = 1n
        this.states[1][+data[1].split(" ").pop()][0] = 1n
    }

    add(player, position, score, amount = 1n) {
        this.states[player][position][score] += amount
    }

    get(player, position, score) {
        return this.states[player][position][score]
    }

    turn (player) {
        let universes = 0n
        for (let line of this.states[2])
            line.fill(0n)

        for (let score = 0; score < MAX_SCORE; score++)
            for (let position = 1; position <= POSITIONS; position++) {
                if (this.states[player][position][score] === 0n)
                    continue
                for (let roll = 0; roll < this.rolls.length; roll++) {
                    if (this.rolls[roll] === 0n)
                        continue
                    const amount = this.rolls[roll] * this.states[player][position][score]
                    const newPosition = (position + roll - 1) % POSITIONS + 1
                    const newScore = score + newPosition
                    if (newScore >= MAX_SCORE)
                        this.wins[player] += this.universes[1 - player] * amount
                    else {
                        this.states[2][newPosition][newScore] += amount
                        universes += amount
                    }
                }
            }
        this.universes[player] = universes
        ;[this.states[player],this.states[2]] = [this.states[2],this.states[player]]
    }

    get result() {
        while (this.universes[0] + this.universes[1] > 0n) {
            this.turn(0)
            this.turn(1)
        }
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


//4,8 : 5421241233526473492719111827530073322043700685324887972643877167221582706632062890226633882867215122817094478226757831672569240814542964877955305731916648253248335858512057533670130530856541774540595494034042339999669679917631875732825766116784092779284811114399087382450717587331260789093785894799877563606482291952570043001217814381339302494119777384417342867283876524391498980886698692797031928912775846300310773961458685480293345030624886674682243872741738613990867919596644394338348577333930203953377127120984552032785093074890068515454918026316742238636555050830959764192402139432795516421795229983126452003483234264162966755183792554646664002598051928477710447862345835
//5,10: 3472575339882547986375838612815484120780932730618196709017721325518518459415831875808354917536489138719545993841846868005673954746445339110824774739363946031668751048219801966218302981992621231203669601860504424310815154437398782716912320925598515169178610720306108370579620648440972086050328994059459152337106493526032226398277726629348436281824879429666111877677549227475445926505141417566773474801394067496699785901679324728436440955874512246604394291981995089886753327337120283383885466500587771493195780138910081346723962547160435945862983460922972936841493887822444890726833404545719034292047863629242698862665747297858324074483184430748117133764276692960222997181617483