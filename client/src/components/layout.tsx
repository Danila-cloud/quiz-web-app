import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useStateContext } from "../hooks/useStateContext";

export default function Layout() {
  const { resetContext } = useStateContext();

  const navigate = useNavigate();

  const logout = () => {
    resetContext();
    navigate("/");
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className="w-[640px] text-center flex items-center mx-auto font-mono">
          <Typography variant="h4" className="flex" sx={{flexGrow: 1}}>
            Danilych's Quiz App
          </Typography>
          <Button onClick={logout}>Exit</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
