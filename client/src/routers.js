import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PageNotFound } from "./components/notFound.js";
import { MainPage } from "./pageRouters/MainPage.js";
import { NewPart } from "./pageRouters/NewPart.js";
import { NewPost } from "./pageRouters/NewPost.js";
import { PartPage } from "./pageRouters/PartPage.js";
import { PostPage } from "./pageRouters/PostPage.js";
import { RegisterPage } from "./pageRouters/registerPage/RegisterPage.js";
import { SearchByTag } from "./pageRouters/searchTag.js";
import { UpdatePart } from "./pageRouters/UpdatePart.js";
import { UpdatePost } from "./pageRouters/UpdatePost.js";
import { UserPage } from "./pageRouters/UserPage.js";
import { clientRoutes } from './constants/allRoutes';

const {
  mainPage,
  user,
  searchByTag,
  updatePart,
  updatePost,
  toPost,
  createPost,
  createPart,
  registerPage,
  notFound,
} = clientRoutes;

export const Routes = (token) => {
  return (
    <Switch>
      <Route path={mainPage} component={MainPage} exact />
      <Route path={registerPage} component={RegisterPage} exact />
      <Route path={`${toPost}/:postId`} component={PostPage} exact />
      <Route path={`${toPost}/:postId/:partId`} component={PartPage} exact />
      <Route path={`${user}/:userId`} component={UserPage} exact />
      <Route path={createPost} component={NewPost} exact>
        {!token && <Redirect to={mainPage} />}
      </Route>
      <Route path={`${updatePost}/:postId`} component={UpdatePost} exact>
        {!token && <Redirect to={mainPage} />}
      </Route>
      <Route path={`${createPart}/:postId`} component={NewPart} exact>
        {!token && <Redirect to={mainPage} />}
      </Route>
      <Route path={`${updatePart}/:postId/:partId`} component={UpdatePart} exact>
        {!token && <Redirect to={mainPage} />}
      </Route>
      <Route path={`${searchByTag}/:tagLabel`} component={SearchByTag} exact />
      <Route path={notFound} component={PageNotFound} />
      <Redirect to={notFound} />
    </Switch>
  );
};
