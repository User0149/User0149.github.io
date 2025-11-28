import Hero from "./Hero";
import Projects from "./Projects";
import Footer from "./Footer";
import "./App.css";

function App() {
    return (
        <div className="space-y-10">
            <Hero />
            <Projects />
            <Footer />
        </div>
    )
}

export default App;