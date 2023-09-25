import type { LeaguesInterface, PlayerNumbersInterface } from '../@types/playerData';
import { ChartDataset } from 'chart.js';

export const splitLeaguesIntoDatasets = (
    leaguesData: LeaguesInterface,
    playerbaseData: PlayerNumbersInterface,
): ChartDataset<'line'>[] => {
    const datasets: ChartDataset<'line'>[] = [];

    for (const league of leaguesData) {
        datasets.push({
            label: league.name,
            data: playerbaseData
                .filter((oneDayData) => oneDayData.league == league.name)
                .map((oneDayData) => ({
                    x: oneDayData.day || NaN,
                    y: oneDayData.players || NaN,
                }))
                .slice(0, 100),
            animation: {
                duration: 0,
            },
        });
    }

    return datasets;
};
