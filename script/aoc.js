const SOLVER = "solver.js"
const INPUTS = [
    "mini.txt",
    "input.txt",
    "custom.txt",
]

class DOM {
    static createElement(typ = "div", clas, parent, text) {
        let element = document.createElement(typ)
        if (clas !== undefined) element.className = clas
        if (text !== undefined) element.innerText = text
        if (parent) parent.appendChild(element)
        return element
    }

    static createDiv(parent, clas, text) {
        return this.createElement("div", clas, parent, text)
    }
}

async function render() {
    return new Promise(resolve => setTimeout(resolve, 10))
}

window.onload = async () => {
    document.getElementById("year").innerText = AOC.YEAR
    document.getElementById("day").innerText = AOC.DAY

    for (let input of INPUTS) {
        await render()
        let file = await fetch(`../data/${AOC.YEAR}/${AOC.DAY}/${input}`)
        if (file.status === 404) {
            continue
        }

        const raw = await file.text()
        const data = raw.trim().split(/\r?\n/)

        const solver = (await import(`../data/${AOC.YEAR}/${AOC.DAY}/${SOLVER}`))

        const dvInput = DOM.createDiv(document.body, "input")
        DOM.createDiv(dvInput,"file", new URL(file.url).pathname)


        for (let i = 1; i < 3; i++) {
            await render()
            performance.clearMarks()
            performance.clearMeasures()

            try {
                performance.mark("start")
                const answer = solver[`part${i}`](data, raw)
                performance.mark("end")

                DOM.createDiv(dvInput, `answer part${i}`, answer)

                // to use in solver.js:
                // performance.measure("Total execution time", "start"
                performance.measure("Total execution time", "start", "end")

                DOM.createDiv(dvInput, `time`, performance
                    .getEntriesByType("measure")
                    .map(x => `${x.name} = ${x.duration.toFixed(2)}`)
                    .join("\n")
                )

            } catch (e) {
                DOM.createDiv(dvInput, `error part${i}`, e)
                if (!AOC.SAFE)
                    throw (e)
            }
        }
    }
}