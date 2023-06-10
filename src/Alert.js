import React, { useEffect } from "react";

const Alert = ({ show, msg, type, showAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
