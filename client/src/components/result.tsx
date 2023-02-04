// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from "../api";
import { useStateContext } from "../hooks/useStateContext";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  List,
  ListItemButton,
  Typography,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import { getFormatedTime } from "../helpers/timer";
import { useNavigate } from "react-router";

export default function Result() {
  const { context, setContext } = useStateContext();

  const [score, setScore] = useState(0);

  const [qnAnswers, setQnAnswers] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate("/quiz")
  }

  return (
    <div className="w-[640px] mx-auto mt-14 flex py-5 bg-slate-800">
      <div className="w-[40%] flex-1 items-center justify-center text-center">
        <Typography variant="h4">Congratulations</Typography>
        <Typography className="pb-2" variant="h6">Your Score:</Typography>
        <Typography variant="span">{score}</Typography>/5
        <Typography className="pt-2" variant="h6">
          It took {getFormatedTime(context.timeTaken) + " minutes"}
        </Typography>
        <div className="flex justify-center mt-3 flex-row gap-4">
          <Button className="mx-3" variant="contained" size="small">
            Finish
          </Button>
          <Button className="mx-3" variant="contained" onClick={restart} size="small">
            Try again
          </Button>
        </div>
      </div>

      <div className="w-[40%] flex-1 flex justify-center">
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image="./assets/images/result.png"
        />
      </div>
    </div>
  );
}
