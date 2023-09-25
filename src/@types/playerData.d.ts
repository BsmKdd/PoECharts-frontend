interface OneDayNumbers {
    league?: string;
    day?: number;
    retention?: number;
    date: string;
    players: number;
    averagePlayers?: number | string;
    twitchViewers?: number;
}

interface League {
    version: string;
    expansion?: string;
    league: string;
    name: string;
    start: string;
    end?: string;
}

type PlayerNumbers = OneDayData[];
type Leagues = League[];

export type {
    OneDayNumbers as OneDayNumbersInterface,
    PlayerNumbers as PlayerNumbersInterface,
    League as LeagueInterface,
    Leagues as LeaguesInterface,
};
