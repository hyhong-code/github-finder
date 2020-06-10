import React, { Fragment } from "react";
import spinner from "../img/spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="loading"
      style={{ width: "200px", display: "block", margin: "auto" }}
    />
  </Fragment>
);

export default Spinner;
