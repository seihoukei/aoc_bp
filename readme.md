# Advent of code

Advent of code (https://adventofcode.com/) is an annual collection of daily puzzles for 25 days of Advent.

### Boilerplate

This requires local server (like one integrated into IntelliJ Idea) and browser to use.

#### Yearly preparation
`data/_year_template` contains a day template with batch file to fill the folder. 
Copy it as `data/<year>`, execute `create_days.bat`, then optionally remove `create_days.bat` and `_day_template` folder. 

#### Usage
* In `index.html`, set `YEAR` and `DAY` constants to correspond to intended day.
* Paste your personal input to `data/<year>/<day>/input.txt`
  * You can use `data/<year>/<day>/mini.txt` for example input and `data/<year>/<day>/custom.txt` for your own testing input. 
* Work on solution within `data/<year>/<day>/solver.js` which implements two functions, `part1` and `part2`, both of which accept two parameters
  * `data` is input file represented as array of lines
  * `raw` is raw input data
* To measure performance, use `performance.mark("<name>")` and `performance.measure("<name>", "<from>")` where `from` is `start` or another mark name. 
