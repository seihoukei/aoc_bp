class Tank {
    fish = new Array(9).fill(0)

    constructor(data) {
        for (let input of data)
            this.fish[input]++
    }

    step() {
        this.fish = this.fish.map((x,i,a) => i === 8 ? a[0] : i===6 ? a[7] + a[0] : a[i+1])
    }

    advance(times){
        for (let i = 0; i < times; i++)
            this.step()

        return this.fish.reduce((v,x) => v + x)
    }
}
export function part1 (data, raw) {
    const tank = new Tank(raw.split(",").map(Number))
    return tank.advance(80)
}

export function part2 (data, raw) {
    const tank = new Tank(raw.split(",").map(Number))
    return tank.advance(256)
}

