class Solver {
    commands = []

    constructor(data) {
        for (let input of data) {
            this.commands.push(input.match(/(?<state>[onf]+) x=(?<x0>[-0-9]+)..(?<x1>[-0-9]+),y=(?<y0>[-0-9]+)..(?<y1>[-0-9]+),z=(?<z0>[-0-9]+)..(?<z1>[-0-9]+)/).groups)
        }
    }

    optimize(limit) {
        for (let command of this.commands) {
            command.x0 = +command.x0
            command.x1 = +command.x1
            command.y0 = +command.y0
            command.y1 = +command.y1
            command.z0 = +command.z0
            command.z1 = +command.z1
        }
        for (let i = 0; i < this.commands.length; i++) {
            const here = this.commands[i]
            if (limit && Math.max(
                here.x0, -here.x0,
                here.x1, -here.x1,
                here.y0, -here.y0,
                here.y1, -here.y1,
                here.z0, -here.z0,
                here.z1, -here.z1) > 50) {
                here.ignore = true
                continue
            }
            for (let j = i+1; j < this.commands.length; j++) {
                const there = this.commands[j]
                if (there.x1 < here.x1)
                    continue
                if (there.y1 < here.y1)
                    continue
                if (there.z1 < here.z1)
                    continue
                if (there.x0 > here.x0)
                    continue
                if (there.y0 > here.y0)
                    continue
                if (there.z0 > here.z0)
                    continue
                here.ignore = true
                break
            }
        }
        this.commands = this.commands.filter (x => !x.ignore)
    }

    init() {
        const cubes = new Set()
        let result = 0
        for (let z = 0; z < this.zs.length - 1; z++) {
            cubes.clear()
            this.compressXY(z)
            for (let command of this.commands) {
                if (command.z0 > z || command.z1 < z)
                    continue
                for (let x = command.cx0; x <= command.cx1; x++)
                    for (let y = command.cy0; y <= command.cy1; y++)
                        if (command.state === "on")
                            cubes.add(`${x},${y}`)
                        else
                            cubes.delete(`${x},${y}`)
            }
            result += this.uncompressXY(cubes) * (this.zs[z+1] - this.zs[z])
        }
        return result
    }

    compressZ() {
        const zset = new Set()
        for (let command of this.commands) {
            zset.add(+command.z0)
            zset.add(+command.z1)
            zset.add(+command.z1+1)
        }
        this.zs = [...zset].sort((x,y) => x-y)
//        this.zs.push(this.zs.at(-1)+1)
        for (let command of this.commands) {
            command.z0 = this.zs.indexOf(+command.z0)
            command.z1 = this.zs.indexOf(+command.z1)
        }
    }

    compressXY(z) {
        const xset = new Set()
        const yset = new Set()
        for (let command of this.commands) {
            if (command.z0 > z || command.z1 < z)
                continue
            xset.add(+command.x0)
            xset.add(+command.x1)
            xset.add(+command.x1+1)
            yset.add(+command.y0)
            yset.add(+command.y1)
            yset.add(+command.y1+1)
        }
        this.xs = [...xset].sort((x,y) => x-y)
        this.ys = [...yset].sort((x,y) => x-y)
        for (let command of this.commands) {
            if (command.z0 > z || command.z1 < z)
                continue
            command.cx0 = this.xs.indexOf(+command.x0)
            command.cx1 = this.xs.indexOf(+command.x1)
            command.cy0 = this.ys.indexOf(+command.y0)
            command.cy1 = this.ys.indexOf(+command.y1)
        }
        //console.log(commands, xs, ys, zs)
    }

    uncompressXY(cubes) {
        let result = 0
        for (let cube of cubes) {
            const [x,y] = cube.split(",")
            const dx = this.xs[+x+1] - this.xs[+x]
            const dy = this.ys[+y+1] - this.ys[+y]
            result += dx * dy
        }
        return result
    }

    get result() {
        this.optimize(true)
        this.compressZ()
        return this.init()
    }
}

class Solver2 extends Solver {
    get result() {
        this.optimize(false)
        this.compressZ()
        return this.init()
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

