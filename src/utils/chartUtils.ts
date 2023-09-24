import { Chart, TooltipModel } from 'chart.js';

export const externalTooltipHandler = (context: {
    chart: Chart;
    tooltip: TooltipModel<'line'>;
}) => {
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        tooltipEl.className = 'chartjsTooltip';
        document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem: { lines: string[] }) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
        const titleLines = tooltipModel.title ? [`Day ${tooltipModel.title}`] : [];
        const bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });

        innerHtml += '</thead><tbody>';

        const rowsPerCol = 12;
        for (let i = 0; i < rowsPerCol; i++) {
            let row = '<tr>';

            for (let j = i; j < bodyLines.length; j += rowsPerCol) {
                const body = bodyLines[j];

                const colors = tooltipModel.labelColors[j];
                let style = 'color:' + colors.backgroundColor;
                style += '; border-width: 2px';

                const colLeft = `<td style='${style}'><img src='${'./src/assets/huh.gif'}'/>${
                    body[0].split(':')[0]
                }</td>`;
                const colRight = `<td style='${style}'>${body[0].split(':')[1]}</td>`;

                row += colLeft + colRight;
            }

            row += '</tr>';
            innerHtml += row;
        }

        innerHtml += '</tbody>';

        const tableRoot = tooltipEl.querySelector('table');
        if (!tableRoot) return;
        tableRoot.innerHTML = innerHtml;
    }

    const position = context.chart.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.position = 'absolute';

    const xPosition = position.left + window.scrollX + tooltipModel.caretX;
    tooltipEl.style.left =
        tooltipEl.clientWidth + tooltipModel.caretX > context.chart.canvas.width
            ? xPosition - tooltipEl.clientWidth + 'px'
            : xPosition + 'px';

    const yPosition = position.top + window.scrollY + tooltipModel.caretY;
    tooltipEl.style.top =
        tooltipEl.clientHeight > tooltipModel.caretY + 2000
            ? yPosition + 'px'
            : yPosition - tooltipEl.clientHeight + 'px';

    tooltipEl.style.pointerEvents = 'none';
};

export const LineOnHoverPlugin = {
    id: 'corsair',
    afterDraw: (chart: Chart) => {
        const activeEle = chart.getActiveElements();
        if (activeEle.length <= 0) return;
        const { ctx, scales } = chart;
        const { x } = activeEle[0].element;
        const topY = scales.y.top;
        const bottomY = scales.y.bottom;
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666';
        ctx.stroke();
        ctx.restore();
    },
};
