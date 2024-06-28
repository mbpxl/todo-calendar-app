import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useCallback, useEffect, useState } from "react";
import { TasksModal } from "../TaskModal/TaskModal";
import { Box, Typography } from "@mui/material";

export const Calendar = React.memo(() => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleDateChange = useCallback((nextDate: Dayjs | null) => {
    setValue(nextDate);
    setModalOpen(true);
  }, []);

  const handleSaveNotes = useCallback(
    (date: Dayjs | null, newNotes: string[]) => {
      if (date) {
        const dateKey = date.format("DD.MM.YYYY");
        const updatedNotes = { ...notes, [dateKey]: newNotes };
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
      }
    },
    [notes]
  );

  return (
    <Box
      sx={{
        background: "#66A3D2",
        padding: "100px 50px",
        borderRadius: "10px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h5" gutterBottom>
          Choose date for plan your day
        </Typography>
        <DemoItem>
          <DateCalendar value={value} onChange={handleDateChange} />
        </DemoItem>
      </LocalizationProvider>
      <TasksModal
        open={isModalOpen}
        handleClose={handleModalClose}
        date={value}
        notes={notes[value?.format("DD.MM.YYYY") || ""] || []}
        onSave={handleSaveNotes}
      />
    </Box>
  );
});
