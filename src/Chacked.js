import React from "react";
import Switch from '@material-ui/core/Switch';


export const Chacked = ({checked,checkedCurreny,checkedCapital,setChecked,setCheckedCapital,setCheckedCurreny}) => {
  function CheckboxLanguage() {
      
    return (
      <div>
        official language
        <Switch 
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          color="primary"
        />{" "}
      </div>
    );
  }

  function CheckboxCapital() {
    return (
      <div>
         capital
        <Switch 
          checked={checkedCapital}
          onChange={(e) => setCheckedCapital(e.target.checked)}
          color="primary"
        />{" "}
      </div>
    );
  }
  function CheckboxCurrency() {
    return (
      <div>
        currency
        <Switch 
          checked={checkedCurreny}
          onChange={(e) => setCheckedCurreny(e.target.checked)}
          color="primary"
        />{" "}
      </div>
    );
  }
  return (
    <>
      {CheckboxCapital()}
      {CheckboxCurrency()}
      {CheckboxLanguage()}
    </>
  );
};
