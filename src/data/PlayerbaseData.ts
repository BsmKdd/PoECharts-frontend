import playerbaseJson from './chart.json'

const playerbaseData = playerbaseJson.map((data) => {
    const date = new Date(data.date)

    return {
        ...data,
        date: date.toLocaleDateString('en-GB'),
    }
})

export { playerbaseData as PlayerbaseData }
