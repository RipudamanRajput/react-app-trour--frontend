import { Button, Card, Frame, Page, Stack, TextField, Loading } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AlertPop } from "../../Global/Alert";

function Registration(props: any | string) {
  const [loading, setloading] = useState<boolean>();
  const history = useNavigate();
  useEffect(() => {
    localStorage.removeItem("Data")
    localStorage.removeItem("Detail")
  }, [])
  // ---------------Signed up -----------
  const [detail, setdetail] = useState<any>([
    {
      username: "",
      password: ""
    }
  ]);
  const onChangevalue = (e: string | any, id: string | any) => {
    setdetail((prev: any) => {
      return {
        ...prev,
        [id]: e
      }
    })
  }

  const registration = () => {
    setloading(true);
    const { username, password } = detail;
    const config = {
      method: "post",
      url: process.env.REACT_APP_SHOP_NAME + "/user",
      withCredentials: true,
      data: { username, password },
      headers: {
        'Authorization': process.env.REACT_APP_TOKEN || '',
        'Content-Type': 'application/json'
      }
    }
    if (username && password) {
      axios(config)
        .then((res) => {
          res.data.message ?
            swal({
              title: "Warning",
              text: res.data.message,
              icon: "warning",
              buttons: {
                catch: {
                  text: "Login",
                  value: "catch",
                }
              }
            })
            :
            res.data.token ? (swal({
              title: "Registration Successful",
              icon: "success",
              buttons: {
                catch: {
                  text: "Login",
                  value: "catch",
                }
              }
            })
              .then((value) => {
                if (value) {
                  history("/login")
                }
              })
            )
              :
              AlertPop("Error", 'This password is already used ', "error");
          setloading(false);
        })
        .catch(err => {
          setloading(false);
          AlertPop("Error", err.toString(), "error");
        })
    }
    else {
      AlertPop("Warning", "Please Fill all Fields", "warning");
    }
  }

  return (
    <Frame>
      <div className="authenctication">
        {loading && <Loading />}
        <Page title="Registartion Page">
          <Card sectioned >
            <Stack vertical spacing="tight">
              <TextField
                onChange={(e, id) => onChangevalue(e, id)}
                id="username"
                name="username"
                autoComplete="off"
                value={detail.username}
                type="text"
                placeholder="Enter First Name"
                label="First Name"
              />
              <TextField
                onChange={(e, id) => onChangevalue(e, id)}
                name='password'
                id="password"
                autoComplete="off"
                value={detail.password}
                type="password"
                placeholder="Enter your password"
                label="Password"
              />

              <Stack alignment="fill">
                <Button
                  fullWidth
                  primary
                  loading={loading}
                  onClick={registration}
                >Submit</Button>
                <Button
                  disabled={loading}
                  fullWidth
                  onClick={() => {
                    history('/login')
                  }}>Login</Button>
              </Stack>
            </Stack>
          </Card>
        </Page>

      </div>
    </Frame>
  )
}

export default Registration;