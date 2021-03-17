import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {MainPage} from "./pageRouters/MainPage.js";
import { NewPart } from "./pageRouters/NewPart.js";
import { NewPost } from "./pageRouters/NewPost.js";
import { PartPage } from "./pageRouters/PartPage.js";
import { PostPage } from "./pageRouters/PostPage.js";
import { RegisterPage } from "./pageRouters/RegisterPage.js";
import { SearchByTag } from "./pageRouters/searchTag.js";
import { UpdatePart } from "./pageRouters/UpdatePart.js";
import { UpdatePost } from "./pageRouters/UpdatePost.js";
import { UserPage } from "./pageRouters/UserPage.js";
// import {Test} from "./pageRouters/Test.js"

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
            <Route path="/createpart/:postId" component={NewPart} />
            <Route path="/updatepart/:postId/:partId" component={UpdatePart} exact />
            <Route path="/searchByTag/:tagLabel" component={SearchByTag} exact />
            {/* <Route path="/test" component={Test} exsct /> */}
            <Redirect to="/" />
        </Switch>
    )
}