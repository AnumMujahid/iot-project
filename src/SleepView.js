import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

firebase.initializeApp(config);
const db = getDatabase();
const SleepView = ({ data }) => {
  //store data from table
  const [bpm, setBpm] = useState({});
  //store data from column
  const [avgBpm, setAvgBpm] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    const bpmRef = ref(db, 'bpm');
    //snapshot keeps data updated
    onValue(bpmRef, (snapshot) => {
      const data = snapshot.val();
      setBpm(data); //set data from table
      const updatedAvgBpmArray = [];
      const updatedTimeStampArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedAvgBpmArray.push(value.avgBpm);
        updatedTimeStampArray.push(value.timestamp);
      }
      setAvgBpm(updatedAvgBpmArray); //set data from column
      setTimeStamp(updatedTimeStampArray);
    });
  }, []);

  return <div>sleep view{console.log(bpm)}</div>;
};

export default SleepView;
