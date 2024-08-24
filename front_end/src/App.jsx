import { useEffect, useState } from "react";
import "./App.css";
import UserAuthForm from "./components/UserAuth";
import { userConfirmation } from "./Api";
import ChatBox from "./components/ChatBox";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stablishUser = async () => {
      setUser(await userConfirmation());
    };
    stablishUser();
  }, []);

  return (
    <>
      {user ? null : <UserAuthForm setUser={setUser} />}
      <h1>{user && user}</h1>
      {user ? <ChatBox user={user} /> : null}
    </>
  );
}

export default App;
