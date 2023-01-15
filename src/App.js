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
  const [currentDescription, setCurrentDescription] = useState("");

  const calculateTimeItems = (time, subtract = false) => {
    const cycleTime = 90;
    const timeItems = [];

    for (let i = 0; i < sleepCycles; i++) {
      subtract ?
        timeItems.push(dayjs(time).subtract((cycleTime * (i + 1)) + fallASleepTime, 'm').toDate()) :
        timeItems.push(dayjs(time).add((cycleTime * (i + 1)) + fallASleepTime, 'm').toDate());
    }
    setTimeItems(timeItems.reverse());
  }

  const onSelectedCalculation = () => {
    if (calculatingBedtime) {
      calculateTimeItems(selectedTime, true);
      setCurrentDescription(`If I want to wake up at: ${dayjs(selectedTime).format("HH:mm")} I should go to bed around:`)
    } else {
      calculateTimeItems(selectedTime);
      setCurrentDescription(`If I go to bed at: ${dayjs(selectedTime).format("HH:mm")} I should wake up around:`)
    }
  }

  const onCurrentBedtime = (e) => {
    const currentTime = new Date();
    calculateTimeItems(currentTime);
    setCurrentDescription(`If I go to bed now at: ${dayjs(currentTime).format("HH:mm")}`)
  }

  const onReset = (e) => {
    setTimeItems([]);
    setCurrentDescription("");
    setSelectedTime(dayjs(new Date()));

  }

  return (
    <div className="app">
      <main className='main'>
        <div className='container'>
          <img src={logo} className="logo" alt="Logo of a sleepy moon" />
          <h1>sleepy</h1>
          {(timeItems && timeItems.length === 0) && <LocalizedTimePicker value={selectedTime} setValue={setSelectedTime} />}
          {(timeItems && timeItems.length !== 0) && <p className="u-text-align-center">{currentDescription}</p>}
          <TimeItems timeItems={timeItems} />
          <Controls timeItems={timeItems} selectedTime={selectedTime}
            onSelectedCalculation={onSelectedCalculation} onCurrentBedtime={onCurrentBedtime} onReset={onReset} checked={calculatingBedtime} setChecked={setCalculatingBedtime} />
        </div>
      </main>
    </div>
  );
}

export default App;
