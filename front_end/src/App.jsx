import { useEffect, useState } from "react";
import "./App.css";
import UserAuthForm from "./components/UserAuth";
import { userConfirmation } from "./Api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stablishUser = async () => {
      setUser(await userConfirmation());
    };
    stablishUser()
  }, []);

  return (
    <>
      <UserAuthForm setUser={setUser} />
      <h1>{user && user}</h1>
    </>
  );
}

export default App;
