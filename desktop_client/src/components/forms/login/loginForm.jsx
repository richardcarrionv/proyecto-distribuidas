import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Alert, Button, Snackbar } from "@mui/material";

import UsernameInput from "../../inputs/username/UsernameInput";
import PasswordInput from "../../inputs/password/PasswordInput";
import "./loginform.css";
import { UserContext } from "../../../UserContext";
import { exists } from "../../../services/userService";
import { existsBranchUser } from "../../../services/branchService.js";

const LoginForm = () => {
  const user = useContext(UserContext);
  const [toast, setToast] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState();
  const [rejected, setRejected] = useState(0); 
  let navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event);
  };

  const handleUsernameChange = (event) => {
    setUsername(event);
  };

  useEffect(() => { 
    if(rejected > 1){ 
      setMessage("Usuario o contraseña incorrectos")
      setRejected(0)
      setToast(true)
    }
  }, [rejected]);

  const handleLogin = (event) => {
    exists(username, password)
      .then((res) => {
        console.log(res);
        navigate("/home");
        user.setId(res.data.id);
        user.setRole(res.data.role);
      })
      .catch((error) => setRejected((prev) => prev+1));
    existsBranchUser(username, password)
      .then((res) => {
        console.log(res);
        navigate("/home");
        user.setId(res.data.id);
        user.setRole("ADMIN");
      })
      .catch((error) => setRejected(prev => prev+1));
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

        <Snackbar
          open={toast}
          autoHideDuration={4000}
          onClose={() => setToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setToast(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
    </Box>
  );
};

export default LoginForm;
