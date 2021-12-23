const PATHS = "AB 1 BC 2 BH 2 BA 1 CB 2 CH 2 CI 2 CD 2 DC 2 DI 2 DJ 2 DE 2 FE 2 FK 2 FG 1 " +
    "HB 2 HC 2 HL 1 " +
    "IC 2 ID 2 IM 1 " +
    "JD 2 JE 2 JN 1 " +
    "KE 2 KF 2 KO 1 " +
    "LH 1 MI 1 NJ 1 OK 1 "+
    "LP 1 MQ 1 HR 1 OS 1 "+
    "PL 1 QM 1 RH 1 SO 1 "+
    "PT 1 QC 1 RV 1 SW 1 "+
    "TP 1 CQ 1 VR 1 WS 1 "

const TARGETS = {
    A : "HL",
    B : "IM",
    C : "JN",
    D : "KO",
}
const COSTS = {
    A : 1,
    B : 10,
    C : 100,
    D : 1000,
}

class Location {
    connections = {}
    here = null

    constructor(name) {
        this.name = name
    }

    connect(to, cost) {
        this.connections[to] = cost

    }
}

class Critter {
    constructor(type, position){
        this.type = type
        this.position = position
        position.here = this
        this.targets = new Set([...TARGETS[this.type]])
        this.cost = COSTS[this.type]
    }
}

class Solver {
    constructor(data) {
        this.locations = {}
        for (let i = 0; i < 23; i++)
            this.locations[String.fromCharCode(i + 65)] = new Location(String.fromCharCode(i + 65))
        for (let match of [...PATHS.matchAll(/(?<from>[A-Z])(?<to>[A-Z]) (?<cost>[0-9])/g)].map(x => x.groups))
            this.locations[match.from].connect(match.to, +match.cost)
        this.critters = [
            new Critter(data[2][3], this.locations['H']),
            new Critter(data[2][5], this.locations['I']),
            new Critter(data[2][7], this.locations['J']),
            new Critter(data[2][9], this.locations['K']),
            new Critter(data[3][3], this.locations['L']),
            new Critter(data[3][5], this.locations['M']),
            new Critter(data[3][7], this.locations['N']),
            new Critter(data[3][9], this.locations['O']),
            new Critter(data[4][3], this.locations['P']),
            new Critter(data[4][5], this.locations['Q']),
            new Critter(data[4][7], this.locations['R']),
            new Critter(data[4][9], this.locations['S']),
            new Critter(data[5][3], this.locations['T']),
            new Critter(data[5][5], this.locations['U']),
            new Critter(data[5][7], this.locations['V']),
            new Critter(data[5][9], this.locations['W']),
        ]
    }

    get result() {

        return "Solved on paper"
    }
}

class Solver2 extends Solver {
    get result() {
        return "Solved on paper"
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

