import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Server() {
    const [status, setStatus] = useState(false)
    const [ip, setIP] = useState(false)
    const [hostname, setHostname] = useState(false)
    const [version, setVersion] = useState(false)
    const [players, setPlayers] = useState(false)
    const [maxPlayers, setMaxPlayers] = useState(false)
    let checkPlayers = 0

    const serverInfo = async (address) => {
        const res = await axios.get('/api/mc/info', {
            params: { address: address }
        })
        setStatus(res.data.online)
        setIP(res.data.ip)
        setHostname(res.data.hostname)
        setPlayers(res.data.playerCount)
        setMaxPlayers(res.data.maxPlayers)
        setVersion(res.data.version)
    }

    useEffect(() => {
        serverInfo('daybreaker.fr.to');
        const interval = setInterval(() => {
            serverInfo('daybreaker.fr.to'); // Fetch server status periodically
        }, 15000); // Fetch server status every 15 seconds

        // Cleanup interval to avoid memory leaks
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Server</h1>
            <h3>IP: {ip ? hostname : "Connection Error"}</h3>
            <h3>Version: {version ? version : "Connection Error"}</h3>
            <h3>Status: {status ? "Online" : "Offline"}</h3>
            <h3>Current Players: {players ? players : "Connection Error"}/{maxPlayers ? maxPlayers : "Connection Error"}</h3>
        </div>
    )
}