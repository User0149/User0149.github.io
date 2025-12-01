import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./styles/animations.css";
import SpaceY from "./components/SpaceY";

function App() {
    return (
        <SpaceY spacing={10}>
            <Hero />
            <Projects />
            <Footer />
        </SpaceY>
    )
}

export default App;