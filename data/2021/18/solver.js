class FishDigit {
    constructor(value, depth, last, next) {
        this.value = value
        this.depth = depth
        if (last) {
            this.last = last
            last.next = this
        }
        if (next) {
            this.next = next
            next.last = this
        }
    }

    explode() {
        if (this.depth > 4) {
            if (this.last)
                this.last.value += this.value
            this.value = 0
            this.depth--
            if (this.next.next) {
                this.next.next.value += this.next.value
                this.next.next.last = this
            }
            this.next = this.next.next
            return true
        } else return this.next ? this.next.explode() : false
    }

    split() {
        if (this.value > 9) {
            this.next = new FishDigit(Math.ceil(this.value / 2), this.depth + 1, this, this.next)
            this.depth += 1
            this.value = Math.floor(this.value / 2)
            return true
        } else return this.next ? this.next.split() : false
    }

    magnetude() {
        this.value = 3 * this.value + 2 * this.next.value
        this.depth--
        this.next = this.next.next
        if (this.next)
            this.next.last = this
    }
}

class FishNum {
    first

    constructor(string) {
        let last
        let depth = 0
        for (let char of string){
            if (char === "[") {
                depth++
            }
            if (char === "]") {
                depth--
            }
            if (!isNaN(+char)) {
                const digit = new FishDigit(+char, depth, last)
                last = digit
                if (!this.first)
                    this.first = digit
            }
        }
    }

    add(num) {
        let digit = this.first
        let last
        while (digit) {
            last = digit
            digit.depth++
            digit = digit.next
        }
        digit = num.first
        last.next = digit
        digit.last = last
        while (digit) {
            digit.depth++
            digit = digit.next
        }
        this.reduce()
    }

    reduce() {
//        this.log()
        while (this.first.explode() || this.first.split()) {
//            this.log()
        }
    }

    magnitudeLayer(n) {
        let digit = this.first
        while (digit) {
            if (digit.depth === n)
                digit.magnetude()
            digit = digit.next
        }
    }

    log() {
        let digit = this.first
        let string = ''
        while (digit) {
            string += `${digit.value}-${digit.depth} `
            digit = digit.next
        }
        console.log(string)
    }

    get magnitude() {
        this.log()
        for (let n = 4; n > 0; n--) {
            this.magnitudeLayer(n)
            this.log()
        }
        return this.first.value
    }
}

class Solver {
    numbers = []

    constructor(data) {
        for (let input of data) {
            const number = new FishNum(input)
            this.numbers.push(number)
//            number.reduce()
//            number.log()
        }
    }

    get result() {
        console.log(this.numbers.length)
        const total = this.numbers[0]
        for (let number of this.numbers.slice(1)) {
            total.add(number)
            total.log()
        }
        return total.magnitude
    }
}

class Solver2 {
    constructor(data) {
        let max = 0
        for (let i = 0; i < data.length; i++)
            for (let j = 0; j < data.length; j++){
                if (i == j)
                    continue
                const num1 = new FishNum(data[i])
                const num2 = new FishNum(data[j])
                num1.add(num2)
                max = Math.max(max, num1.magnitude)

            }
        this.result = max
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver(data)

    return solver.result
}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
   // let solver = new Solver2(data)

    return 0//solver.result
}

