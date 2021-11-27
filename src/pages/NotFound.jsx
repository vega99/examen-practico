import { Paper, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <div style={{ backgroundColor: 'black'}}>
      <Paper className="fullScreen">
        <div className="centered fullScreen">
          <Typography variant="h1">404</Typography>        
          <Typography variant="h2">No encontrado</Typography>        
        </div>
      </Paper>
    </div>
  );
};

export default NotFound;
