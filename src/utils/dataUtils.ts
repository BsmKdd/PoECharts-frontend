import type { LeaguesDataInterface, PlayerbaseDataInterface } from '../types/playerData'
import { ChartDataset } from 'chart.js'

export const splitLeaguesIntoDatasets = (
    leaguesData: LeaguesDataInterface,
    playerbaseData: PlayerbaseDataInterface,
): ChartDataset<'line'>[] => {
    const datasets: ChartDataset<'line'>[] = []

    return datasets
    // [
    //     {
    //         label: 'Twitch Viewers',
    //         data: playerbaseData.map((data) => data.twitchViewers),
    //         backgroundColor: '#9146ff',
    //     },
    // ]
}

export const convertDate = (date: string): string => {
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' } as const
    return new Date(date).toLocaleDateString('en-GB', dateOptions)
}
