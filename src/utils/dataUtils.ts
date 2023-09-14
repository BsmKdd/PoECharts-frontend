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
                .map(
                    (oneDayData) =>
                        oneDayData.league == league.name && {
                            x: oneDayData.day,
                            y: oneDayData.players,
                        },
                )
                .filter((oneDayData): oneDayData is { x: number; y: number } => !!oneDayData)
                .slice(0, 100),
        })
    }

    return datasets
}
