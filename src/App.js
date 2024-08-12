import { useState, useEffect } from "react";
import logo from "./assets/sleeping.svg";
import "./App.css";
// import { Controls } from "./components/controls/controls";
import { TimeItems } from "./components/time-items/time-items";
import { LocalizedTimePicker } from "./components/time-picker/time-picker";
import { useTimeContext } from "./TimeContext";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { ErrorPage } from "./error-page";
import { ControlButtons } from "./components/controls/control-buttons";
import { SleepOnset } from "./components/controls/sleep-onset";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat); // try this.

const calculateTimeItems = (time, sleepCycles, sleepOnsetTime, subtract = false, ) => {
  const cycleTime = 90;
  const timeItems = [];
  console.log("sleepCycles calculate:", sleepCycles);

  for (let i = 0; i < sleepCycles; i++) {
    subtract
      ? timeItems.push(
          dayjs(time)
            .subtract(cycleTime * (i + 1) + sleepOnsetTime, "m")
            .toDate()
        )
      : timeItems.push(
          dayjs(time)
            .add(cycleTime * (i + 1) + sleepOnsetTime, "m")
            .toDate()
        );
  }
  return timeItems.reverse();
};

const InitialSection = () => {
  const {
    currentDescription,
    onCurrentBedtime,
    selectedTime,
    setSelectedTime,
    timeItems,
    sleepOnsetTime,
    time,
    setTime,
  } = useTimeContext();

  return (
    <>
      <LocalizedTimePicker value={selectedTime} setValue={setSelectedTime} />
      <p className="u-text-align-center u-margin-vertical-small">
        {currentDescription}
      </p>
      <ControlButtons />
      <SleepOnset />
    </>
  );
};

const GoToBed = () => {
  let { time: timeParam } = useParams();
  const {
    currentDescription,
    onCurrentBedtime,
    selectedTime,
    setSelectedTime,
    // timeItems,
    sleepOnsetTime,
    setTime,
    onGoToBed,
    sleepCycles,
  } = useTimeContext();

  console.log("sleepCycles:", sleepCycles);

  

  console.log("time param:", timeParam);

  if (!timeParam) {
    timeParam = dayjs().format("HH:mm");
    console.log("setting new time:", timeParam);
  }

  const timeDecoded = decodeURIComponent(timeParam);
  console.log("time decoded:", timeDecoded);

  const timeObject = dayjs(timeDecoded, "HH:mm");
  console.log("time dayjs timeObject:", timeObject);

  const timeFormatted = timeObject.format("HH:mm");

  const timeItems = calculateTimeItems(timeObject, sleepCycles, sleepOnsetTime);
  console.log("timeItems:", timeItems);
  

  return (
    <>
      <p className="u-text-align-center u-margin-vertical-small">
        If I go to bed at <span>{timeObject.format("HH:mm")}</span> I should
        wake up around..
      </p>

      <TimeItems/>
    </>
  );
};

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
  }, [isLoaded]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <InitialSection />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/wake-up/:time?",
      element: <p>Wake up time items</p>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/go-to-bed/:time?",
      element: <GoToBed />,
      errorElement: <ErrorPage />,
    },
  ]);

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

          {/* Route here */}
          <RouterProvider router={router} />

          {/* {timeItems && timeItems.length === 0 && (
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
              <p>Included time to fall asleep of {sleepOnsetTime} minutes</p>
            </div>
          )} */}
          {/* Stop route */}
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
