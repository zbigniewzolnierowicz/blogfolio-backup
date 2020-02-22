<template>
  <Layout>
    <div v-html="this.$page.blogPost.content">
    </div>
  </Layout>
</template>

<page-query>
query getBlogPost($path: String!) {
  blogPost: blogPost(path: $path) {
  	id
    title
    content
  }
}
</page-query>

<script>
//import BlogLayout from '../layouts/BlogLayout';
export default {
  name: "BlogPostTemplate",
  created() {
  },
  // components: {
  //     BlogLayout
  // }
}
</script>

<style lang="scss">

</style>