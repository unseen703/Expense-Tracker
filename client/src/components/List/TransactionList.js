import React, { useContext, useEffect } from "react";
import { List, ListItem, Slide } from "@material-ui/core";

import { GlobalContext } from "../../context/GlobalState";

import useStyles from "./styles";
import Transaction from "./Transaction";

const TransactionList = () => {
  const classes = useStyles();
  const { transactions, getTransaction } = useContext(GlobalContext);

  useEffect(() => {
    getTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide
          direction="down"
          in
          mountOnEnter
          unmountOnExit
          key={transaction._id}
        >
          <ListItem>
            <Transaction transaction={transaction} />
          </ListItem>
        </Slide>
      ))}
    </List>
  );
};

export default TransactionList;
