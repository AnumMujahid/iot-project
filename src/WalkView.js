import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import moment from 'moment';
import BarChart from './BarChart';

firebase.initializeApp(config);
const db = getDatabase();
const WalkView = () => {
  //store data from table
  const [walkArray, setWalkArray] = useState({});
  //store data from column
  const [steps, setSteps] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    const walkRef = ref(db, 'walk');
    //snapshot keeps data updated
    onValue(walkRef, (snapshot) => {
      const data = snapshot.val();
      setWalkArray(data); //set data from table
      const updatedStepsArray = [];
      const updatedTimeStampArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedStepsArray.push(value.StepTotal);
        updatedTimeStampArray.push(moment(value.ActivityDay).format('LL'));
      }
      setSteps(updatedStepsArray); //set data from column
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
          text="Steps Per Day"
          dataSet={[calculateAverage(steps), '10000']}
          labelSet={['Average Steps Per Day', 'Minimum Steps for Adults']}
        />
      </div>
      <LineChart dataSet={steps} labelSet={timeStamp} text="Steps Per Day"/>
    </div>
  );
};

export default WalkView;
