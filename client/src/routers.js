import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import { LoginPage } from "./pageRouters/LoginPage.js";
import {MainPage} from "./pageRouters/MainPage.js";
import { PartPage } from "./pageRouters/PartPage.js";
import { PostPage } from "./pageRouters/PostPage.js";
import { RegisterPage } from "./pageRouters/RegisterPage.js";
import { UserPage } from "./pageRouters/UserPage.js";

export const Routes = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} exact />
            <Route path="/register" component={RegisterPage} exact />
            <Route path="/post/:postId" component={PostPage} exact />
            <Route path="/post/:postId/:partId" component={PartPage} exact />
            <Route path="/user/:userId" component={UserPage} exact />
            <Route path="/" component={MainPage} exact/>
            <Redirect to="/" />
        </Switch>
    )
}