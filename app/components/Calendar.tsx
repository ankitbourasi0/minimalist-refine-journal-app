"use client"
import { useState } from "react";

import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";

 function Calendar() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker 
    className="flex w-full items-center justify-center px-4 py-4 border-b border-gray-100 "
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      // footer={
      //   selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      // }
    />
  );
}

export default Calendar;