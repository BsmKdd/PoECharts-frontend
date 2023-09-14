import { LeaguesDataInterface, PlayerbaseDataInterface } from '../types/playerData'
import playerbaseJson from './chartProcessed.json'
import leaguesJson from './leagues.json'

const playerbaseData: PlayerbaseDataInterface = playerbaseJson.map((data) => {
    const date = data.date

    return {
        ...data,
        date,
    }
})

const leaguesData: LeaguesDataInterface = leaguesJson.map((data) => {
    const start = data.start
    const end = data.end

    return {
        ...data,
        start,
        end,
    }
})

export { leaguesData as LeaguesData, playerbaseData as PlayerbaseData }
