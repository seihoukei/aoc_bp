class AocMap {
    constructor(data) {
        this.map = data
    }

    get depths() {
        return this.map.reduce((t,l,y,a) => t+[...l].reduce((t,v,x) => {
            const rv = +v
            if (rv >= a[y+1]?.[x] ?? 0) return t
            if (rv >= a[y-1]?.[x] ?? 0) return t
            if (rv >= a[y]?.[x+1] ?? 0) return t
            if (rv >= a[y]?.[x-1] ?? 0) return t
//            console.log(x,y)
            return t+rv+1
        } ,0),0)
    }

    get basins() {
        const alias = []
        let id = 1
        const basins = this.map.map(x => [...x].map(x=>0))

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === '9')
                    continue
                basins[y][x] = id++
                if (basins[y]?.[x-1]??0 > 0) {
                    let v = basins[y]?.[x - 1]
                    while (alias[v] && v !== alias[v])
                        v = alias[v]
                    alias[v] = basins[y][x]
                }
                if (basins[y-1]?.[x]??0 > 0) {
                    let v = basins[y-1]?.[x]
                    while (alias[v] && v !== alias[v])
                        v = alias[v]
                    alias[v] = basins[y][x]
                }
            }
        }

        const sizes = []

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                let v = basins[y]?.[x]
                if (!v)
                    continue
                while (alias[v] && v !== alias[v])
                    v = alias[v]
                sizes[v] = (sizes[v]??0) + 1
            }
        }

        console.log(sizes.sort((x,y) => y-x))

        return sizes.sort((x,y) => y-x).slice(0,3).reduce((v,x)=>v*x)
    }
}

export function part1 (data, raw) {
    let map = new AocMap(data)

    return map.depths
}

export function part2 (data, raw) {
    let map = new AocMap(data)

    return map.basins
}

