<template>
  <div id="app">
    <div>
      投稿者名：
      <input type="text" v-model="articleName" /> <br />
      投稿内容：
      <textarea
        name="articleContent"
        v-model="articleContent"
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <br>
      <button type="button" v-on:click="addArticle">記事投稿</button>
    </div>
    <hr />
    <div v-for="article of currentArticleList" v-bind:key="article.id">
      投稿者名：{{ article.name }} <br />
      投稿内容：
      <pre>{{ article.content }}</pre>
      <hr>
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

  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }
}
</script>

<style scoped></style>
