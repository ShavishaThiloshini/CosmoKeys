import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import PianoPage from './pages/PianoPage';
import ChordsPage from './pages/ChordsPage';
import HarmonyPage from './pages/HarmonyPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-deep-space text-star-white font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/piano" element={<PianoPage />} />
            <Route path="/chords" element={<ChordsPage />} />
            <Route path="/harmony" element={<HarmonyPage />} />
            {/* Default Route */}
            <Route path="*" element={<Navigate to="/piano" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
