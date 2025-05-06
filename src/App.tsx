import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './polymet/pages/landing-page';
import ScanLoadingPage from './polymet/pages/scan-loading-page';
import PolymetScanResults from './polymet/pages/scan-results';
import InstructionsPromo from './polymet/pages/instructions-promo';
import BookingPage from './polymet/pages/booking-page';

console.log("[DEBUG] App.tsx loading");

// Create a simple component in the most basic way
function App() {
  console.log("[DEBUG] App rendering");
  
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan-loading" element={<ScanLoadingPage />} />
        <Route path="/scan-results" element={<PolymetScanResults />} />
        <Route path="/instructions-promo" element={<InstructionsPromo />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

// Export in the simplest way possible
console.log("[DEBUG] App.tsx exporting App");
export default App; 