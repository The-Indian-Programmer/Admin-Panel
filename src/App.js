import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateUser from "./component/createUserPage/CreateUser";
import SignInPage from "./component/SignInPage/SignInPage";
import HomePage from "./component/HomePage/HomePage";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import Header from "./component/Header/Header";
import EditUser from "./component/EditUser/EditUser";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    let allData = localStorage.getItem("allData");
    if (allData === null || JSON.parse(allData).length === 0) {
      let newUser = {
        email: "root@root.com",
        name: "rootAdmin",
        age: "22",
        gender: "male",
        user: "superadmin",
        password: "root",
      };
      localStorage.setItem("allData", JSON.stringify([newUser]));
    }
  }, []);
  return (
    <div className="App" style={{ height: "100%", width: "100%" }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/createuser">
            <CreateUser />
          </Route>

          <Route exact path="/signin">
            <SignInPage />
          </Route>

          <Route exact path="/edituser/:email">
            <EditUser />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
