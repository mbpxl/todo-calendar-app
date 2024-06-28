import React from "react";
import Box from "@mui/material/Box";
import { Calendar } from "./Components/Calendar/Calendar";

function App() {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "inlineFlex",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: "15vh",
        padding: "30px 0",
      }}
    >
      <Calendar />
    </Box>
  );
}

export default App;
