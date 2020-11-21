import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Fade from '@material-ui/core/Fade';

export const StateView = ({
  country,
  checkedCapital,
  checkedCurreny,
  checked,
}) => {
  return (
    <div>
      <Container className="cont">
     
          <Typography variant="subtitle1">
         
            <Grid container spacing={2} justify="center" direction="row">
              {country.map((item) => (
                    
                <Grid item key={item.name}>
                  
                  <Paper
                    elevation={3}
                    style={
                      item.name === "" ? { display: "none" } : { display: "" }
                    }
                    component="li"
                    
                  >
                    <strong className="state">{item.name} </strong>
                    <br></br>
                    <div
                      style={
                        checkedCapital === false
                          ? { display: "none" }
                          : { display: "" }
                      }
                    >
                      capital: <strong> {item.capital}</strong> <br></br>
                    </div>
                    <div
                      style={
                        checkedCurreny === false
                          ? { display: "none" }
                          : { display: "" }
                      }
                    >
                      currency: <strong > {item.currency}</strong>
                    </div>
                    <p
                      style={
                        checked === false
                          ? { display: "none" }
                          : { display: "" }
                      }
                    >
                      language:
                    </p>  
                    {item.languages.map((items) => (
                    <p key={items.name}
                        style={
                          checked === false
                            ? { display: "none" }
                            : { display: "" }
                        } 
                        className="lang"
                      
                      >  
                       <em > {items.name}</em>
                 </p>
                    ))}
                  </Paper>
                    
                </Grid>
                
              ))}
            </Grid>
         
          </Typography>
        
      </Container>
    </div>
  );
};
