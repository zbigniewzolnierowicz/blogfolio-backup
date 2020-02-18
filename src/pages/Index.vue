<template>
    <Layout>
        <h1>{{ $static.metadata.siteName }}</h1>
        <PostCard
          v-for="edge in $static.allBlogPost.edges"
          :key="edge.node.id"
          @click="$router.push({ path: edge.node.path })"
        >
          <h3>{{ edge.node.title }}</h3>
          <p>{{ edge.node.excerpt }}</p>
          <p>{{ edge.node.timeToRead }} min</p>
        </PostCard>
    </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  allBlogPost {
    edges {
      node {
        title
        path
        excerpt
        timeToRead
      }
    }
  }
}
</static-query>

<script>
import PostCard from "../components/PostCard"
export default {
  components: {
    PostCard
  }
}
</script>