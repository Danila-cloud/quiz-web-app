// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  CardMedia,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helpers/timer";
import { useStateContext } from "../hooks/useStateContext";
import { BASE_URL } from "../api";

export default function Quiz() {
  const [qns, setQns] = useState([]); // @ts-ignore

  const [qnIndex, setQnIndex] = useState(0);

  const [timeTaken, setTimeTaken] = useState(0);

  const { context, setContext } = useStateContext(); // @ts-ignore

  let timer;
  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQns(res.data);
        startTimer();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateAnswer = (qnId, optionIdx) => {
    const temp = [context.selectedOptions];
    temp.push({
      qnId,
      selected: optionIdx,
    });
    if (qnIndex < 4) {
      setContext({ selectedOptions: [...temp] });
      setQnIndex(qnIndex + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken });
    }
  };

  return qns.length !== 0 ? (
    <div className="max-w-[640px] mx-auto mt-5 bg-slate-800 p-4">
      <Typography className="absolute flex justify-start" variant="h6">
        {getFormatedTime(timeTaken)}
      </Typography>

      <Typography className="justify-end flex pb-5" variant="h6">
        Question {qnIndex + 1} of 5{" "}
      </Typography>

      <div className="items-center flex justify-center w-[250px] mx-auto my-4 h-[250px]">
        {qns[qnIndex].imageName !== null ? (
          <CardMedia
            component="img"
            image={BASE_URL + "images/" + qns[qnIndex].imageName}
          />
        ) : null}
      </div>

      <Typography variant="h5">{qns[qnIndex].qnInWords}</Typography>

      <List>
        {qns[qnIndex].options.map((item, idx) => (
          <ListItemButton
            key={idx}
            disableRipple
            onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}
          >
            <div className="items-center">
              <b>{String.fromCharCode(65 + idx) + " . "}</b> {item}
            </div>
          </ListItemButton>
        ))}
      </List>

      <div className="mt-3">
        <LinearProgress
          variant="determinate"
          value={((qnIndex + 1) * 100) / 5}
        />
      </div>
    </div>
  ) : null;
}
