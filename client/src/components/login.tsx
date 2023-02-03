import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { useContext } from "react";
import { stateContext, useStateContext } from "../hooks/useStateContext";
import { useNavigate } from "react-router-dom";

const getFreshModel = () => ({
  name: "",
  email: "",
});

export default function Login() {
  const { context, setContext } = useStateContext();

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ participantId: res.data.participantId });
          navigate("/quiz");
        })
        .catch((error) => console.log(error));
    }
  };

  const validate = () => {
    let temp = { email: "", name: "" };
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name !== "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <div className="w-[400px] absolute top-1/2 left-1/2 -translate-y-1/2 text-center py-5 rounded bg-slate-800 -translate-x-1/2">
      <Typography className="pb-3" variant="h3">
        Quiz App
      </Typography>

      <Box
        className=""
        sx={{
          "&	.MuiTextField-root": {
            m: 1,
            width: "90%",
          },
        }}
      >
        <form noValidate autoComplete="on" onSubmit={login}>
          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.email && { error: true, helperText: errors.email })}
          />

          <TextField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.name && { error: true, helperText: errors.name })}
          />

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
