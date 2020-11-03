
import React, { useState, useEffect, useRef } from "react";
import './App.css';

function App()  {
  const [country, setCountry] = useState([
    {
      name: "",
      capital: "",
      currency: "",
      languages: [{name: ""}]
    },
  ]);
  const [continent, setContinent] = useState([
    {
      name: "",
      code: "",
    },
  ]);
  const renderCount = useRef(0);

  console.log(country);

   useEffect (() => {
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

  

  
  const changeHandler =  (e) => {
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
      .then((res) =>  res.json())
      .then(( data) =>  {
        setCountry (data.data.continent.countries);
        console.log(data)
     
      })
  };


  return (
    <div className="App">
      <header className="App-header">
      <label >Vyber kontinent:</label>
     
<select name="test"   onChange={changeHandler} > 
  {continent.map((item) => (
     <option  key={item.code} value={item.code}   >
      {item.name}
      
    </option>
  ))}
  Select a Continent
</select>
<ul>
{country.map((item) => (
<li key={item.name} >
stát: <strong>{item.name} </strong> <br></br>
hlavní město: <strong> {item.capital}</strong> <br></br>
měna: <strong> {item.currency}</strong>
{item.languages.map((items) => (
  <li key={items.name} > <p>Jazyk: {items.name}</p> </li>
  ))}
  ------------------------------------------------------------------------
</li>))}

</ul>
      </header>
    </div>
  );
 
}
export default App;
