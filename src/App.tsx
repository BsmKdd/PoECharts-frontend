import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            {/* Add routes */}
        </BrowserRouter>
    )
}

export default App
