import axios from 'axios'

const serverInfo = async (req, res) => {
    const { address } = req.query
    const response = await axios.get(`https://api.mcsrvstat.us/3/${address}`)
    const { online, ip, hostname, players, version } = response.data
    try {
        res.json({  
            message: "Minecraft server status requested",
            success: true,
            online: online,
            ip: ip,
            hostname: hostname,
            version: version,
            playerCount: players.online ? players.online : "0",
            maxPlayers: players.max,
        })
    } catch (error) {
        console.error(error)
    }
}

export { serverInfo }