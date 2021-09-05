let url = 'https://raw.githubusercontent.com/codingstufftamil/heatmap-camp/master/json/covid.json'
let req = new XMLHttpRequest()

let baseTemp
let values =[]

let xScale
let yScale

let xAxis
let yAxis

let width = 1200
let height = 600
let padding = 60

let svg = d3.select('svg')

let generateScales = () => {
    

}

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let drawCells = () => {

    
}

let generateAxes = () => {

    
}

req.open('GET', url, true)
req.onload = () => {
    let data = JSON.parse(req.responseText)
    baseTemp = data.Country/Region
    // values = data.monthlyVariance
    console.log(baseTemp)
    console.log(values)
    drawCanvas()
    generateScales()
    drawCells()
    generateAxes()
}
req.send()
