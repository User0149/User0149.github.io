import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./styles/animations.css";

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