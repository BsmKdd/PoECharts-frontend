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
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
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

enum ChartTypeEnum {
    bar = 'bar',
    line = 'line',
    pie = 'pie',
    doughnut = 'doughnut',
}

interface Props {
    chartType: ChartTypeEnum
    chartData: ChartData<'bar' | 'line' | 'pie' | 'doughnut'>
    chartOptions: ChartOptions<'bar' | 'line'>
}

const ChartContainer: React.FC<Props> = ({
    chartType,
    chartData,
    chartOptions,
}: Props): JSX.Element => {
    let chart: JSX.Element

    switch (chartType) {
        case ChartTypeEnum.bar:
            chart = (
                <Bar
                    data={chartData as ChartData<'bar'>}
                    options={chartOptions as ChartOptions<'bar'>}
                />
            )
            break
        case ChartTypeEnum.line:
            chart = (
                <Line
                    data={chartData as ChartData<'line'>}
                    options={chartOptions as ChartOptions<'line'>}
                />
            )
            break
        case ChartTypeEnum.pie:
            chart = <Pie data={chartData as ChartData<'pie'>} />
            break
        case ChartTypeEnum.doughnut:
            chart = <Doughnut data={chartData as ChartData<'doughnut'>} />
    }

    return <div className={styles.chartContainer}>{chart}</div>
}

export { ChartTypeEnum, ChartContainer }
