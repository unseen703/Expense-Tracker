import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { ChartData } from "../../ChartData";

import useStyles from "./styles";
import useTransactions from "../../useTransactions";
const Details = ({ title }) => {
  const classes = useStyles();
  const { total } = useTransactions(title);

  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">₹{total}</Typography>
        <ChartData title={title} />
        {/* {(chartData !== undefined)&&(<Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />)} */}
      </CardContent>
    </Card>
  );
};
export default Details;
