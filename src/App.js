import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import logo from './assets/sleeping.svg';
import './App.css';
import { Controls } from './components/controls/controls';
import { TimeItems } from './components/time-items/time-items';
import { LocalizedTimePicker } from './components/time-picker/time-picker';

function App() {
  const [timeItems, setTimeItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [fallASleepTime, setfallASleepTime] = useState(15);   //  should be customizable 
  const [sleepCycles, setSleepCycles] = useState(6);
  const [calculatingBedtime, setCalculatingBedtime] = useState(false);

  const calculateWakeTime = (bedtime) => {
    const cycleTime = 90;
    const timeItems = [];

    for (let i = 0; i < sleepCycles; i++) {
      timeItems.push(dayjs(bedtime).add((cycleTime * (i + 1)) + fallASleepTime, 'm').toDate());
    }
    return timeItems;
  }

  const onSelectedCalculation = () => {
    calculatingBedtime ? console.log("TODO") : setTimeItems(calculateWakeTime(selectedTime).reverse());
  }

  const onCurrentBedtime = (e) => {
    setTimeItems(calculateWakeTime(new Date()).reverse());
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
          {(timeItems && timeItems.length === 0) && <LocalizedTimePicker value={selectedTime} setValue={setSelectedTime} />}
          <TimeItems timeItems={timeItems} />
          <Controls timeItems={timeItems} selectedTime={selectedTime}
            onSelectedCalculation={onSelectedCalculation} onCurrentBedtime={onCurrentBedtime} onReset={onReset} checked={calculatingBedtime} setChecked={setCalculatingBedtime} />
        </div>
      </main>
    </div>
  );
}

export default App;
