const SOLVER = "solver.js"
const DEFAULT_INPUT = "input.txt"

window.onload = async () => {
    try {
        let file = await fetch(`../data/${YEAR}/${DAY}/${INPUT}`)
        if (file.status === 404) {
            console.log("Input file not found, trying default")
            file = await fetch(`../data/${YEAR}/${DAY}/${DEFAULT_INPUT}`)
        }

        const data = (await file.text()).trim().split(`\n`)
        console.log("Input data: ", data)

        const solver = (await import(`../data/${YEAR}/${DAY}/${SOLVER}`)).default

        document.getElementById("year").innerText = YEAR
        document.getElementById("day").innerText = DAY
        document.getElementById("file").innerText = new URL(file.url).pathname

        performance.mark("start")
        const answer = solver(data)
        performance.mark("end")

        // to use in solver.js:
        // performance.measure("Total execution time", "start"
        performance.measure("Total execution time", "start", "end")
        document.getElementById("answer").innerText = answer

        document.getElementById("time").innerText = performance
            .getEntriesByType("measure")
            .map(x => `${x.name} = ${x.duration.toFixed(2)}`)
            .join("\n")

    } catch(e) {
        document.getElementById("error").innerText = e

    }
}