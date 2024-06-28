import { Box, Button, Modal, Typography } from "@mui/material";
import { TodoWrapper } from "../TodoWrapper/TodoWrapper";
import React, { useCallback, useEffect, useState } from "react";

export const TasksModal = React.memo((props: any) => {
  const [tasks, setTasks] = useState<
    Array<{
      id: string;
      task: string;
      completed: boolean;
      isEditing: boolean;
    }>
  >(props.notes);

  useEffect(() => {
    setTasks(props.notes);
  }, [props.notes]);

  const handleSaveTasks = useCallback(
    (
      newTasks: Array<{
        id: string;
        task: string;
        completed: boolean;
        isEditing: boolean;
      }>
    ) => {
      setTasks(newTasks);
      props.onSave(props.date, newTasks);
    },
    [props]
  );

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
