function calculate(data, step = 1) {
    let result = 0

    for (let i = step; i < data.length; i++) {
        if (data[i] > data[i - step])
            result++
    }

    return result
}

export function part1 (data) {
    return calculate(data.map(Number), 1)
}

export function part2 (data) {
    return calculate(data.map(Number), 3)
}
