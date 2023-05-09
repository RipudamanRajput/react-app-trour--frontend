import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { Button, Card, Page, Stack, TextField } from "@shopify/polaris";
import { AlertPop } from "../../Global/Alert";


function Login() {
  const history = useNavigate();
  // -----------------Login Process------------
  const [logindetail, setlogindetail] = useState<any>([
    {
      username: "",
      password: "",
    }
  ])
  const onLoginchange = (e: string | number, id: string | number) => {
    setlogindetail((prev: any) => {
      return {
        ...prev,
        [id]: e
      }
    })
  }
  useEffect(() => {
    localStorage.removeItem("Data")
  }, [])

  const Loginuser = () => {
    const { username, password } = logindetail;
    const config = {
      method: "post",
      url: "http://localhost:3001/signin",
      withCredentials: true,
      data: { username, password },
      headers: {
        'Authorization': process.env.REACT_APP_TOKEN || '',
        'Content-Type': 'application/json'
      }
    };

    axios(config).then((res) => {
      const { id, username, token } = res.data

      const data = {
        id, username, token
      }
      res.data ?
        (
          swal({
            title: "Login Successful",
            icon: "success",
            buttons: {
              catch: {
                text: "Go To Dashboard",
                value: "catch",
              }
            }
          })

            .then((value) => {
              if (value) {
                history("/panel/Dashboard")
                window.location.reload()
              }
            })

        )
        :
        AlertPop("Warning", "Please fill correct username and password", "error")
      localStorage.setItem("Data", JSON.stringify(data));
    })
      .catch(err => {
        AlertPop("Error", err.toString(), "error")
      })

  }
  return (
    <>
      <div className="authenctication">
        <Page title="Login">
          <Card sectioned subdued>
            <Stack vertical spacing="tight">
              <Stack.Item>
                <TextField
                  id="username"
                  name="username"
                  autoComplete="off"
                  label="Username"
                  value={logindetail.username}
                  onChange={(value, id) => onLoginchange(value, id)}
                  type={'text'}
                  placeholder={'Enter your Username'} />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  id="password"
                  autoComplete="off"
                  onChange={(value, id) => onLoginchange(value, id)}
                  value={logindetail.password}
                  type={'password'}
                  placeholder="Enter your password"
                  name="password"
                  label="password"
                />
              </Stack.Item>
              <Stack spacing="tight">
                <Button primary onClick={Loginuser}>Login</Button>
                <Button
                  onClick={() => {
                    history('/');
                  }
                  }>Sign Up</Button>
              </Stack>
            </Stack>
          </Card>
        </Page>
      </div>
    </>
  )
}

export default Login;