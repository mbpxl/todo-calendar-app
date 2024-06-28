import React, { useCallback } from "react";
import { useState } from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

type TodoFormTypes = {
  addTodo: (todo: string) => void;
};

export const TodoForm = React.memo((props: TodoFormTypes) => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target?.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.addTodo(value);
      setValue("");
    },
    [props, value]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
        <Input
          color="primary"
          placeholder="New task"
          variant="outlined"
          value={value}
          onChange={handleChangeValue}
          sx={{ width: 300 }}
        />
        <Button variant="contained" type="submit">
          +
        </Button>
      </Box>
    </form>
  );
});
