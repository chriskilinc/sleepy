import logo from "./assets/sleeping.svg";
import "./App.css";
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
import { GoBackButton } from "./components/controls/go-back-button";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const InitialSection = () => {
  const {
    selectedTime,
    setSelectedTime,
  } = useTimeContext();

  return (
    <>
      <LocalizedTimePicker value={selectedTime} setValue={setSelectedTime} />
      <p className="u-text-align-center u-margin-vertical-small">
        This is the time I want to:
      </p>
      <ControlButtons />
      <SleepOnset />
    </>
  );
};

const CalculationSection = ({ subtract }) => {
  // subtract: true = wake up, false = go to bed
  let { time: timeParam } = useParams();
  const {
    sleepOnsetTime,
  } = useTimeContext();

  let noTimeParam = false;  // example: "If I go to bed now"
  if (!timeParam) {
    noTimeParam = true;
    timeParam = dayjs().format("HH:mm");
  }

  let timeDecoded = decodeURIComponent(timeParam);

  let timeObject;
  if (!timeParam || !timeDecoded) {
    // TODO: handle this better
    timeObject = dayjs().format("HH:mm");
  } else {
    timeObject = dayjs(timeDecoded, "HH:mm");
  }

  return (
    <>
      {subtract ?
        <p className="u-text-align-center u-margin-vertical-small">
          If I want to wake up at <span>{timeObject.format("HH:mm")}</span> I should go to bed around..
        </p>
        :
        <p className="u-text-align-center u-margin-vertical-small">
          If I go to bed {noTimeParam && (<span>now</span>)} at <span>{timeObject.format("HH:mm")}</span> I should
          wake up around..</p>
      }

      <TimeItems time={timeObject} subtract={subtract} />
      <div className='controls'>
        <GoBackButton />
      </div>
      <div className="u-text-align-center u-margin-vertical-smaller">
        <p>Included time to fall asleep of {sleepOnsetTime} minutes</p>
      </div>
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <InitialSection />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/wake/:time?",
      element: <CalculationSection subtract={true} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sleep/:time?",
      element: <CalculationSection subtract={false} />,
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
            title='Logo of a sleepy moon'
          />
          <h1 className="title">feeling sleepy?</h1>

          <RouterProvider router={router} />
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
