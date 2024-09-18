import { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

const TimeContext = createContext({});

const sleepOnsetTimeStorageKey = "sleepOnsetTime";
const getSleepOnsetTime = () => Number(localStorage.getItem(sleepOnsetTimeStorageKey)) || 15;

export const TimeProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [sleepOnsetTime, setSleepOnsetTime] = useState(getSleepOnsetTime()); // TODO: Save sleep onset time to local storage
  const [sleepCycles, setSleepCycles] = useState(6);

  useEffect(() => {
    localStorage.setItem(sleepOnsetTimeStorageKey, sleepOnsetTime);
  }, [sleepOnsetTime]);

  return (
    <TimeContext.Provider
      value={{
        sleepOnsetTime,
        setSleepOnsetTime,
        selectedTime,
        setSelectedTime,
        sleepCycles
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => useContext(TimeContext);
