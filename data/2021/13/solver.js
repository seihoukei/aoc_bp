class Point {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    fold(d, v) {
        if (this[d] > +v)
            this[d] = 2 * v - this[d]
    }
}

class Solver {
    points = []
    folds = []
    constructor(data) {
        let folds = false
        for (let input of data) {
            if (input === "") {
                folds = true
                continue
            }
            if (folds === false) {
                this.points.push(new Point(...input.split(",").map(Number)))
            } else {
                this.folds.push(input.split(" ").pop().split("="))
            }
        }
    }

    fold() {
        for (let point of this.points) {
            point.fold(...this.folds[0])
        }
    }

    get result() {
        return new Set(this.points.map(point => `${point.x},${point.y}`)).size
    }
}

class Solver2 extends Solver {
    fold() {
        for (let point of this.points) {
            for (let fold of this.folds)
                point.fold(...fold)
        }
    }

    get result() {
        const sx = Math.max(...this.points.map(x=>x.x))
        const sy = Math.max(...this.points.map(x=>x.y))
        const data = new Array(sy+1).fill(0).map(x => new Array(sx+1).fill("."))
        for (let point of this.points)
            data[point.y][point.x] = "#"
        return "\n"+data.map(x => x.join("")).join("\n")
    }
}

export function part1 (data, raw) {
//    let solver = new Solver(raw.split(",").map(Number))
    let solver = new Solver(data)

    solver.fold()

    return solver.result
}

export function part2 (data, raw) {
//    let solver = new Solver2(raw.split(",").map(Number))
    let solver = new Solver2(data)

    solver.fold()

    return solver.result
}

