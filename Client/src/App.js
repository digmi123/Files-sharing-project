import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Projects from "./Pages/Projects";
import Forgotpass from "./Pages/ForgotPassword";
import PasswordRecovery from "./Pages/PasswordRecovery";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/forgotpass" element={<Forgotpass />} />
          <Route
            exact
            path="/passwordRecovery/:token"
            element={<PasswordRecovery />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
