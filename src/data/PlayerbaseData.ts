import { LeaguesInterface, PlayerNumbersInterface } from '../@types/playerData';
import playerbaseJson from './chartProcessed.json';
import leaguesJson from './leagues.json';

const playerNumbersData: PlayerNumbersInterface = playerbaseJson.map((data) => {
    const date = data.date;

    return {
        ...data,
        date,
    };
});

const leaguesData: LeaguesInterface = leaguesJson.map((data) => {
    const start = data.start;
    const end = data.end;

    return {
        ...data,
        start,
        end,
    };
});

export { leaguesData as LeaguesData, playerNumbersData as PlayerNumbersData };
