import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import moment from 'moment';
import BarChart from './BarChart';

firebase.initializeApp(config);
const db = getDatabase();
const BpmView = () => {
  //store data from table
  const [bpmArray, setBpmArray] = useState({});
  //store data from column
  const [bpm, setBpm] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    const bpmRef = ref(db, 'bpm');
    //snapshot keeps data updated
    onValue(bpmRef, (snapshot) => {
      const data = snapshot.val();
      setBpmArray(data); //set data from table
      const updatedBpmArray = [];
      const updatedTimeStampArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedBpmArray.push(value.bpm);
        updatedTimeStampArray.push(moment(value.timestamp).format('LLLL'));
      }
      setBpm(updatedBpmArray); //set data from column
      setTimeStamp(updatedTimeStampArray);
    });
  }, []);

  const calculateAverage = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = sum / arr.length || 0;
    return avg;
  };

  return (
    <div
      style={{
        width: '1000px',
        height: '900px',
        margin: 'auto auto auto 250px',
      }}
    >
      <div style={{ width: '500px', margin: '50px auto' }}>
        <BarChart
          text="Pulse Rate"
          dataSet={[60, calculateAverage(bpm), 100]}
          labelSet={[
            'Minimum Pulse Rate',
            'Average Pulse Rate',
            'Maximum Pulse Rate',
          ]}
        />
      </div>
      <LineChart dataSet={bpm} labelSet={timeStamp} text={'Pulse Rate'} />
    </div>
  );
};

export default BpmView;
