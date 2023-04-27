import { useState } from 'react';
import dayjs from 'dayjs';
import logo from './assets/sleeping.svg';
import './App.css';
import { Controls } from './components/controls/controls';
import { TimeItems } from './components/time-items/time-items';
import { LocalizedTimePicker } from './components/time-picker/time-picker';

const DESC_DEFAULT = "This is the time I want to: ";

function App() {
  const [timeItems, setTimeItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [fallASleepTime, setfallASleepTime] = useState(15);   //  IDEA: should be customizable 
  const [sleepCycles, setSleepCycles] = useState(6);
  const [currentDescription, setCurrentDescription] = useState(DESC_DEFAULT);

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

  const onWakeUp = () => {
    calculateTimeItems(selectedTime, true);
    setCurrentDescription(`If I want to wake up at ${dayjs(selectedTime).format("HH:mm")} I should go to bed around..`)
  }

  const onGoToBed = () => {
    calculateTimeItems(selectedTime);
    setCurrentDescription(`If I go to bed at ${dayjs(selectedTime).format("HH:mm")} I should wake up around..`)
  }

  const onCurrentBedtime = (e) => {
    const currentTime = new Date();
    calculateTimeItems(currentTime);
    setCurrentDescription(`If I go to bed now at ${dayjs(currentTime).format("HH:mm")} I should wake up around..`)
  }

  const onReset = (e) => {
    setTimeItems([]);
    setCurrentDescription(DESC_DEFAULT);
  }

  return (
    <div className="app">
      <main className='main'>
        <div className='container'>
          <img src={logo} className="logo" alt="Logo of a sleepy moon" />
          <h1>sleepy</h1>
          {(timeItems && timeItems.length === 0) && <LocalizedTimePicker value={selectedTime} setValue={setSelectedTime} />}
          <p className="u-text-align-center u-margin-vertical-small">{currentDescription}</p>
          <TimeItems timeItems={timeItems} />
          <Controls timeItems={timeItems} selectedTime={selectedTime} onWakeUp={onWakeUp} onGoToBed={onGoToBed}
            onCurrentBedtime={onCurrentBedtime} onReset={onReset} />
        </div>
      </main>
    </div>
  );
}

export default App;
