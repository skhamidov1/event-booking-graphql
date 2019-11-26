import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import BookingsPage from "./components/BookingsPage/BookingsPage";
import EventsPage from "./components/EventsPage/EventsPage";
import Nav from "./components/Nav/Nav";
import AuthContext from "./context/auth-context";
import "./assets/styles.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider>
          <Nav />
          <Switch>
            <Route path="/" exact component={null} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
