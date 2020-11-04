import React, { useState, useEffect, useRef } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

import "./App.css";
import "fontsource-roboto";
const useStyles = makeStyles({
  root: {
    border: 0,
    color: "white",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

function App() {
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

  console.log(country);

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
 const[checked,setChecked]=useState(false)
 const[checkedCurreny,setCheckedCurreny]=useState(false)

  function CheckboxLanguage(){
   
    return(
      <div>
        <Checkbox 
        Checked={checked}
        onChange={(e)=>setChecked(e.target.checked)}
        /> official language
      </div>
    )
  }
  function CheckboxCurrency(){
   
    return(
      <div>
        <Checkbox 
        Checked={checked}
        onChange={(e)=>setCheckedCurreny(e.target.checked)}
        /> currency
      </div>
    )
  }



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

  const stateView = () => {
    return (
      <Container class="cont">
        <div>
          <Typography variant="subtitle1">
            <Grid container spacing={2} justify="center" direction="row">
              {country.map((item) => (
                <Grid item>
                  <Paper
                    elevation={3}
                    style={{ height: 400, width: 300 }}
                    style={
                      item.name === "" ? { display: "none" } : { display: "" }
                    }
                    key={item.name}
                    component="li"
                  >
                    <strong className="state">{item.name} </strong> 
                    <br></br>
                    capital: <strong> {item.capital}</strong> <br></br>
                    <div style={
                        checkedCurreny === false ? { display: "none" } : { display: "" }
                      }>currency: <strong> {item.currency}</strong></div>
                    <p style={
                        checked === false ? { display: "none" } : { display: "" }}
                      >language:</p>
                    {item.languages.map((items) => (
                      <p style={
                        checked === false ? { display: "none" } : { display: "" }
                      }className="lang" key={items.name}>
                        <em> {items.name}</em>
                      </p>
                    ))}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Typography>
        </div>
      </Container>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="subtitle1" componen="div">
         
            <InputLabel color="primary" id="label">
            Select continent
            </InputLabel>
                <Select labelId="label" component="select" onChange={changeHandler}>
              {continent.map((item) => (
                <MenuItem color="white" key={item.code} value={item.code}>
                  {item.name}  
                </MenuItem>
              ))}
              
            </Select>
            <Grid container spacing={2} justify="center" direction="row">
             {CheckboxLanguage()}
             {CheckboxCurrency()}
             </Grid>
          </Typography>
          {stateView()}
        </header>
      </div>
    </ThemeProvider>
  );
}
export default App;
