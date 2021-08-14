import React from "react";
import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Navbar from "./components/Navbar";
import ImageUploader from "./components/ImageUploader";
import Main from "./components/Main";
import Wardrobe from "./components/Wardrobe";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>

        <Route path="/hang" exact>
          <ImageUploader />
        </Route>

        <Route path="/wardrobe" exact>
          <Wardrobe />
        </Route>
      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
