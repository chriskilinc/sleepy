import { createContext, useContext, useState } from "react";
import dayjs from "dayjs";

const TimeContext = createContext({});

export const TimeProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [sleepOnsetTime, setSleepOnsetTime] = useState(15); // TODO: Save sleep onset time to local storage
  const [sleepCycles, setSleepCycles] = useState(6);

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
