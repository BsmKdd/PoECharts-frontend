import { ChartData, ChartOptions } from 'chart.js'
import { useState } from 'react'
import { ChartContainer, ChartTypeEnum } from '../../components/Chart/Chart'
import { PlayerbaseData, LeaguesData } from '../../data/PlayerbaseData'
import styles from './Playerbase.module.scss'
import { splitLeaguesIntoDatasets } from '../../utils/dataUtils'

const Playerbase = (): JSX.Element => {
    const [userData] = useState<ChartData<'line'>>({
        labels: PlayerbaseData.map((data) => data.date),
        datasets: splitLeaguesIntoDatasets(LeaguesData, PlayerbaseData),
    })

    const [viewerData] = useState<ChartData<'line'>>({
        labels: PlayerbaseData.map((data) => data.date),
        datasets: [
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
            <ChartContainer
                chartType={ChartTypeEnum.line}
                chartData={viewerData}
                chartOptions={options}
            />
        </div>
    )
}

export default Playerbase
