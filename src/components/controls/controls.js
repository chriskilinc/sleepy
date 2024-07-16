import "./controls.css";
import { useTimeContext } from "../../TimeContext";
import { CustomNumberInput } from "../number-input/number-input";
import { useState } from "react";
import { TextButton } from "../text-button/text-button";

export const Controls = () => {
  const {
    timeItems,
    onWakeUp,
    onGoToBed,
    onCurrentBedtime,
    onReset,
    sleepOnsetTime,
    setSleepOnsetTime,
    sleepOnsetTimeDefault,
  } = useTimeContext();

  const [changeSleepOnsetTime, setChangeSleepOnsetTime] = useState(false);

  const onChangeSleepOnsetChange = () => {
    setChangeSleepOnsetTime(!changeSleepOnsetTime);
  };

  return (
    <section className="controls">
      <div
        className="control segmented"
        visible={(timeItems.length === 0).toString()}
      >
        <button className="btn" onClick={onGoToBed}>
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z"
              stroke="currentColor"
              strokeLinejoin="round"
            ></path>
          </svg>
          Go to bed
        </button>
        <button className="btn" onClick={onWakeUp}>
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z"
              stroke="currentColor"
              strokeLinecap="square"
            ></path>
          </svg>
          Wake up
        </button>
      </div>

      <div className="control" visible={(timeItems.length === 0).toString()}>
        <button className="btn" onClick={onCurrentBedtime}>
          If i go to bed now
        </button>
      </div>

      {timeItems && timeItems.length === 0 && (
        <div className="sleep-onset">
          {changeSleepOnsetTime ? (
            <>
              <p>Change time it takes  to fall asleep?</p>
              <CustomNumberInput
                aria-label="Sleep onset latency in minutes"
                placeholder="Type your sleep onset latency in minutes"
                label="Sleep onset latency"
                value={sleepOnsetTime}
                onChange={(event, val) => setSleepOnsetTime(val)}
              />
            </>
          ) : (
            <div>
              <p>We will add the average time to fall asleep</p>
              <p>
                <span>which is </span>
                <TextButton
                  value={`${sleepOnsetTimeDefault} minutes`}
                  onClick={onChangeSleepOnsetChange}
                />
              </p>
            </div>
          )}
        </div>
      )}

      <div className="control" visible={(timeItems.length > 0).toString()}>
        <button className="btn" onClick={onReset}>
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M6.5 2.499l-.354-.354-.353.354.353.353L6.5 2.5zm1-.5H7v1h.5v-1zM2 8.495v-.5H1v.5h1zM8.145.146l-1.999 2 .708.706L8.853.854 8.145.146zM6.146 2.852l2 1.999.707-.707-2-1.999-.707.707zM7.5 3C10.537 3 13 5.461 13 8.496h1A6.499 6.499 0 007.5 2v1zM13 8.495a5.499 5.499 0 01-5.5 5.496v1c3.589 0 6.5-2.909 6.5-6.496h-1zM7.5 13.99A5.499 5.499 0 012 8.495H1a6.499 6.499 0 006.5 6.496v-1z"
              fill="currentColor"
            ></path>
          </svg>
          go back
        </button>
      </div>
    </section>
  );
};
