export default function Home() {

    return (
        <div className="relative bg-cover bg-center h-screen max-w-screen" style={{ backgroundImage: "url('https://static.planetminecraft.com/files/resource_media/screenshot/1248/minecraft_4289159.jpg')" }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="outline-text text-4xl font-bold text-yellow-500 text-center m-0">Welcome to the Daybreaker SMP</h1>
            </div>
            <div className="absolute inset-0 flex items-end justify-center px-6">   
                <p className="text-2xl text-white font-medium outline-text text-center">The Daybreaker SMP is a family-friendly survival multiplayer Minecraft server 
                    where players can survive, build, fight each other and everything in between. 
                    With 24/7 hosting, an eager community and a vanilla playstyle not common elsewhere,
                    the Daybreaker SMP is the perfect traditional Minecraft server to join today. 
                    Check out the{" "}{<a href="/server" className="text-blue-700 hover:underline">server</a>} page for more information! </p>
            </div>
        </div>
    )
}