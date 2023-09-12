import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Playerbase from './pages/Playerbase/Playerbase'
import Economy from './pages/Economy'

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <main>
                <Routes>
                    <Route path="/" element={<>Home Page</>} />
                    <Route path="/playerbase" element={<Playerbase />} />
                    <Route path="economy" element={<Economy />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
