import React, { useState, useEffect, useRef } from "react";
import Details from "./components/Details/Details";
import {  useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import Form from "./components/Form/Form";

import { Grid } from "@material-ui/core";
import "./App.css";
import useStyles from "./styles.js";
const App = () => {
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  const { segment , listening } = useSpeechContext();
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    // console.log(SpeechState);
    if(listening)                         
      executeScroll();
    // eslint-disable-next-line
  }, [segment]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4} className="mobile">
          <Details title={"Income"} />
        </Grid>

        <Grid
          item
          ref={main}
          xs={12}
          sm={width < 1150 && width > 600 ? 12 : 3}
          className={classes.main}
        >
          <Form />
        </Grid>
        <Grid item xs={12} sm={12} className="desktopi">
          <Details title={"Income"} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={width < 1150 && width > 600 ? 12 : 4}
          className={classes.last}
        >
          <Details title={"Expense"} />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
