import './App.css';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

firebase.initializeApp(config);
const db = getDatabase();
function App() {
  // Define the state of the component
  const [bpm, setBpm] = useState(0);

  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const starCountRef = ref(db, 'bpm');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      // updateStarCount(postElement, data);
    });
  }, []);

  return (
    <div>
      <p>{bpm}</p>
    </div>
  );
}

export default App;
