import { ChartData, ChartOptions } from 'chart.js'
import { useState } from 'react'
import { ChartContainer } from '../../components/Chart/Chart'
import { PlayerbaseData, LeaguesData } from '../../data/PlayerbaseData'
import styles from './Playerbase.module.scss'
import { splitLeaguesIntoDatasets } from '../../utils/dataUtils'

const Playerbase = (): JSX.Element => {
    const [userData] = useState<ChartData<'line'>>({
        labels: Array.from({ length: 100 }, (_, i) => i + 1),
        datasets: splitLeaguesIntoDatasets(LeaguesData, PlayerbaseData).slice().reverse(),
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
        resizeDelay: 500,
        animation: {
            duration: 0,
        },
        spanGaps: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'index',
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                },
                grid: { display: false },
            },
            y: {
                title: {
                    display: true,
                    text: 'Peak Concurrent Players',
                },
                grid: { display: true, color: '#666' },
            },
        },
    })

    return (
        <div className={styles.playerBaseContainer}>
            <ChartContainer chartType="line" chartData={userData} chartOptions={options} />
            {/* <ChartContainer chartType="line" chartData={viewerData} chartOptions={options} /> */}
        </div>
    )
}

export default Playerbase
