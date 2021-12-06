class Board {
    constructor(data) {
        const numbers = data.trim().split(/\s+/).map(Number)
        this.numbers = new Set(numbers)

        this.rows = []
        this.columns = []

        for (let i = 0; i < 5; i++) {
            this.rows[i] = new Set()
            this.columns[i] = new Set()

            for (let j = 0; j < 5; j++) {
                this.rows[i].add(numbers[i * 5 + j])
                this.columns[i].add(numbers[i + j * 5])
            }
        }
    }

    number(value) {
        this.numbers.delete(value)
        for (let i = 0; i < 5; i++) {
            this.rows[i].delete(value)
            this.columns[i].delete(value)

            if (this.rows[i].size === 0 || this.columns[i].size === 0)
                return [...this.numbers].reduce((v, x) => v + x) * value
        }
    }
}

class Bingo {
    constructor(data) {
        this.numbers = data[0].split(",").map(Number).reverse()
        this.boards = new Set(data.slice(1).map(x => new Board(x)))
    }

    draw() {
        const number = this.numbers.pop()

        let result = 0

        for (let board of this.boards) {
            const value = board.number(number)
            if (value) {
                result = value
                this.boards.delete(board)
            }
        }

        return result
    }

    get first() {
        let result = 0

        while (!result)
            result = this.draw()

        return result
    }

    get last() {
        let result = 0

        while (this.boards.size)
            result = this.draw()

        return result
    }
}

export function part1 (data, raw) {
    const bingo = new Bingo(raw.split(/\r?\n\r?\n/))

    return bingo.first
}

export function part2 (data, raw) {
    const bingo = new Bingo(raw.split(/\r?\n\r?\n/))

    return bingo.last
}

