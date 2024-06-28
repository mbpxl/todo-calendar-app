import { Box, Button, Modal, Typography } from "@mui/material";
import { TodoWrapper } from "../TodoWrapper/TodoWrapper";
import React, { useEffect, useState } from "react";

export const TasksModal = React.memo((props: any) => {
  //const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>(props.notes);

  useEffect(() => {
    setTasks(props.notes);
  }, [props.notes]);

  const handleSaveTasks = (newTasks: any) => {
    setTasks(newTasks);
    props.onSave(props.date, newTasks);
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Задачи на {props.date?.format("DD.MM.YYYY")}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Добавьте задачи на выбранный день.
        </Typography>
        <TodoWrapper tasks={tasks} onSave={handleSaveTasks} />
        <Button onClick={props.handleClose} sx={{ mt: 2 }}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
});

//todo: open, handleClose, date
