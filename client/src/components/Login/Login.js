import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { signup, login } from "../../actions/Auth";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
const axios = require("axios");
const Login = () => {
  const [name, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin,setIsLogin]=useState(true);
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async() => {
    dispatch(login({ name, password }, navigate));
  };
  const handleSignup=async()=>{
    dispatch(signup({ name, password }, navigate));
  }
  const toggleCase= async()=>{
    setIsLogin(!isLogin)
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
         Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Name"
              onChange={(e)=>setUser(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            {isLogin ? <Button
              disabled={name === "" || password === ""}
              onClick={handleLogin}
              color="teal"
              fluid
              size="large"
            >
              Login
            </Button>:<Button
              disabled={name === "" || password === ""}
              onClick={handleSignup}
              color="teal"
              fluid
              size="large"
            >
              signUp
            </Button>}
          </Segment>
        </Form>
        {isLogin ?
        <Message>
          New to us? <a style={{cursor:'pointer'}} onClick={toggleCase}>SignUp</a>
        </Message>:<Message>
          already having account? <a style={{cursor:'pointer'}} onClick={toggleCase}>Login</a>
        </Message>}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
