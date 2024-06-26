export default function Rules() {
    return (
        <div className="relative bg-cover bg-center h-screen max-w-screen flex flex-col justify-center p-5" style={{ backgroundImage: "url('https://staticg.sportskeeda.com/editor/2022/01/75cf6-16417735114579-1920.jpg')" }}>
            <h1 className="text-4xl text-white outline-text font-bold">Rules</h1>
            <ol className="text-2xl color-redstone2 outline-text font-bold p-2">
                <li>*Any form of hacking or exploiting is strictly prohibited</li>
                <li>*Cracked accounts are not permitted on the server</li>
                <li>*Any form of swearing is strictly prohibited including chat, signs and messages</li>
                <li>*Inapropriate content of any kind is not allowed including but not limited to:
                dark humor, substances, sexual content and political/controversial topics</li>
                <li>*Pretending to be a staff member is not allowed</li>
                <li>*Attempting to bypass or abuse these rules will result in an immediate perma ban</li>
            </ol>
            <h1 className="text-4xl text-white outline-text font-bold">Moderation</h1>
            <p className="text-2xl text-yellow-500 outline-text font-bold p-2">All moderation decisions are made by staff and are (pending a single appeal) final.
                Staff members may warn, mute, kick, wipe your progress and ban you if they have
                sufficient evidence that you are breaking the rules. Please report any staff 
                malfeasance to a higher staff member.
            </p>
        </div>
    )
}