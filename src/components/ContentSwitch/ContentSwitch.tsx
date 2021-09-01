import React from "react";
import {Switch, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";

const ContentSwitch = () => {
  return (
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="*">
          <div>Error kurewko</div>
        </Route>
      </Switch>
  );
};

export default ContentSwitch;
