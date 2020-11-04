import React, { useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { StateView } from "./StateView";
import { Chacked } from "./Chacked";

import FormControl from "@material-ui/core/FormControl";

import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

import "./App.css";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

function App() {
  const classes = useStyles();
  const [country, setCountry] = useState([
    {
      name: "",
      capital: "",
      currency: "",
      languages: [{ name: "" }],
    },
  ]);
  const [continent, setContinent] = useState([
    {
      name: "",
      code: "",
    },
  ]);
  const [checked, setChecked] = useState(false);
  const [checkedCurreny, setCheckedCurreny] = useState(false);
  const [checkedCapital, setCheckedCapital] = useState(false);

  useEffect(() => {
    fetch(`https://countries.trevorblades.com/`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        query: `query{
      continents{
        name
        code
      }
    }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setContinent(data.data.continents);
      });
  }, []);

  function changeHandler(e) {
    fetch(`https://countries.trevorblades.com/`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        query: `query{
          continent(code:"${e.target.value}"){
            countries{
            name
            capital
            currency
            languages{
              name
            }
            }
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCountry(data.data.continent.countries);
        console.log(data);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="subtitle1" componen="div">
            <FormControl className={classes.formControl}>
              <InputLabel
                color="primary"
                id="label"
              >  Select continent </InputLabel>
              <Select
                value={continent.name}
                labelId="label"
                component="select"
                onChange={changeHandler}
              >
                {continent.map((item) => (
                  <MenuItem color="white" key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                ))}
                
              </Select>
              <Grid container spacing={2} justify="center" direction="row">
                <Chacked
                  checked={checked}
                  setChecked={setChecked}
                  setCheckedCapital={setCheckedCapital}
                  setCheckedCurreny={setCheckedCurreny}
                  checkedCurreny={checkedCurreny}
                  checkedCapital={checkedCapital}
                />
              </Grid>
            </FormControl>
          </Typography>
        
          <StateView
            country={country}
            checkedCapital={checkedCapital}
            checkedCurreny={checkedCurreny}
            checked={checked}
          />
        </header>
      </div>
    </ThemeProvider>
  );
}
export default App;
