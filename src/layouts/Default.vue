<template>
  <div class="BasicLayout">
    <section class="header" :title="$static.metadata.siteName">
      <h1>{{ $static.metadata.siteName }}</h1>
    </section>
    <slot/>
    <footer></footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss" scoped>
.BasicLayout {
  h1 {
    margin: 0
  }
}
.header h1 {
  font-family: var(--monospaceFont);
}
</style>
