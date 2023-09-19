interface OneDayData {
    league?: string
    day?: number
    retention?: number
    date: string
    players: number
    averagePlayers?: number | string
    twitchViewers?: number
}

interface LeagueData {
    version: string
    expansion?: string
    league: string
    name: string
    start: string
    end?: string
}

type PlayerbaseData = OneDayData[]
type LeaguesData = LeagueData[]

export type {
    LeagueData as LeagueDataInterface,
    OneDayData as OneDayDataInterface,
    PlayerbaseData as PlayerbaseDataInterface,
    LeaguesData as LeaguesDataInterface,
};
