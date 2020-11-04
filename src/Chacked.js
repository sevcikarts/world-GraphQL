import React, { useState, useEffect, useRef } from "react";
import Checkbox from "@material-ui/core/Checkbox";

export const Chacked = ({checked,setChecked,setCheckedCapital,setCheckedCurreny}) => {
  function CheckboxLanguage() {
    return (
      <div>
        <Checkbox
          Checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          color="primary"
        />{" "}
        official language
      </div>
    );
  }

  function CheckboxCapital() {
    return (
      <div>
        <Checkbox
          Checked={checked}
          onChange={(e) => setCheckedCapital(e.target.checked)}
          color="primary"
        />{" "}
        capital
      </div>
    );
  }
  function CheckboxCurrency() {
    return (
      <div>
        <Checkbox
          Checked={checked}
          onChange={(e) => setCheckedCurreny(e.target.checked)}
          color="primary"
        />{" "}
        currency
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
