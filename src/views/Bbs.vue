<template>
  <div id="app">
    <div>
      投稿者名：
      <input type="text" v-model="articleName" /> <br />
      投稿内容：
      <textarea
        name="articleContent"
        v-model="articleContent"
        cols="30"
        rows="10"
      ></textarea>
      <br />
      <button type="button" v-on:click="addArticle">記事投稿</button>
    </div>
    <hr />
    <div v-for="(article,articleIndex) of currentArticleList" v-bind:key="article.id">
      投稿者名：{{ article.name }}<br />
      投稿内容：
      <pre>{{ article.content }}</pre>
      <br />
      <button type="button" v-on:click="deleteArticle(articleIndex)">
        記事削除
      </button>
      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        コメント者名：{{ comment.name }}<br />
        コメント内容：
        <pre>{{ comment.content }}</pre>
      </div>
      <div>名前：</div>
      <input type="text" v-model="commentName" />
      <div>コメント：</div>
      <textarea cols="30" rows="10" v-model="commentContent"></textarea>
      <br />
      <button type="button" v-on:click="addComment(article.id)">
        コメント投稿
      </button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //現在の記事一覧
  private currentArticleList = new Array<Article>();
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";

  /**
   * 記事一覧を表示する.
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }

  /**
   * 記事を追加する.
   */
  addArticle(): void {
    let articles = this.$store.getters.getArticles;
    let newId = 0;
    //articles.length !== 0 もしくは articles.length でもOK
    if (articles.length >= 1) {
      newId = articles[0].id + 1;
    }
    this.$store.commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, []),
    });
    this.articleName = "";
    this.articleContent = "";
  }

  /**
   * コメントを追加する.
   * @param articleId - 記事ID
   */
  addComment(articleId: number): void {
    this.$store.commit("addComment", {
      comment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }
  /**
   * 記事を削除する.
   * @param articleIndex - 記事Index
   */
  deleteArticle(articleIndex: number): void {
    this.$store.commit("deleteArticle", {
      articleIndex: articleIndex,
    });
  }
}
</script>

<style scoped></style>
