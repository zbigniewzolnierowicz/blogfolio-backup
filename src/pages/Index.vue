<template>
  <Layout>
    <div class="listOfPosts" role="list">
      <PostCard
        v-for="edge in $static.allBlogPost.edges"
        :key="edge.node.id"
        @click="$router.push({ path: edge.node.path })"
        :header="edge.node.title"
        :timeToRead="edge.node.timeToRead + ' min'"
        role="listitem"
      >
        <template v-slot:main>
          <p>{{ edge.node.excerpt }}</p>
        </template>
        <template v-slot:chips>
          <Chip v-for="tag in edge.node.tags" :key="tag.id" :title="tag.title" role="listitem">
            {{ tag.id }}
          </Chip>
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
        tags {
          id
          title
        }
      }
    }
  }
}
</static-query>

<script>
import PostCard from "../components/PostCard"
import Chip from "../components/Chip"
export default {
  components: {
    PostCard,
    Chip
  },
  mounted() {
    console.log("You look at the maclunky and think about how tasty it is. You think about how delicious it would be if you ate it raw. You think about how delicious it would be if you ate it cooked.")
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