import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const { error } = useRouteError();

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <Link to={-1}>Go back</Link>
    </div>
  );
};

export default Error;
