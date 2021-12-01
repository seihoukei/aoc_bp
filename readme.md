#Advent of code

Advent of code (https://adventofcode.com/) is an annual collection of daily puzzles for 25 days of Advent.

###Boilerplate

This requires local server (like one integrated into IntelliJ Idea) and browser to use.

####Yearly preparation
`data/_year_template` contains 25 folders with placeholder files ready for use. 
Copy it as `data/<year>`. 

####Usage
* In `index.html`, set `YEAR` and `DAY` constants to correspond to intended day.
* Paste your personal input to `data/<year>/<day>/input.txt`
  * You can use side input files for testing on smaller examples. Modify `INPUT` in `index.html` to change used file. If specified file is not found, `input.txt` will be used instead.
* Work on solution within `data/<year>/<day>/solver.js` which implements and exports a function that, given an array of input lines, returns a single value.
  * To measure performance, use `performance.mark("<name>")` and `performance.measure("<name>", "<from>")` where `from` is `start` or another mark name. 
