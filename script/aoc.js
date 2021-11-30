const INPUT = "input.txt"
const SOLVER = "solver.js"

window.onload = async () => {
    try {
        const file = await fetch(`../data/${YEAR}/${DAY}/${INPUT}`)
        const data = (await file.text()).trim().split(`\n`)
        console.log("Input data: ", data)

        const solver = (await import(`../data/${YEAR}/${DAY}/${SOLVER}`)).default

        document.getElementById("year").innerText = YEAR
        document.getElementById("day").innerText = DAY

        const answer = solver(data)
        document.getElementById("answer").innerText = answer

    } catch(e) {
        document.getElementById("error").innerText = e

    }
}