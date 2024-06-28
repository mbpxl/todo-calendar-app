import { useCallback, useState } from "react";
import { TodoType } from "../TodoWrapper/TodoWrapper";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button } from "@mui/material";
import Input from "@mui/joy/Input";

type TodoFormTypes = {
  tasks: TodoType;
  editTodo: (value: string, id: string) => void;
};

export const EditTodoForm = React.memo((props: TodoFormTypes) => {
  const [value, setValue] = useState<string>(props.tasks.task);

  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target?.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.editTodo(value, props.tasks.id);

      setValue("");
    },
    [props, value]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex" }}>
        <Input
          color="success"
          placeholder="New task"
          variant="outlined"
          value={value}
          onChange={handleChangeValue}
          sx={{ width: 170 }}
        />
        <Button
          type="submit"
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{ marginLeft: "10px" }}
        >
          Ok
        </Button>
      </Box>
    </form>
  );
});
