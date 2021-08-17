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

import EditOutfitForm from "./components/EditOutfitForm"

import Colours from "./components/selection/Colours"
import Outfit from "./components/selection/Outfit"
import Feelings from "./components/selection/Feelings"
import Occasion from "./components/selection/Occasion"


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


        <Route path="/signup" exact>
          <CreateAccount loginUser={loginUser} setLoginUser={setLoginUser} />
        </Route>

        <Route path="/login" exact>
          <SignIn setLoginUser={setLoginUser} loginUser={loginUser} />
        </Route>

        <Route path="/colour" exact>
          <Colours loginUser={loginUser}/>
        </Route>

        <Route path="/feelings" exact>
          <Feelings loginUser={loginUser}/>
        </Route>

        <Route path="/occasion" exact>
          <Occasion loginUser={loginUser}/>
        </Route>


        <Route path="/wardrobe" exact>
          <Wardrobe loginUser={loginUser}/>
        </Route>

        <Route path="/wardrobe/:postid" exact>
          <Outfit loginUser={loginUser}/>
        </Route>

        <Route path="/wardrobe/edit/:postid" exact>
          <EditOutfitForm loginUser={loginUser}/>
        </Route>

      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
