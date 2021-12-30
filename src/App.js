import './App.css';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Sidebar from './Sidebar';

firebase.initializeApp(config);
const db = getDatabase();
function App() {
  //store data from table
  const [bpm, setBpm] = useState({});
  //store data from column
  const [avgBpm, setAvgBpm] = useState([]);

  useEffect(() => {
    const bpmRef = ref(db, 'bpm');
    //snapshot keeps data updated
    onValue(bpmRef, (snapshot) => {
      const data = snapshot.val();
      setBpm(data); //set data from table
      const updatedAvgBpmArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedAvgBpmArray.push(value.avgBpm);
      }
      setAvgBpm(updatedAvgBpmArray); //set data from column
    });
  }, []);

  return (
    <div>
      <Sidebar />
      {console.log(bpm)}
      {console.log(avgBpm)}
    </div>
  );
}

export default App;
