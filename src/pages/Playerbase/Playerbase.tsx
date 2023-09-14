import { ChartData, ChartOptions } from 'chart.js'
import { useState } from 'react'
import { ChartContainer, ChartTypeEnum } from '../../components/Chart/Chart'
import { PlayerbaseData, LeaguesData } from '../../data/PlayerbaseData'
import styles from './Playerbase.module.scss'
import { splitLeaguesIntoDatasets } from '../../utils/dataUtils'

const Playerbase = (): JSX.Element => {
    const [userData] = useState<ChartData<'line'>>({
        labels: Array.from({ length: 100 }, (_, i) => i + 1),
        datasets: splitLeaguesIntoDatasets(LeaguesData, PlayerbaseData).slice(-1).reverse(),
    })

    const [viewerData] = useState<ChartData<'line'>>({
        labels: PlayerbaseData.map((data) => data.date),
        datasets: [
            {
                label: 'Twitch Viewers',
                data: PlayerbaseData.map((data) => data.twitchViewers || null),
                backgroundColor: '#9146ff',
            },
        ],
    })

    const [options] = useState<ChartOptions<'line'>>({
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        resizeDelay: 200,
        animation: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'index',
        },
        plugins: {
            colors: {
                enabled: true,
            },
            tooltip: {
                yAlign: 'bottom',
                // callbacks: {
                //     label: (tooltipItem, data) => {
                //         console.log(tooltipItem)
                //         return 'what'
                //     },
                // },
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                grid: { color: '#666' },
            },
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
