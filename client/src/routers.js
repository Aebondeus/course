import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PageNotFound } from "./components/notFound.js";
import { MainPage } from "./pageRouters/MainPage.js";
import { NewPart } from "./pageRouters/NewPart.js";
import { NewPost } from "./pageRouters/NewPost.js";
import { PartPage } from "./pageRouters/PartPage.js";
import { PostPage } from "./pageRouters/PostPage.js";
import { RegisterPage } from "./pageRouters/RegisterPage.js";
import { SearchByTag } from "./pageRouters/searchTag.js";
import { UpdatePart } from "./pageRouters/UpdatePart.js";
import { UpdatePost } from "./pageRouters/UpdatePost.js";
import { UserPage } from "./pageRouters/UserPage.js";

export const Routes = (token, id) => {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/post/:postId" component={PostPage} exact />
      <Route path="/post/:postId/:partId" component={PartPage} exact />
      <Route path="/user/:userId" component={UserPage} exact />
      <Route path="/createpost" component={NewPost} exact>
        {!token && <Redirect to="/" />}
      </Route>
      <Route path="/updatepost/:postId" component={UpdatePost} exact>
        {!token && <Redirect to="/" />}
      </Route>
      <Route path="/createpart/:postId" component={NewPart} exact>
        {!token && <Redirect to="/" />}
      </Route>
      <Route path="/updatepart/:postId/:partId" component={UpdatePart} exact>
        {!token && <Redirect to="/" />}
      </Route>
      <Route path="/searchByTag/:tagLabel" component={SearchByTag} exact />
      <Route path="/404" component={PageNotFound} />
      <Redirect to="/404" />
    </Switch>
  );
};
