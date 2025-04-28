import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ModelDetail from './pages/ModelDetail';
import Premium from './pages/Premium';
import DMCA from './pages/DMCA';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark-300">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model/:id" element={<ModelDetail />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/dmca" element={<DMCA />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;