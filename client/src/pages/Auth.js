import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [auth, setAuth] = useState({
    id: "",
    pw: "",
  });

  const history = useHistory();

  const authHandler = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const authSubmit = (e) => {
    e.preventDefault();
    history.push("/4537/termproject/API/V1/admin");
  };

  return (
    <>
      <form onSubmit={authSubmit}>
        <p>ID</p>
        <input
          type="email"
          name="id"
          value={auth.id}
          onChange={(e) => authHandler(e)}
        />
        <p>PW</p>
        <input
          type="text"
          name="pw"
          value={auth.pw}
          onChange={(e) => authHandler(e)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Auth;
