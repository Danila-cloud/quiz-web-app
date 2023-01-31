import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Login() {
  return (
    <div className="w-[400px] absolute top-1/2 left-1/2 -translate-y-1/2 text-center py-5 rounded bg-slate-800 -translate-x-1/2">
      <Typography className="pb-3" variant="h3">Quiz App</Typography>

      <Box
      className=""
        sx={{
          "&	.MuiTextField-root": {
            m: 1,
            width: "90%",
          },
        }}
      >
        <form noValidate>
          <TextField label="Email" name="email" variant="outlined" />

          <TextField label="Name" name="name" variant="outlined" />

          <Button
            className="m-2 w-[90%]"
            type="submit"
            variant="contained"
            size="large"
          >
            Start
          </Button>
        </form>
      </Box>
    </div>
  );
}
