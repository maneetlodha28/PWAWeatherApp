import React, { Fragment } from "react";

const ShowError = () => {
  return (
    <Fragment>
      <h2 className={"svgText"}>Something went wrong, please try again!</h2>
      <img src="\images\error.svg" height="50%" alt="Error" />
    </Fragment>
  );
};

export default ShowError;
