export const serverRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  oauth: {
    success: "/oauth/login/success",
    vk: "/oauth/auth/vkontakte",
    yandex: "/oauth/auth/yandex",
    google: "/oauth/auth/google",
  },
  main: {
    allTags: "/main/alltags",
    ratedPosts: "/main/ratedposts",
    updatedPosts: "/main/updatedposts",
  },
  post: {
    addComment: "/handle_post/add_comm",
    main: "/handle_post/post",
    newPost: "/handle_post/newpost",
    uploadTags: "/handle_post/upload_tags",
    uploadGenres: "/handle_post/upload_genres",
    uploadComments: "/handle_post/upload_comm",
    ratePost: "/handle_post/rate",
  },
  part: {
    main: "/handle_post/part",
    newPart: "/handle_post/newpart",
  },
  search: {
    byTag: "/search/byTag",
  },
  user: {
    removeUser: "/user/deleteUser",
    getData: "/user/get_data",
    sort: "/user/sort",
    updateNickname: "/user/update_nickname",
    updateAbout: "/user/update_about",
  },
};

export const clientRoutes = {
  mainPage: "/",
  user: "/user",
  searchByTag: "/searchByTag",
  updatePart: "/updatepart",
  updatePost: "/updatepost",
  toPost: "/post",
  createPart: "/createpart",
  createPost: "/createpost",
  registerPage: "/register",
  notFound: "/404",
};
