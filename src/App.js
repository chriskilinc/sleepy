import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import logo from './assets/sleeping.svg';
import './App.css';
import { Controls } from './components/controls/controls';
import { TimeItems } from './components/time-items/time-items';
import { LocalizedTimePicker } from './components/time-picker/time-picker';
import Banner from './components/adsterra-banner-1/banner';

const DESC_DEFAULT = "This is the time I want to: ";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeItems, setTimeItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [fallASleepTime, setfallASleepTime] = useState(15);   //  IDEA: should be customizable 
  const [sleepCycles, setSleepCycles] = useState(6);
  const [currentDescription, setCurrentDescription] = useState(DESC_DEFAULT);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      handleShortcuts();
    }
  }, [isLoaded]);

  const handleShortcuts = () => {
    //  Shortcuts are defined in manifest.json for pwa functionallity
    //  Currently there is only one shortcut "/now"
    window.location.pathname.includes("now") && onCurrentBedtime();
  }

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
          <Banner />
          <img src={logo} className="logo" alt="Logo of a sleepy moon" width="128px" height="128px" />
          <h1 className="title">feeling sleepy?</h1>
          {(timeItems && timeItems.length === 0) && <LocalizedTimePicker value={selectedTime} setValue={setSelectedTime} />}
          <p className="u-text-align-center u-margin-vertical-small">{currentDescription}</p>
          <TimeItems timeItems={timeItems} />
          <Controls timeItems={timeItems} selectedTime={selectedTime} onWakeUp={onWakeUp} onGoToBed={onGoToBed}
            onCurrentBedtime={onCurrentBedtime} onReset={onReset} />
          {(timeItems && timeItems.length != 0) && <p className="u-text-align-center u-margin-vertical-smaller">We have added the average time to fall asleep, which is 15 minutes</p>}
        </div>
      </main>
      <footer className="contact">
        <a href="https://www.chriskilinc.com" target="_blank" rel="noreferrer noopener dofollow">chriskilinc.com</a>
      </footer>
    </div>
  );
}

export default App;
