import React, { useCallback } from "react";
import { FilterButtonsType } from "../TodoWrapper/TodoWrapper";
import "./FilterButtons.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type FilterButtonsComponentType = {
  changeFilter: (value: FilterButtonsType) => void;
};

export const FilterButtons = React.memo((props: FilterButtonsComponentType) => {
  const handleClick = useCallback(
    (filter: FilterButtonsType) => {
      props.changeFilter(filter);
    },
    [props]
  );

  return (
    <Box
      sx={{
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        gap: "12px",
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleClick("All")}
      >
        All
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={() => handleClick("Active")}
      >
        Active
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleClick("Completed")}
      >
        Completed
      </Button>
    </Box>
  );
});
