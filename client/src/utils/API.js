import axios from "axios";

export default {

  // saves article to db
  saveArticle: function (articleData) {
      console.log(articleData)
    return axios.post("/api/articles", articleData);
  },
  // gets all saved articles
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // deletes saved article 
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  }
};