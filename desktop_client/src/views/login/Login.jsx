import React, {useState, useEffect} from "react";
import LoginForm from "../../components/forms/login/loginForm";

const Login = () => {
  const [version, setVersion] = useState({ version: "0.0.0" });

  useEffect(() => {
    window.api.receive("app_version", (app_version) => {
      setVersion(app_version)
    });
  });

  return (
    <>
      <LoginForm />
      <p>{version.version}</p>
    </>
  );
};

export default Login;
