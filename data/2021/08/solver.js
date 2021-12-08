class Solver {
    constructor(data) {
        this.outputs = []
        for (let input of data) {
            this.outputs.push(this.parse(input))
        }
    }

    parse(input) {
        const [left, right] = input.split(" | ")
        return right.split(" ").map(x => x.length).filter(x => x !== 5 && x !== 6).length
        //const digits = [...left, ...right]

    }

    get result() {
        return this.outputs.reduce((v,x)=>v+x)
    }
}

class Solver2 extends Solver {
    parse(input) {
        const digits = []
        const [left, right] = input.split(" | ").map(x => x.split(" ").map(data => {
            let value = 0
            for (let i = 0; i < data.length; i++) {
                value |= 1 << (data.charCodeAt(i) - 97)
            }

            if (data.length === 2)
                digits[1] = value
            if (data.length === 3)
                digits[7] = value
            if (data.length === 4)
                digits[4] = value
            if (data.length === 7)
                digits[8] = value

            return value
        }))

        const segments = []
        const inputs = [...left, ...right]

        segments[0] = digits[7] & ~digits[1]
        segments[13] = digits[4] & ~digits[1]
        segments[46] = digits[8] & ~digits[7] & ~digits[4]

        for (let input of inputs) {
            let value = input & segments[46]

            if (value === 0 || value === segments[46])
                continue

            segments[6] = value
            segments[4] = segments[46] & ~value
            break
        }

        for (let input of inputs) {
            let value = input & segments[13]

            if (value === 0 || value === segments[13] || (input & digits[1]) === digits[1])
                continue

            segments[3] = value
            segments[1] = segments[13] & ~segments[3]
            break
        }

        for (let input of inputs) {
            let value = input & digits[1]

            if (value === 0 || value === digits[1] || !(input & segments[1]))
                continue

            segments[5] = value
            segments[2] = digits[1] & ~value
            break
        }

        const digitCodes = [
            [0,1,2,4,5,6],
            [2,5],
            [0,2,3,4,6],
            [0,2,3,5,6],
            [1,2,3,5],
            [0,1,3,5,6],
            [0,1,3,4,5,6],
            [0,2,5],
            [0,1,2,3,4,5,6],
            [0,1,2,3,5,6],
        ].map(x => x.reduce((v,x) => v+segments[x] || v, 0))

        const codeDigits = {}
        for (let i = 0; i < digitCodes.length; i++) {
            codeDigits[digitCodes[i]] = i
        }

        return +right.map(x => codeDigits[x]).join("")
    }
}

export function part1 (data, raw) {
    let solver = new Solver(data)
//    let solver = new Solver(raw.split(",").map(Number))

    return solver.result
}

export function part2 (data, raw) {
    let solver = new Solver2(data)
//    let solver = new Solver2(raw.trim().split(",").map(Number))

    return solver.result
}

