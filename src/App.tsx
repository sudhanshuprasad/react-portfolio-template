import React, {useState, useEffect} from "react";
import FadeIn from './components/FadeIn.tsx';
import Main from './components/Main.tsx';
import Navigation from './components/Navigation.tsx';
import './index.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
            {/* <Expertise/> */}
            {/* <Timeline/> */}
            {/* <Project/> */}
            {/* <Contact/> */}
        </FadeIn>
        {/* <Footer /> */}
    </div>
    );
}

export default App;