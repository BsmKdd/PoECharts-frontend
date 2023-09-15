import { Chart, TooltipModel } from 'chart.js'

const getOrCreateTooltip = (chart: Chart) => {
    if (!chart.canvas.parentNode) return
    let tooltipEl = chart?.canvas?.parentNode.querySelector('div')

    if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.style.position = 'absolute'

        const table = document.createElement('table')

        tooltipEl.appendChild(table)
        chart.canvas.parentNode.appendChild(tooltipEl)
    }

    return tooltipEl
}

export const externalTooltipHandler = (context: {
    chart: Chart
    tooltip: TooltipModel<'line'>
}) => {
    // Tooltip Element
    const { chart, tooltip } = context
    if (!chart) return
    const tooltipEl = getOrCreateTooltip(chart)
    if (!tooltipEl) return
    tooltipEl.className = 'chartjsTooltip'

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0'
        return
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title ? [`Day ${tooltip.title}`] : []
        const bodyLines = tooltip.body.map((b) => b.lines)

        const tableHead = document.createElement('thead')

        titleLines.forEach((title) => {
            const tr = document.createElement('tr')

            const th = document.createElement('th')
            const text = document.createTextNode(title)

            th.appendChild(text)
            tr.appendChild(th)
            tableHead.appendChild(tr)
        })

        console.log(chart)

        const tableBody = document.createElement('tbody')
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i]
            // row will have 2 columns, left has image and label, right has number
            const tr = document.createElement('tr')
            tr.style.backgroundColor = 'inherit'

            const tdLeft = document.createElement('td')
            tdLeft.style.color = colors.backgroundColor.toString()

            const img = document.createElement('img')
            img.src = './caterm.gif'
            tdLeft.appendChild(img)

            const labelText = body[0].split(':')[0]
            const labelNode = document.createTextNode(labelText)
            tdLeft.appendChild(labelNode)

            const tdRight = document.createElement('td')
            tdRight.style.color = colors.backgroundColor.toString()
            const labelData = body[0].split(':')[1]
            const numberNode = document.createTextNode(labelData)
            tdRight.appendChild(numberNode)

            tr.appendChild(tdLeft)
            tr.appendChild(tdRight)

            tableBody.appendChild(tr)
        })

        const tableRoot = tooltipEl.querySelector('table')
        if (!tableRoot) return

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove()
        }

        // Add new children
        tableRoot.appendChild(tableHead)
        tableRoot.appendChild(tableBody)
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1'
    tooltipEl.style.left = positionX + tooltip.caretX + 150 + 'px'
    tooltipEl.style.top = positionY + 250 + 'px'
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
}

export const LineOnHoverPlugin = {
    id: 'corsair',
    afterDraw: (chart: Chart) => {
        const activeEle = chart.getActiveElements()
        if (activeEle.length <= 0) return
        const { ctx, scales } = chart
        const { x } = activeEle[0].element
        const topY = scales.y.top
        const bottomY = scales.y.bottom
        ctx.save()
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(x, topY)
        ctx.lineTo(x, bottomY)
        ctx.lineWidth = 1
        ctx.strokeStyle = '#666'
        ctx.stroke()
        ctx.restore()
    },
}
