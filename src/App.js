import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BpmView from './BpmView';
import SleepView from './SleepView';
import WeightView from './WeightView';
import WalkView from './WalkView';
import PulseReportView from './PulseReportView';
import Sidebar from './Sidebar';

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<BpmView />} />
          <Route path="/sleep" element={<SleepView />} />
          <Route path="/weight" element={<WeightView />} />
          <Route path="/walk" element={<WalkView />} />
          <Route path="/pulsereport" element={<PulseReportView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
