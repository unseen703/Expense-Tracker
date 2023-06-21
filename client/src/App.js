import Details from "./components/Details/Details";
// import Header from "./components/Form/Header";
import {PushToTalkButton , PushToTalkButtonContainer,ErrorPanel } from "@speechly/react-ui";
import Form from "./components/Form/Form";

import { Grid } from "@material-ui/core";
import "./App.css";
 import useStyles from "./styles.js";
const App = ()=> {
  const classes = useStyles();
  return (
    <div>
      <Grid
      className= {classes.grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4}>
          <Details title={"Income"} />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Form />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title={"Expense"} />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton/>
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
