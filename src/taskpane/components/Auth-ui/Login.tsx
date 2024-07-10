import React, { useState } from 'react';
import { Input, Button, makeStyles, Card, CardFooter, Image } from '@fluentui/react-components';
import { Toast, ToastTitle, ToastTrigger } from '@fluentui/react-components';
import { DismissCircle16Regular, DismissFilled } from '@fluentui/react-icons';
import { useId, useToastController, Toaster } from '@fluentui/react-components';
import { Loader } from '../Loader/loader';
import { validateCredentials } from '../auth/config';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    margin: 'auto',
    width: '720px',
    maxWidth: '100%',
    padding: '18px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    flexGrow: 1,
  },
});

const Login = () => {
  //states
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //toast parameters
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  // login function
  const handleLogin = () => {
    setLoading(true);

    validateCredentials(username, password, (error, response) => {
      if (error) {
        console.error(error);
        setLoading(false);
        loadToast(error, true);
      } else {
        console.log(response);
        window.localStorage.setItem('accessToken', JSON.stringify(response.access_token));
        loadToast('Logged in successfully', false);
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 2000);
      }
    });
  };

  const isFormValid = username && password;
  //toast
  const loadToast = (message, isError = false) => {
    const intent = isError ? 'error' : 'success';
    dispatchToast(
      <Toast style={{ marginLeft: "3px" }}>
        <ToastTitle action={<ToastTrigger><DismissFilled style={{ color: 'black', fontSize: '18px' }} /></ToastTrigger>}>
          {message}
        </ToastTitle>
      </Toast>,
      { intent }
    );
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={"https://www.docupulse.de/assets/img/logo.png"} // Replace with the path to your image
            alt="Login Image"
            style={{ height: "30px" }}
          />
        </div>
        <div className="loginlabel">
          <h3 style={{ display: 'flex', justifyContent: 'center' }}>Login</h3>
        </div>
        <div>
          <div className={styles.formGroup}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <Input
            type="password"
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                handleLogin();
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <CardFooter
          style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}
        >
          <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
            <Button style={{ backgroundColor: '#005A9E', color: '#fff', width: "30%" }} onClick={handleLogin} disabled={!isFormValid}>Login</Button>
          </div>
        </CardFooter>
      </Card>
      <Toaster toasterId={toasterId} />
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default Login;
