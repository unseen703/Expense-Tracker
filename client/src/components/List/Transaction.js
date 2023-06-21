import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Delete from "@material-ui/icons/Delete";
import MoneyOff from "@material-ui/icons/MoneyOff";
import AttachMoney from "@material-ui/icons/AttachMoney";
import * as moment from "moment";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import useStyles from "./styles";
const Transaction = ({ transaction }) => {
  const classes = useStyles();
  const { deleteTransaction } = useContext(GlobalContext);
  console.log(transaction.type);
  // const sign = transaction.type === "Expense" ? "-" : "+";
  const handleOnClick = (e) => {
    e.preventDefault();
    // console.log(e);
    confirmAlert({
      title: "Confirm to Delete the Transaction",
      message: "Are you sure you want to Delete this Transaction .",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: () => {
            deleteTransaction(transaction._id);
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <>
      <ListItemAvatar>
        {  (transaction.type === "Income")?<Avatar
          style={{ background:"#4caf50"}}

        >
          <AttachMoney />
        </Avatar> :
        <Avatar
          style={{ background:"#f44336"}}

        >
          <MoneyOff />
        </Avatar>
         }
      </ListItemAvatar>
      <ListItemText
        primary={transaction.category}
        secondary={`₹${transaction.amount}-${moment(transaction.date).format('D-MM-YYYY')}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleOnClick}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

export default Transaction;
