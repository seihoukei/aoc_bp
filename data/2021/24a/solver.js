class Solver {
    data = []

    constructor(data) {
        for (let input of data) {
            this.data.push(input.split(",").map(Number))
        }
    }

    calculate(input, iterations = 14) {
        let z = 0
        for (let i = 0; i < iterations; i++) {
            const [A,B,C] = this.data[i]
            const I = Number(input[i])

            const x = (z % 26 + A === I) ? 0 : 1
            z = Math.trunc(z / C) * (25 * x + 1) + x * (I + B)
        }
        return z
    }

    get result() {
        return "Solved on paper"
        let meaningful = [4,6,8,9,11,12,13]
//        let meaningful = [0,1,2,3,5,7,10]

        let s = [9,9,9,9,6,9,1,9,9,9,9,9,9,9,9]
//        let s = [9,9,9,9,9,9,9,9,9,9,9,9,9,9]
//        return this.calculate(s,14)
        for (let digit = 0; digit < 13; digit++) {
            const results = []
            for (let i = 11; i < 100; i++) {
                s[digit] = i / 10 | 0
                s[digit + 1] = i % 10
                if (s[digit] === 0 || s[digit + 1] === 0)
                    continue
                results[i] = this.calculate(s, digit + 2)
            }
            const min = Math.min(...results.filter(x => x !== undefined))
            const max = Math.max(...results.filter(x => x !== undefined))
            let index = 99
            if ((max - min) / min > 2)
                index = results.indexOf(min)
            s[digit] = index / 10 | 0
            s[digit + 1] = index % 10

            console.log(results.join(","), this.calculate(s, digit + 2))
        }
        return s.join("")
        let i = 0
        function decrease(digit) {
            i++
            if (digit === -1)
                return false
/*
            let adigit = meaningful[digit]
            s[adigit]--
            if (s[adigit] === 0) {
                s[adigit] = 9
                return decrease(digit-1)
            }
*/
            s[digit]--
            if (s[digit] === 0) {
                s[digit] = 9
                return decrease(digit-1)
            }
            return true
        }
        while (true) {
            const result = this.calculate(s, 14)
            if (result === 0)
                return s.join("")
            if (!decrease(13))
                return 0
        }
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

