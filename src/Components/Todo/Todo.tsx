import { TodoType } from "../TodoWrapper/TodoWrapper";
import React, { useCallback } from "react";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TodoTypes = {
  task: TodoType;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  editTodo: (id: string) => void;
};

export const Todo = React.memo((props: TodoTypes) => {
  const handleToggleComplete = useCallback(() => {
    props.toggleComplete(props.task.id);
  }, [props]);

  const hangleDeleteTask = useCallback(() => {
    props.deleteTask(props.task.id);
  }, [props]);

  const handleEditTask = useCallback(() => {
    props.editTodo(props.task.id);
  }, [props]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={hangleDeleteTask}
          size="medium"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Typography
          onDoubleClick={handleEditTask}
          variant="subtitle1"
          gutterBottom
          sx={{ marginLeft: "10px" }}
        >
          {props.task.task}
        </Typography>
      </Box>
      <Checkbox
        checked={props.task.completed}
        onChange={handleToggleComplete}
        size="medium"
      />
    </Box>
  );
});
