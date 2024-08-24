import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { logInOrRegister, userLogOut } from "../Api.jsx";
import { useState } from "react";

const UserAuthForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reg, setReg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(await logInOrRegister(email, password, reg));
    setEmail("");
    setPassword("");
    setReg(false);
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          type="submit"
          onClick={() => setReg(false)}
          variant="outline-dark"
        >
          Log In
        </Button>
        <Button
          type="submit"
          onClick={() => setReg(true)}
          variant="outline-dark"
        >
          Register
        </Button>
        <Button
          onClick={async () => setUser(await userLogOut())}
          variant="outline-danger"
        >
          Log Out
        </Button>
      </Form>
    </>
  );
};

export default UserAuthForm;
