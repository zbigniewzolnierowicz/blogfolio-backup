<template>
  <div class="BasicLayout">
    <header>
      <h1>{{ $static.metadata.siteName }}</h1>
    </header>
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
