import HomeFooter from "./components/HomeFooter";

export default function Home() {

  return (
    <main className="bg-background bg-center w-full h-screen bg-cover">
      <header className="bg-black/70 py-5 px-4">
        <h1 className="font-bold text-white uppercase text-xl">Rust - Ressources</h1>
      </header>
      <HomeFooter />
    </main>
  )
}
