import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import * as firebase from 'firebase/app';
import { config } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import moment from 'moment';

firebase.initializeApp(config);
const db = getDatabase();
const PulseReportView = () => {
  //store data from table
  const [bpmArray, setBpmArray] = useState({});
  //store data from column
  const [bpm, setBpm] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  const [sleepBpm, setSleepBpm] = useState([]);
  const [sleepTimestamp, setSleepTimestamp] = useState([]);

  const [eatBpm, setEatBpm] = useState([]);
  const [eatTimestamp, setEatTimestamp] = useState([]);

  const [exerciseBpm, setExerciseBpm] = useState([]);
  const [exerciseTimestamp, setExerciseTimestamp] = useState([]);

  const [normalBpm, setNormalBpm] = useState([]);
  const [normalTimestamp, setNormalTimestamp] = useState([]);

  useEffect(() => {
    const bpmRef = ref(db, 'bpm');
    //snapshot keeps data updated
    onValue(bpmRef, (snapshot) => {
      const data = snapshot.val();
      setBpmArray(data); //set data from table
      const updatedBpmArray = [];
      const updatedTimeStampArray = [];
      const updatedSleepBpmArray = [];
      const updatedEatBpmArray = [];
      const updatedExerciseBpmArray = [];
      const updatedNormalBpmArray = [];
      const updatedSleepTimestampArray = [];
      const updatedEatTimestampArray = [];
      const updatedExerciseTimestampArray = [];
      const updatedNormalTimestampArray = [];
      for (const [key, value] of Object.entries(data)) {
        if (value.activity === 'eating') {
          updatedEatBpmArray.push(value.bpm);
          updatedEatTimestampArray.push(moment(value.timestamp).format('LLLL'));
        } else if (value.activity === 'sleeping') {
          updatedSleepBpmArray.push(value.bpm);
          updatedSleepTimestampArray.push(
            moment(value.timestamp).format('LLLL')
          );
        } else if (value.activity === 'exercising') {
          updatedExerciseBpmArray.push(value.bpm);
          updatedExerciseTimestampArray.push(
            moment(value.timestamp).format('LLLL')
          );
        } else if (value.activity === 'normal') {
          updatedNormalBpmArray.push(value.bpm);
          updatedNormalTimestampArray.push(
            moment(value.timestamp).format('LLLL')
          );
        }
        updatedBpmArray.push(value.bpm);
        updatedTimeStampArray.push(moment(value.timestamp).format('LLLL'));
      }
      setBpm(updatedBpmArray); //set data from column
      setTimeStamp(updatedTimeStampArray);

      setEatBpm(updatedEatBpmArray);
      setEatTimestamp(updatedEatTimestampArray);

      setSleepBpm(updatedSleepBpmArray);
      setSleepTimestamp(updatedSleepTimestampArray);

      setExerciseBpm(updatedExerciseBpmArray);
      setExerciseTimestamp(updatedExerciseTimestampArray);

      setNormalBpm(updatedNormalBpmArray);
      setNormalTimestamp(updatedNormalTimestampArray);
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
        margin: 'auto auto auto 350px',
      }}
    >
      <div style={{ width: '500px', margin: '50px auto' }}>
        <BarChart
          text="Pulse Rate"
          dataSet={[
            calculateAverage(bpm),
            calculateAverage(eatBpm),
            calculateAverage(sleepBpm),
            calculateAverage(exerciseBpm),
            calculateAverage(normalBpm),
          ]}
          labelSet={[
            'Average Pulse Rate',
            'Pulse Rate - Eating',
            'Pulse Rate - Sleeping',
            'Pulse Rate - Exercising',
            'Pulse Rate - Normal',
          ]}
        />
      </div>
      <LineChart dataSet={bpm} labelSet={timeStamp} text="Pulse Rate" />
      <br />
      <br />
      <LineChart
        dataSet={eatBpm}
        labelSet={eatTimestamp}
        text="Pulse Rate - Eating"
      />
      <br />
      <br />
      <LineChart
        dataSet={sleepBpm}
        labelSet={sleepTimestamp}
        text="Pulse Rate - Sleeping"
      />
      <br />
      <br />
      <LineChart
        dataSet={exerciseBpm}
        labelSet={exerciseTimestamp}
        text="Pulse Rate - Exercising"
      />
      <br />
      <br />
      <LineChart
        dataSet={normalBpm}
        labelSet={normalTimestamp}
        text="Pulse Rate - Normal Routine"
      />
    </div>
  );
};

export default PulseReportView;
