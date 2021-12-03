class Submarine {
    x = 0
    y = 0

    forward(value) {
        this.x += value
    }

    down(value) {
        this.y += value
    }

    up(value) {
        this.y -= value
    }

    navigate(data) {
        for (let input of data) {
            const [command, value] = input.trim().split(" ")
            this[command](+value)
        }

        return this.position
    }

    get position() {
        return this.x * this.y
    }
}

class AimedSubmarine extends Submarine {
    depth = 0

    forward(value) {
        this.x += value
        this.depth += this.y * value
    }

    get position() {
        return this.x * this.depth
    }
}


export function part1 (data) {
    let submarine = new Submarine()

    return submarine.navigate(data)
}

export function part2 (data) {
    let submarine = new AimedSubmarine()

    return submarine.navigate(data)
}