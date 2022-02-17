import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, // end state
  mutations: {
    /**
     * 記事を追加する.
     * @param state - ステート
     * @param payload - ペイロード
     */
    addArticle(state, payload) {
      state.articles.unshift(payload.article);
    },
    /**
     * コメントを追加する.
     * @param state - ステート
     * @param payload - コメント情報
     */
    addComment(state, payload) {
      //コメントを追加する対象の記事を絞り込む（1件だけ絞り込む）
      const newArray = state.articles.filter(
        (article) => article.id === payload.comment.articleId
      );
      //配列を一つの記事として扱う
      const article = newArray[0];

      //コメントオブジェクトを生成
      const comment = new Comment(
        payload.comment.id,
        payload.comment.name,
        payload.comment.content,
        payload.comment.articleId
      );
      
      //コメントリスト配列の0番目(一番上)にコメントを追加
      article.commentList.unshift(comment);
    },
  },
  actions: {},
  getters: {
    /**
     * 記事一覧を返す.
     * @param state - ステート
     * @returns 記事一覧
     */
    getArticles(state) {
      return state.articles;
    },
  },
  modules: {},
});
