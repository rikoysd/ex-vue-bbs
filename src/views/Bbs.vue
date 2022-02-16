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
      <button type="button" v-on:click="addArticle()">記事投稿</button>
    </div>
    <hr />
    <div v-for="article of currentArticleList" v-bind:key="article.id">
      投稿者名：{{ article.name }}<br />
      投稿内容：
      <pre>{{ article.content }}</pre>
      <br />
      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        コメント者名：{{ comment.name }}<br />
        コメント内容：{{ comment.content }}
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //現在の記事一覧
  private currentArticleList = new Array<Article>();
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";

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
    if (articles.length) {
      newId = articles[0].id + 1;
    }
    this.$store.commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, []),
    });
    this.articleName = "";
    this.articleContent = "";
  }
}
</script>

<style scoped></style>
