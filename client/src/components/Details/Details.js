import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "../../ChartData";

import useStyles from "./styles";
import useTransactions from "../../useTransactions";
const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransactions(title);
  // console.log(chartData);

  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">$50</Typography>
        <ChartData title = {title}/>
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
