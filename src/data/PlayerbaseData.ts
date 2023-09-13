import { convertDate } from '../utils/dataUtils'
import { LeaguesDataInterface, PlayerbaseDataInterface } from '../types/playerData'
import playerbaseJson from './chart.json'
import leaguesJson from './leagues.json'

const playerbaseData: PlayerbaseDataInterface = playerbaseJson.map((data) => {
    const date = convertDate(data.date)

    return {
        ...data,
        ...(!data.twitchViewers && { twitchViewers: 0 }),
        date,
    }
})

const leaguesData: LeaguesDataInterface = leaguesJson.map((data) => {
    const start = convertDate(data.start)
    const end = convertDate(data.end)

    return {
        ...data,
        start,
        end,
    }
})

export { leaguesData as LeaguesData, playerbaseData as PlayerbaseData }
