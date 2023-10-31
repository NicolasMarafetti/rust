import HomeFooter from "../components/HomeFooter";

export default async function Home() {
    return (
        <main className="bg-background bg-center flex w-full h-screen bg-cover">
            <div className="flex flex-col justify-between w-12/12">
                <header className="bg-black/70 py-5 px-4">
                    <h1 className="font-bold text-white uppercase text-xl">Rust - Ressources</h1>
                </header>
                <HomeFooter />
            </div>
        </main>
    )
}
