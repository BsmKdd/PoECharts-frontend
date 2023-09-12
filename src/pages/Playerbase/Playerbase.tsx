import { useState } from 'react'
import { PlayerbaseData } from '../../data/PlayerbaseData'
import { ChartOptions, ChartData } from 'chart.js'
import { ChartTypeEnum, ChartContainer } from '../../components/Chart/Chart'
import styles from './Playerbase.module.scss'

const Playerbase = (): JSX.Element => {
    const [userData] = useState<ChartData<'line'>>({
        labels: PlayerbaseData.map((data) => data.date),
        datasets: [
            {
                label: 'Peak Players',
                data: PlayerbaseData.map((data) => data.players),
                backgroundColor: '#fafafa',
            },
            {
                label: 'Twitch Viewers',
                data: PlayerbaseData.map((data) => data.twitchViewers),
                backgroundColor: '#9146ff',
            },
        ],
    })

    const [options] = useState<ChartOptions<'line'>>({
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3,
        resizeDelay: 200,
        plugins: {
            colors: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: { color: '#0000001a' },
            },
            y: {},
        },
    })

    return (
        <div className={styles.playerBaseContainer}>
            <ChartContainer
                chartType={ChartTypeEnum.line}
                chartData={userData}
                chartOptions={options}
            />
        </div>
    )
}

export default Playerbase
