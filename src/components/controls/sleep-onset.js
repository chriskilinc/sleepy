import { useState } from "react";
import { useTimeContext } from "../../TimeContext";
import { CustomNumberInput } from "../number-input/number-input";
import { TextButton } from "../text-button/text-button";
import "./controls.css";

export const SleepOnset = () => {
  const { sleepOnsetTime, setSleepOnsetTime, sleepOnsetTimeDefault } =
    useTimeContext();

  const [changeSleepOnsetTime, setChangeSleepOnsetTime] = useState(false);

  const onChangeSleepOnsetChange = () => {
    setChangeSleepOnsetTime(!changeSleepOnsetTime);
  };

  const onSleepOnsetTimeChange = (val) => {
    if (val >= 0 && val <= 60) {
      setSleepOnsetTime(val);
    }
  };

  return (
    <div className="sleep-onset" style={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    }}>
      {changeSleepOnsetTime ? (
        <>
          <p>Change time it takes to fall asleep?</p>
          <CustomNumberInput
            aria-label="Sleep onset latency in minutes"
            placeholder="Type your sleep onset latency in minutes"
            label="Sleep onset latency"
            value={sleepOnsetTime}
            min={0}
            max={60}
            onChange={(event, val) => onSleepOnsetTimeChange(val)}
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
  );
};
