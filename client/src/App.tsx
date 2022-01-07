import { Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main";
import Prisijungti from "./pages/Prisijungti";
import { UserCtx } from "./context/userContext";
import { useState } from "react";
import Nustatymai from "./pages/Nustatymai";

function App() {
  const [user, setUser] = useState({
    username: "",
    id: "",
    role: "",
    message: "",
  });

  return (
    <Router>
      <UserCtx.Provider value={{ user, setUser }}>
        <Route path="/prisijungti" component={Prisijungti} />
        <Route path="/nustatymai" component={Nustatymai} />
        <Route path="/" exact component={Main} />
      </UserCtx.Provider>
    </Router>
  );
}

export default App;
