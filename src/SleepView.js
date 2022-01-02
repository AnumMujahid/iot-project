import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import moment from 'moment';
import BarChart from './BarChart';

firebase.initializeApp(config);
const db = getDatabase();
const SleepView = () => {
  //store data from table
  const [sleepArray, setSleepArray] = useState({});
  //store data from column
  const [sleepHours, setSleepHours] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    const sleepRef = ref(db, 'sleep');
    //snapshot keeps data updated
    onValue(sleepRef, (snapshot) => {
      const data = snapshot.val();
      setSleepArray(data); //set data from table
      const updatedSleepHoursArray = [];
      const updatedTimeStampArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedSleepHoursArray.push(value.TotalMinutesAsleep / 60);
        updatedTimeStampArray.push(moment(value.SleepDay).format('LL'));
      }
      setSleepHours(updatedSleepHoursArray); //set data from column
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
          text="Sleep Time in Hours"
          dataSet={[calculateAverage(sleepHours), 7]}
          labelSet={[
            'Average Sleep Hours Per Day',
            'Minimum Sleep Hours for Adults',
          ]}
        />
      </div>
      <LineChart dataSet={sleepHours} labelSet={timeStamp} text="Sleep Time in Hours"/>
    </div>
  );
};

export default SleepView;
