import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import moment from 'moment';
import BarChart from './BarChart';

firebase.initializeApp(config);
const db = getDatabase();
const WeightView = () => {
  //store data from table
  const [weightArray, setWeightArray] = useState({});
  //store data from column
  const [bmi, setBmi] = useState([]);
  const [weightKg, setWeightKg] = useState([]);
  const [fat, setFat] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    const weightRef = ref(db, 'weight');
    //snapshot keeps data updated
    onValue(weightRef, (snapshot) => {
      const data = snapshot.val();
      setWeightArray(data); //set data from table
      const updatedBmiArray = [];
      const updatedWeightKgArray = [];
      const updatedFatArray = [];
      const updatedTimeStampArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedBmiArray.push(value.BMI);
        updatedWeightKgArray.push(value.WeightKg);
        updatedFatArray.push(value.Fat);
        updatedTimeStampArray.push(moment(value.Date).format('LL'));
      }
      setBmi(updatedBmiArray); //set data from column
      setWeightKg(updatedWeightKgArray);
      setFat(updatedFatArray);
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
          text="BMI"
          dataSet={['18.5', calculateAverage(bmi), '24.9']}
          labelSet={[
            'Minimum Healthy BMI',
            'Average BMI',
            'Maximum Healthy BMI',
          ]}
        />
      </div>
      <div style={{ width: '500px', margin: '50px auto' }}>
        <BarChart
          text="Weight in Kg"
          dataSet={['65', calculateAverage(weightKg), '80']}
          labelSet={[
            'Minimum Weight for 5`9``',
            'Average Weight Kg',
            'Maximum Weight for 5`9``',
          ]}
        />
      </div>
      <div style={{ width: '500px', margin: '50px auto' }}>
        <BarChart
          text="Fat Percentage"
          dataSet={[calculateAverage(fat), '25']}
          labelSet={['Average Fat', 'Acceptable Fat Range']}
        />
      </div>
      <LineChart dataSet={bmi} labelSet={timeStamp} text="BMI" />
      <br />
      <br />
      <LineChart dataSet={weightKg} labelSet={timeStamp} text="Weight in Kg" />
      <br />
      <br />
      <LineChart dataSet={fat} labelSet={timeStamp} text="Fat Percentage" />
    </div>
  );
};

export default WeightView;
