class Register {
    constructor() {
        this.value = 0
        this.input = -1
        this.operations = []
    }

    store(index) {
        this.input = index
        this.operations.length = 0
    }

    act(action, x) {
        if (action === "mul" && x === 0)
            this.operations.length = 0
        else if (action === "div" && x === 1 || action === "add" && x === 0)
            return
        else
            this.operations.push([action,0,x])
    }

    actRegister(action, reg) {
        this.operations.push([action, 1, reg])
///
    }

    clone() {
        const copy = new Register()
        copy.operations = [...this.operations]
        copy.input = this.input
        return copy
    }

    calculate(inputs) {
//        let text = this.input > -1 ? "i"+this.input : "0"
        if (this.cache !== undefined)
            return this.cache
        let value = this.input > -1 ? +inputs[this.input] : 0
        for (let [operation, reg, target] of this.operations) {
            const there = reg ? target.calculate(inputs) : +target

            if (operation === "add") value += there
            if (operation === "mul") value *= there
            if (operation === "div") value = Math.floor(value / there)
            if (operation === "mod") value %= there
            if (operation === "eql") value = (there === value ? 1 : 0)

//            text += " " + operation + "(" + there + ")"
        }
        this.cache = value
//        console.log(text)
        return value
    }

    reset() {
        delete this.cache
    }
}

class Solver {
    commands = []
    registers = {
        w : new Register(),
        x : new Register(),
        y : new Register(),
        z : new Register(),
    }

    allRegisters = [...Object.values(this.registers)]

    constructor(data) {
        for (let input of data) {
            this.commands.push(input.split(" "))
        }
    }

    compile() {
        let index = 0
        for (let command of this.commands) {
            if (command[0] === "inp") {
                this.registers[command[1]].store(index)
                index++
            } else {
                const value = +command[2]
                if (isNaN(value)) {
                    const clone = this.registers[command[2]].clone()
                    this.allRegisters.push(clone)
                    this.registers[command[1]].actRegister(command[0], clone)
                } else
                    this.registers[command[1]].act(command[0], value)
            }
        }
    }

    calculate(input, register) {
        for (let register of this.allRegisters)
            register.reset()
        return this.registers[register].calculate(input)
    }

    get result() {
        this.compile()
/*        for (let i = 99999; i >= 0; i--) {
            const result = this.calculate("999999999"+(`000000${i}`.slice(-5)), "z")
            if (result === 0)
                return i
        }*/

        return "Solved on paper"//this.calculate("99999999999999", "z")
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

