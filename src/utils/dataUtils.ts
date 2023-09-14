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
                .filter((oneDayData) => {
                    return oneDayData.day && oneDayData.players && oneDayData.league == league.name
                })
                .map((oneDayData) => ({
                    x: oneDayData.day,
                    y: oneDayData.players,
                }))
                .slice(0, 100),
        })
    }

    return datasets
}
