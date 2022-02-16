<template>
  <div id="app">
    <div v-for="article of currentArticleList" v-bind:key="article.id">
      投稿者名：{{ article.name }} <br />
      投稿内容：
      <pre>{{ article.content }}</pre>
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

  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }
}
</script>

<style scoped></style>
