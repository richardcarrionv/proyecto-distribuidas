import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";

import UsernameInput from "../../inputs/username/UsernameInput";
import PasswordInput from "../../inputs/password/PasswordInput";
import "./loginform.css";
import { UserContext } from "../../../UserContext";
import { exists } from "../../../services/userService";
import { existsBranchUser } from "../../../services/branchService.js";

const LoginForm = () => {
  const user = useContext(UserContext);

  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event);
  };

  const handleUsernameChange = (event) => {
    setUsername(event);
  };

  const handleLogin = (event) => {
    exists(username, password)
      .then((res) => {
        console.log(res);
        navigate("/home");
        user.setId(res.data.id);
        user.setRole(res.data.role);
      })
      .catch((error) => console.log(error));
    existsBranchUser(username, password)
      .then((res) => {
        console.log(res);
        navigate("/home");
        user.setId(res.data.id);
        user.setRole("ADMIN");
      })
      .catch((error) => console.log(error));
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

        <Button className="button" variant="contained" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Card>
    </Box>
  );
};

export default LoginForm;
