class AocMap {
    cells = []

    constructor(data, diagonal = false) {
        this.diagonal = diagonal
        for (let input of data) {
            const [start, end] = input.split(" -> ").map(x => x.split(","))
            this.draw(start, end)
        }
    }

    draw(start, end) {
        const dx = Math.sign(end[0] - start[0])
        const dy = Math.sign(end[1] - start[1])

        if (!this.diagonal && dx * dy)
            return

        const distance = Math.max(start[0] - end[0], end[0] - start[0], start[1] - end[1], end[1] - start[1])

        for (let i = 0; i <= distance; i++) {
            this.increase(+start[0] + dx * i, +start[1] + dy * i)
        }

    }

    increase(x, y) {
        const address = `${x},${y}`
        this.cells[address] = (this.cells[address] ?? 0) + 1
    }

    get intersections() {
        return Object.values(this.cells).reduce((v,x)=>x > 1 ? v+1 : v, 0)
    }
}

export function part1 (data, raw) {
    let map = new AocMap(data)

    return map.intersections
}

export function part2 (data, raw) {
    let map = new AocMap(data, true)

    return map.intersections
}

