
import "./styles/animations.css";

import SpaceY from "./components/SpaceY";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

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
