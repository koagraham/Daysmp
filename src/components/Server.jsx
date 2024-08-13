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
        <div className="relative bg-cover bg-center h-screen max-w-screen flex flex-col justify-center items-center" style={{ backgroundImage: "url('https://static.planetminecraft.com/files/resource_media/screenshot/1143/scr%20red_718008.jpg')" }}>
            <h1 className="text-4xl text-white font-bold outline-text ">Server</h1>
            <h3 className="text-2xl color-redstone3 font-bold outline-text">IP: daybreaker.fr.to</h3>
            <h3 className="text-2xl color-redstone3 font-bold outline-text">Version: 1.20.4</h3>
            <h3 className="text-2xl color-redstone3 font-bold outline-text">Status: Offline</h3>
            <h3 className="text-2xl color-redstone3 font-bold outline-text">Current Players: 0/100</h3>
        </div>
    )
}