import { useEffect, useState, useRef } from 'react';
import moment from "moment";

import logo from './assets/sleeping.svg';
import './App.css';

import { Controls } from './components/controls/controls';
import { TimeItems } from './components/time-items/time-items';

function App() {
  const [timeItems, setTimeItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(moment(new Date()).add(30, "m").toDate()); //  bind to date-/timepicker
  const [fallASleepTime, setfallASleepTime] = useState(15);   //  should be customizable 
  const [sleepCycles, setSleepCycles] = useState(6);

  const calculateWakeTime = (bedtime) => {
    const cycleTime = 90;
    const timeItems = [];
    for (let i = 0; i < sleepCycles; i++) {
      timeItems.push(moment(bedtime).add((cycleTime * i) + fallASleepTime, 'm').toDate());
    }
    return timeItems;
  }

  const onCurrentBedtime = (e) => {
    setTimeItems(calculateWakeTime(new Date()).reverse());
  }

  const onSelectedBedtime = (e) => {
    setTimeItems(calculateWakeTime(selectedTime).reverse());
  }

  const onReset = (e) => {
    setTimeItems([]);
  }

  return (
    <div className="app">
      <main className='main'>
        <div className='container'>
          <img src={logo} className="logo" alt="logo" />
          <h1>sleepy</h1>
          <TimeItems timeItems={timeItems} />
          <Controls timeItems={timeItems} selectedTime={selectedTime}
            onCurrentBedtime={onCurrentBedtime} onSelectedBedtime={onSelectedBedtime} onReset={onReset} />
        </div>
      </main>
    </div>
  );
}

export default App;
