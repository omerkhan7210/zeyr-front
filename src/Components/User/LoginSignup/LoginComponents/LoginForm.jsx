import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContextC } from "../../../Context/LoginContext";

const LoginForm = ({ noClasses }) => {
  const {
    email,
    password,
    handleSubmit,
    setPassword,
    setUsername,
    errorMessage,
  } = useContext(LoginContextC);

  return (
    <form
      className={`${
        noClasses ? null : "d-flex justify-center flex-c align-center mauto w25"
      }  products-form products-form-login login`}
      method="post"
      onSubmit={handleSubmit}
    >
      {errorMessage && <p>{errorMessage}</p>}
      <p className="form-row w100">
        <label htmlFor="panel_username">Email</label>
        <input
          className="input-text w100"
          id="panel_username"
          type="email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p className="form-row w100">
        <label htmlFor="panel_password">Password</label>
        <input
          className="input-text w100"
          name="password"
          id="panel_password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p className="form-row d-flex justify-center">
        <button
          type="submit"
          className="button medium"
          defaultValue="Sign in"
          data-signing="Siging in..."
          data-signed="Signed In"
        >
          Sign in
        </button>
      </p>
      <p className="lost_password">
        <Link to="/forgot-password">Lost your password?</Link>
      </p>
      <p className="form-row w100 d-flex justify-center">
        <Link to="/signup">
          {" "}
          <span className="create-account button medium alt">
            Create An Account
          </span>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
