<template>
  <Layout>
    <h1>{{ $page.tag.title }}</h1>
    <div class="listOfPosts" role="list">
      <PostCard
        v-for="edge in $page.tag.belongsTo.edges"
        :key="edge.node.id"
        :header="edge.node.title"
        @click="$router.push({ path: edge.node.path })"
        :timeToRead="edge.node.timeToRead + ' min'"
        role="listitem"
      >
        <template v-slot:main>
          <p>{{ edge.node.excerpt }}</p>
        </template>
        <template v-slot:chips>
          <Chip v-for="tag in edge.node.tags" :key="tag.id" :title="tag.title" role="listitem" :disabled="(tag.path === $router.currentRoute.fullPath)" @click="$router.push({ path: tag.path })">
            {{ tag.shortTitle }}
          </Chip>
        </template>
      </PostCard>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  tag(id: $id) {
    title
    belongsTo {
      edges {
        node {
          ... on BlogPost {
            id
            title
            excerpt
            path
            timeToRead
            tags {
              id
              title
              shortTitle
              path
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import PostCard from "../components/PostCard"
import Chip from "../components/Chip"
export default {
  name: "Tag",
  components: {
    PostCard,
    Chip
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