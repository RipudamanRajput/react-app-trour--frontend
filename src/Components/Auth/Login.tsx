import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { Button, Card, Page, Stack, TextField, Loading, Frame, FormLayout } from "@shopify/polaris";
import { AlertPop } from "../../Global/Alert";
import { ViewMinor, HideMinor } from '@shopify/polaris-icons';



function Login() {
  const history = useNavigate();
  const [loading, setloading] = useState<boolean>();
  // -----------------Login Process------------
  const [logindetail, setlogindetail] = useState<any>([
    {
      username: "",
      password: "",
    }
  ]);
  const [hidepass, showpass] = useState<any>();

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
    setloading(true)
    const { username, password } = logindetail;
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_SHOP_NAME}/signin`,
      withCredentials: true,
      data: { username, password },
      headers: {
        'Authorization': process.env.REACT_APP_TOKEN || '',
        'Content-Type': 'application/json'
      }
    };
    if (username && password) {
      axios(config).then((res) => {
        const { id, username, token } = res.data

        const data = {
          id, username, token
        }
        setloading(false)
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
          setloading(false)
          AlertPop("Error", "invalid username and password", "error")
        })
    } else {
      AlertPop("Warning", "kindly Fill the Fields", "warning")
      setloading(false)
    }

  }
  return (
    <>
      <Frame>
        <div className="authenctication">
          {loading && <Loading />}
          <Page title="Login">
            <Card sectioned subdued>
              <FormLayout>
                <TextField
                  id="username"
                  name="username"
                  autoComplete="off"
                  label="Username"
                  value={logindetail.username}
                  onChange={(value, id) => onLoginchange(value, id)}
                  type={'text'}
                  placeholder={'Enter your Username'} />
                <TextField
                  id="password"
                  autoComplete="off"
                  onChange={(value, id) => onLoginchange(value, id)}
                  value={logindetail.password}
                  type={hidepass?.cpass ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  suffix={
                    <Button
                      plain
                      icon={hidepass?.cpass ? ViewMinor : HideMinor}
                      onClick={() => { showpass({ ...hidepass, cpass: hidepass?.cpass ? false : true }) }}
                    />}
                  label="password" />
                <FormLayout.Group condensed>
                  <Button primary fullWidth loading={loading} onClick={Loginuser}>Login</Button>
                  <Button
                    fullWidth
                    disabled={loading}
                    onClick={() => {
                      history('/');
                    }
                    }>Sign Up</Button>
                </FormLayout.Group>
              </FormLayout>
            </Card>
          </Page>
        </div>
      </Frame>
    </>
  )
}

export default Login;