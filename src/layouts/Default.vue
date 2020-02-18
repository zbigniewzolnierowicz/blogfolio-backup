<template>
  <div class="BasicLayout">
    <header>
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

<style lang="scss">
body, html {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
}
.BasicLayout {
  h1 {
    margin: 0
  }
}
</style>
