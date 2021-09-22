import React, { Fragment } from "react";

const NoCityFound = () => {
  return (
    <Fragment>
      <h2 className={"svgText"}>
        No city found, check spelling and try again!
      </h2>
      <img
        className={"svgImage"}
        src="\images\noResult.svg"
        alt="No city found"
      />
    </Fragment>
  );
};

export default NoCityFound;
