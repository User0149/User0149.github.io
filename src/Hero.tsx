export default function Hero() {
    return (
        <section className="h-screen relative bg-[url('./assets/profile_photo.svg')] bg-no-repeat">
            <div className="h-full w-full absolute top-0 left-0 bg-[gray] opacity-10 z-0"></div>
            <div className="content-container">
                <div className="relative z-1 pt-40 space-y-4">
                    <div>
                        <h1 className="text-center text-7xl">Welcome to my</h1>
                        <h1 className="text-center text-7xl">GitHub!</h1>
                    </div>
                    <div className="mx-auto text-center text-3xl border w-60 p-3 rounded-full cursor-pointer">View projects</div>
                </div>
            </div>
        </section>
    );
}