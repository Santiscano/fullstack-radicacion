import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { TextField } from "@mui/material";

export default function CalendarInput({
  documentationUpdate,
  onChange,
  name,
  label,
  disableFuture,
  disablePast,
  format,
}: any) {
  // const [selectedDate, setSelectedDate] = React.useState<any>();

  const handleDateChange = (date: any) => {
    console.log("date: ", date);
    // setSelectedDate(date);
    onChange({ target: { name: name, value: date } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={documentationUpdate}
          onChange={handleDateChange}
          // renderInput={(params: any) => <TextField {...params} />}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
