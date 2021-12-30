import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BpmView from './BpmView';
import SleepView from './SleepView';
import Sidebar from './Sidebar';

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<BpmView />} />
          <Route path="/sleep" element={<SleepView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
