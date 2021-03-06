import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

import url from "../../services/URL";
function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ispassError, setispasssError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      name: name,
      email: email,
      password: password,
    };
    if (password === password2) {
      axios
        .post(`${url}register/`, data)
        .then((res) => {
          setName("");
          setEmail("");
          setPassword("");
          setPassword2("");

          setLoading(false);
          props.userDisplayName(res.data.user_display_name);
          props.userID(res.data.user_id);
          props.hideModal();
        })
        .catch((err) => {
          setLoading(false);
          seterrorMessage(err.response.data);
          setIsError(true);
          setispasssError(false);
        });
    } else {
      setispasssError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container p-3">
        <div style={{ maxWidth: 350 }}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="mt-2">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password" className="mt-2">
            Password
          </label>
          <form onSubmit={handleSubmit}>
            <input
              name="password"
              autoComplete="off"
              type={passwordShown ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <label htmlFor="password" className="mt-2">
                Confirm password
              </label>
              <input
                name="password"
                autoComplete="off"
                type={passwordShown ? "text" : "password"}
                className="form-control"
                id="password2"
                placeholder="Enter password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <div className="register-login-password" key={`default-checkbox`}>
              <Form.Check
                className="reg-modal-pw"
                onClick={togglePassword}
                type="checkbox"
                id={`default-checkbox`}
                label="Show password"
              />
            </div>
          </form>
          {isError && (
            <small className="mt-3 d-inline-block text-danger">
              {errorMessage}
            </small>
          )}
          {ispassError && (
            <small className="mt-3 d-inline-block text-danger">
              Passwords do not match.
            </small>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Create"}
        </button>
        <Button
          onClick={() => props.showLogin()}
          className="sign-in-register-link"
          variant="link"
        >
          Sign in instead
        </Button>
      </div>
    </>
  );
}
export default Register;
