import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";

import UsernameInput from "../../inputs/username/UsernameInput";
import PasswordInput from "../../inputs/password/PasswordInput";
import "./loginform.css";


const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event);
  };

  const handleUsernameChange = (event) => {
    setUsername(event);
  };

  return (
    <Box className="box">
      <Card className="login-card">
        <UsernameInput
          username={username}
          onUsernameChange={handleUsernameChange}
        />

        <PasswordInput
          password={password}
          onPasswordChange={handlePasswordChange}
        />

        <Button className="button" variant="contained">Iniciar Sesión</Button>
      </Card>
    </Box>
  );
};

export default LoginForm;
