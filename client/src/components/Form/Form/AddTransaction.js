import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import moment from "moment";
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
import CustomizedSnackBar from "../../SnackBar/SnackBar";

const initialState = {
  type: "",
  category: "",
  amount: "",
  date: new Date(),
};

const AddTransaction = () => {
  const classes = useStyles();
  const { segment } = useSpeechContext();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { addTransaction } = useContext(GlobalContext);
  // function from global provider
  // const { segment , listening } = useSpeechContext();
  // const main = React.useRef(null);

  // const executeScroll = () => main.current.scrollIntoView();

  // useEffect(() => {
  //   // console.log(SpeechState);
  //   if(listening)                         
  //   {  executeScroll();}
    
  // }, [segment]);

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
  const createTransaction = () => {
    if (
      Number.isNaN(formData.amount) ||
      formData.type === "" ||
      formData.category === "" ||
      formData.amount === ""
    ) {
      handleNullSubmit();
      setFormData(initialState);
      return;
    } else {
      if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
        setFormData({ ...formData, type: "Income" });
      } else if (
        expenseCategories.map((iC) => iC.type).includes(formData.category)
      ) {
        setFormData({ ...formData, type: "Expense" });
      }
      const newTransaction = {
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        date: formData.date,
      };
      setOpen(true);
      addTransaction(newTransaction);
    }

    //function  that sets value in global provider
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
        // selectedCatagories = incomeCategories;
      } else if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
        // selectedCatagories = expenseCategories;
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;
        console.log(e.value);
        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: moment(e.target.value).format("YYYY-MM-DD") });
            break;
          default:
            break;
        }
      });
      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
        setFormData(initialState);
      }
    }
    // eslint-disable-next-line
  }, [segment]);

  const onSubmit = (e) => {
    e.preventDefault();
    createTransaction();
  };
  const selectedCatagories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
    <CustomizedSnackBar open = {open} setOpen= {setOpen}/>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" className={classes.h5Heading}>
          Add New Transaction
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          {segment && <>{segment.words.map((w) => w.value).join(" ")}</>}
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
          onChange={(e) => setFormData({ ...formData, date: moment(e.target.value).format("YYYY-MM-DD") })}
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
    </Grid>
  );
};

export default AddTransaction;
