import { List, ListItemButton, Typography } from "@mui/material";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helpers/timer";
import { stateContext, useStateContext } from "../hooks/useStateContext";

type Item = {
  qnId: number;
  qnInWords: string;
  imageName: string;
  options: string[];
};

export default function Quiz() {
  const [qns, setQns] = React.useState<Item[]>([]); // @ts-ignore

  const [qnIndex, setQnIndex] = useState(0);

  const [timeTaken, setTimeTaken] = useState(0);

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

  return qns.length !== 0 ? (
    <div className="max-w-[640px] mx-auto mt-5 bg-slate-800 p-4">
      <Typography className="absolute flex justify-start" variant="h6">{getFormatedTime(timeTaken)}</Typography>
      <Typography className="justify-end flex pb-5" variant="h5">
        Question {qnIndex + 1} of 5{" "}
      </Typography>
      <Typography variant="h6">{qns[qnIndex].qnInWords}</Typography>
      <List>
        {qns[qnIndex].options.map((item, idx) => (
          <ListItemButton key={idx} disableRipple>
            <div className="items-center">
              <b>{String.fromCharCode(65 + idx) + " . "}</b> {item}
            </div>
          </ListItemButton>
        ))}
      </List>
    </div>
  ) : null;
}
