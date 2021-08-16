import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { initReactQueryAuth } from "react-query-auth";
import { ReactQueryDevtools } from "react-query/devtools";

import Navbar from "./components/Navbar";
import ImageUploader from "./components/ImageUploader";
import Main from "./components/Main";
import Wardrobe from "./components/Wardrobe";

import CreateAccount from "./components/account/CreateAccount";
import SignIn from "./components/account/SignIn";

function App() {
  const queryClient = new QueryClient();
  const [loginUser, setLoginUser] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/v1/sessions/check")
      .then((res) => res.json())
      .then((data) => {
        setLoginUser(data);
        console.log("appdata",data)
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>

        <Route path="/hang" exact>
          <ImageUploader loginUser={loginUser} />
        </Route>

        <Route path="/wardrobe" exact>
          <Wardrobe />
        </Route>

        <Route path="/signup" exact>
          <CreateAccount loginUser={loginUser} setLoginUser={setLoginUser} />
        </Route>

        <Route path="/login" exact>
          <SignIn setLoginUser={setLoginUser} loginUser={loginUser} />
        </Route>
      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
