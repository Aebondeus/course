import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {MainPage} from "./pageRouters/MainPage.js";
import { NewPost } from "./pageRouters/NewPost.js";
import { PartPage } from "./pageRouters/PartPage.js";
import { PostPage } from "./pageRouters/PostPage.js";
import { RegisterPage } from "./pageRouters/RegisterPage.js";
import { UpdatePost } from "./pageRouters/UpdatePost.js";
import { UserPage } from "./pageRouters/UserPage.js";

export const Routes = (token, id) => {
    return (
        <Switch>
            <Route path="/register" component={RegisterPage} exact />
            <Route path="/post/:postId" component={PostPage} exact />
            <Route path="/post/:postId/:partId" component={PartPage} exact />
            <Route path="/user/:userId" component={UserPage} exact />
            <Route path="/" component={MainPage} exact/>
            <Route path="/createpost" component={NewPost} exact/>
            <Route path="/updatepost/:postId" component={UpdatePost} />
            {/* <Route path="/user/:userId/comments" component ={} />
            <Route path="/create_part/:postId" component={} />
            <Route path="/update_part/:partId" component={} /> */}
            <Redirect to="/" />
        </Switch>
    )
}