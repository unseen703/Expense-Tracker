import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  Grid,
  Card,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";

import TransactionList from "../List/TransactionList.js";
import AddTransaction from "./Form/AddTransaction.js";

import useStyles from "./styles.js";
import InfoCard from "../InfoCard";
import { useSpeechContext } from "@speechly/react-client";
import { useEffect } from "react";
const Form = () => {
  const { balance } = useContext(GlobalContext);
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);

  const { segment, listening } = useSpeechContext();

  // const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    // console.log(SpeechState);
    if (listening && toggle === false) {
      setToggle(!toggle);
    }
    // eslint-disable-next-line
  }, [segment]);

  return (
    <Card className={classes.root}>
      <CardHeader title={"Expense Tracker"} subheader="Powered by Speechly" />
      <CardContent>
        <Typography variant="h5" align="center">
          Your Balance ₹{balance}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
      </CardContent>

      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={() => setToggle(!toggle)}
              className={toggle ? classes.greenBtn : classes.blueBtn}
              variant="contained"
              startIcon={toggle ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            >
              {!toggle && "Add New Transaction"}
            </Button>
            {toggle && (
              <>
                <AddTransaction />
                <Divider className={classes.divider} />{" "}
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" justify="center">
              History
            </Typography>
            <TransactionList />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Form;
