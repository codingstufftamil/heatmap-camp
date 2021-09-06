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
    
    let minYear = d3.min(values, (item) => {
        return item['month']
    })
    
    let maxYear = d3.max(values, (item) => {
        return item['month']
    })
    xScale = d3.scaleLinear()
                .domain([minYear, maxYear + 1])
                .range([padding, width - padding])


                yScale = d3.scaleTime()
                .domain([new Date(0000), new Date(0,12,0,0,0,0,0)])
                .range([padding, height - padding])

}

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let drawCells = () => {

    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class','cell')




        svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class','cell')
        .attr('fill', (item) => {
            let variance = item['Affected']
            if(variance <= 0){
                return 'SteelBlue'
            }else if(variance <= 10000){
                return 'LightSteelBlue'
            }else if(variance <= 100000){
                return 'Orange'
            }else{
                return 'Crimson'
            }
        })
        .attr('data-year', (item) => {
            return['Country']
        })
        .attr('data-month', (item) => {
            return['month']
        })
        .attr('data-temp', (item) => {
            return['Affected']
        })
}

let generateAxes = () => {


    let xAxis = d3.axisBottom(xScale)

    svg.append('g')
        .call(xAxis)
        .attr('id','x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) + ')')



    let yAxis = d3.axisLeft(yScale)

	svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
    
}
req.open('GET', url, true)
req.onload = () => {
    let data = JSON.parse(req.responseText)
    // baseTemp = data.baseTemperature
    values = data.monthlyVariance
    // console.log(baseTemp)
    console.log(values)
    drawCanvas()
    generateScales()
    drawCells()
    generateAxes()
}
req.send()