import type { LeaguesDataInterface, PlayerbaseDataInterface } from '../types/playerData'
import { ChartDataset } from 'chart.js'

export const splitLeaguesIntoDatasets = (
    leaguesData: LeaguesDataInterface,
    playerbaseData: PlayerbaseDataInterface,
): ChartDataset<'line'>[] => {
    const datasets: ChartDataset<'line'>[] = []

    for (const league of leaguesData) {
        datasets.push({
            label: league.name,
            data: playerbaseData
                .filter((oneDayData) => oneDayData.league == league.name)
                .map((oneDayData) => ({
                    x: oneDayData.day ? oneDayData.day : NaN,
                    y: oneDayData.players ? oneDayData.players : NaN,
                }))
                .slice(0, 100),
            animation: {
                duration: 0,
            },
        })
    }

    return datasets
}
