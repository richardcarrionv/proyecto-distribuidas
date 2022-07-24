import React, {useState, useEffect} from "react";
import LoginForm from "../components/forms/LoginForm";

const LoginView = () => {
  const [version, setVersion] = useState({ version: "0.0.0" });

  useEffect(() => {
    window.api.receive("app_version", (app_version) => {
      setVersion(app_version)
    });
  });

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginView;
