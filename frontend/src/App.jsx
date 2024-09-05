import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Toaster } from 'sonner'
import MainRoute from './routes/MainRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-fuchsia-800">
      <Toaster richColors position="top-right"/>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/*" element={<MainRoute />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
