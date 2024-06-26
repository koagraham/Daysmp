export default function Help() {
    return (
        <div className="relative bg-cover bg-center h-screen max-w-screen flex flex-col justify-center p-5" style={{ backgroundImage: "url('https://preview.redd.it/91w2ua8i2em51.png?auto=webp&s=89f860bbaf395761c8bb47c615a2910dab66c605')" }}>
            <h1 className="text-4xl text-white outline-text font-bold">FAQ</h1>
            <h3 className="text-2xl color-redstone2 font-bold p-1 outline-text p-1">How can I join the server?/What version is the server on?</h3>
            <p className="text-2xl text-yellow-500 font-bold outline-text p-1">All information regarding the server can be found on the
                {" "}{<a href="/server" className="text-blue-700 hover:underline p-1">server</a>} page</p>
            <h3 className="text-2xl color-redstone2 font-bold outline-text p-1">Can I join on Bedrock?</h3>
            <p className="text-2xl text-yellow-500 font-bold outline-text p-1">The server only supports Java edition for now</p>
            <h3 className="text-2xl color-redstone2 font-bold outline-text p-1">Are there any plugins or mods to make the game more interesting?</h3>
            <p className="text-2xl text-yellow-500 font-bold outline-text p-1">There are QOL plugins such as TPA, but there are no mods</p>
            <h3 className="text-2xl color-redstone2 font-bold outline-text p-1">Is there a warp plugin?</h3>
            <p className="text-2xl text-yellow-500 font-bold outline-text p-1">No. We are still looking for a suitable warp plugin</p>
        </div>
    )
}