<template>
    <Layout>
        <h1>{{ $static.metadata.siteName }}</h1>
        <div class="listOfPosts">
          <PostCard
            v-for="edge in $static.allBlogPost.edges"
            :key="edge.node.id"
            @click="$router.push({ path: edge.node.path })"
          >
            <template v-slot:main>
              <h3>{{ edge.node.title }}</h3>
              <p>{{ edge.node.excerpt }}</p>
              <p>{{ edge.node.timeToRead }} min</p>
            </template>
            <template v-slot:aside>
              <g-image src="../assets/align-left.svg"/>
            </template>
          </PostCard>
        </div>
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
import AlignLeft from "../assets/align-left.svg"
export default {
  components: {
    PostCard,
    AlignLeft
  }
}
</script>

<style lang="scss" scoped>
.listOfPosts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly
}
</style>