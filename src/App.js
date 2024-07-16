import { useState, useEffect } from "react";
import logo from "./assets/sleeping.svg";
import "./App.css";
import { Controls } from "./components/controls/controls";
import { TimeItems } from "./components/time-items/time-items";
import { LocalizedTimePicker } from "./components/time-picker/time-picker";
import { useTimeContext } from "./TimeContext";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    currentDescription,
    onCurrentBedtime,
    selectedTime,
    setSelectedTime,
    timeItems,
    sleepOnsetTime,
  } = useTimeContext();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      //  Shortcuts are defined in manifest.json for pwa functionallity
      //  Currently there is only one shortcut "/now"
      window.location.pathname.includes("now") && onCurrentBedtime();
    }
  }, [isLoaded, onCurrentBedtime]);

  return (
    <div className="app">
      <main className="main">
        <div className="container">
          <img
            src={logo}
            className="logo"
            alt="Logo of a sleepy moon"
            width="128px"
            height="128px"
          />
          <h1 className="title">feeling sleepy?</h1>
          {timeItems && timeItems.length === 0 && (
            <LocalizedTimePicker
              value={selectedTime}
              setValue={setSelectedTime}
            />
          )}
          <p className="u-text-align-center u-margin-vertical-small">
            {currentDescription}
          </p>
          <TimeItems />
          <Controls />
          {timeItems && timeItems.length !== 0 && (
            <div className="u-text-align-center u-margin-vertical-smaller">
              <p>We have added a sleep onset latency of</p>
              <p>{sleepOnsetTime} minutes</p>
            </div>
          )}
        </div>
      </main>
      <footer className="contact">
        <a
          href="https://www.chriskilinc.com"
          target="_blank"
          rel="noreferrer noopener dofollow"
        >
          chriskilinc.com
        </a>
      </footer>
    </div>
  );
}

export default App;
