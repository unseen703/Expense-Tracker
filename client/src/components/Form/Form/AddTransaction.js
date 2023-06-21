import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useSpeechContext } from "@speechly/react-client";
// AddTransaction is the component that repesents add new transation part of site
// and it will call  the functoion on submit when we submit the form
// it will set the object new transaction

import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import useStyles from "./styles";

const initialState = {
  type: "",
  category: "",
  amount: "",
  date: new Date(),
};

const AddTransaction = () => {
  const classes = useStyles();
  const {segment } = useSpeechContext();
  const [formData, setFormData] = useState(initialState);
  const selectedCatagories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  // function from global provider

  const { addTransaction } = useContext(GlobalContext);

  const handleNullSubmit = () => {
    confirmAlert({
      title: "Please fill out all required fields",
      buttons: [
        {
          label: "Ok",
        },
      ],
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      formData.type === "" ||
      formData.category === "" ||
      formData.amount === ""
    ) {
      handleNullSubmit();
    } else {
      const newTransaction = {
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        date: formData.date,
      };
      addTransaction(newTransaction);
    }

    //function  that sets value in global provider
    setFormData(initialState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" className={classes.h5Heading}>
          Add New Transaction
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          {segment&&(
            <>
              {segment.words.map((w)=> w.value).join(" ")}
            </>
          )}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            // onClick={() => handleTypeChange}
            // native
          >
            {selectedCatagories.map((c) => {
              return (
                <MenuItem key={c.type} value={c.type}>
                  {c.type}
                </MenuItem>
              );
            })}
            <MenuItem>
              {" "}
              <Button variant="outlined" color="primary">
                + New Catagory
              </Button>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="amount"
          className={classes.input}
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          fullWidth
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={(e) => onSubmit(e)}
      >
        Create
      </Button>

      {/* </div> */}
      {/* <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button> */}
      {/* </FormControl> */}
    </Grid>
  );
};

export default AddTransaction;
