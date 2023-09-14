import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
    ArcElement,
    Colors,
    ChartData,
    ChartOptions,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import styles from './Chart.module.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
    ArcElement,
    Colors,
)

interface Props {
    chartType: 'line' | 'bar' | 'pie' | 'doughnut'
    chartData: ChartData<'bar' | 'line' | 'pie' | 'doughnut'>
    chartOptions: ChartOptions<'bar' | 'line'>
}

// Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
//     // A reference to the tooltip model
//     const tooltip = this

//     /* ... */

//     return {
//         x: eventPosition.x,
//         y: 50,
//         // You may also include xAlign and yAlign to override those tooltip options.
//     }
// }

const ChartContainer: React.FC<Props> = ({
    chartType,
    chartData,
    chartOptions,
}: Props): JSX.Element => {
    return (
        <div className={styles.chartContainer}>
            <Chart
                data={chartData as ChartData<'line' | 'bar' | 'pie' | 'doughnut'>}
                options={chartOptions as ChartOptions<'line' | 'bar' | 'pie' | 'doughnut'>}
                type={chartType}
            />
        </div>
    )
}

export { ChartContainer }
