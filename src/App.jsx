import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="vs-app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing/" element={<PricingPage />} />
          <Route path="/legal/terms-of-service/" element={<TermsPage />} />
          <Route path="/legal/privacy-policy/" element={<PrivacyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

