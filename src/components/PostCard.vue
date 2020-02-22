<template>
  <div class="PostCard" @mousemove.capture="moveHandler" @mouseleave="resetRotate" @mousedown="resetRotate" ref="card">
    <header>
      <h3 :title="header"><a @click="$emit('click')">{{ header }}</a></h3>
    </header>
    <main>
      <slot name="main"/>
    </main>
    <div class="chips" role="list">
      <slot name="chips" />
    </div>
    <section class="ttr">
      {{ timeToRead }}
    </section>
    <div class="navigator" @click="$emit('click')" role="button" :aria-label="'read article called' + header"><chevron-right-icon /></div>
  </div>    
</template>

<script>
import { gsap } from 'gsap';
import { ChevronRightIcon } from 'vue-feather-icons';
function generateGradient(xPercentage = 50, yPercentage = 50) {
  return `radial-gradient(circle at ${xPercentage}% ${yPercentage}%, rgba(255, 255, 255, 0.2), transparent 75%), var(--cardColorPrimary)`
}
function setRotationAndPercentage(angle) {
return function(e) {
  let rect = this.$refs.card.getBoundingClientRect();
  let height = this.$refs.card.clientHeight;
  let width = this.$refs.card.clientWidth;
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  let xPercentage = ((x / width) - 0.5) * 2;
  let yPercentage = ((y / height) - 0.5) * 2;
  let rotY = Math.round(xPercentage * angle);
  let rotX = Math.round(-1 * yPercentage * angle);
  gsap.to(this.$refs.card, { rotationX: rotX, rotationY: rotY, background: generateGradient(((xPercentage + 1) / 2) * 100, ((yPercentage + 1) / 2) * 100) });
}
}
export default {
  name: "PostCard",
  props: [ "header", "timeToRead" ],
  methods: {
    moveHandler: setRotationAndPercentage(7.5),
    resetRotate(e) {
      setTimeout(() => {
        gsap.to(this.$refs.card, { rotationX: 0, rotationY: 0, background: generateGradient() });
      }, 500)
    }
  },
  components: {
    ChevronRightIcon
  }
}
</script>

<style lang="scss" scoped>
.PostCard {
  --distance: 21px;
  --cardColorPrimary: hsl(var(--colorPrimary-h), var(--colorPrimary-s), var(--colorPrimary-l));
  --top-left-shadow: hsl(var(--colorPrimary-h), var(--colorPrimary-s), calc(var(--colorPrimary-l) - 11%));
  --bottom-right-shadow: hsl(var(--colorPrimary-h), var(--colorPrimary-s), calc(var(--colorPrimary-l) + 11%));

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  grid-template-areas:
    "header header ttr"
    "header header ."
    "main main main"
    "chips chips navigator";
  padding: 1em;
  margin: 1em;
  perspective: 300rem;
  transition: 100ms transform ease;
  width: fit-content;
  min-width: 20ch;
  max-width: 75ch;
  border-radius: 1em;
  box-shadow: var(--distance) var(--distance) 36px var(--top-left-shadow), 
          calc(0px - var(--distance)) calc(0px - var(--distance)) 36px var(--bottom-right-shadow);
  color: hsl(var(--colorPrimary-h), 0% , calc(100% - var(--colorPrimary-l)));
  background: radial-gradient(circle at 50% 50%, transparent, transparent 75%), var(--cardColorPrimary);
  main {
    grid-area: main;
  }
  header {
    grid-area: header;
    cursor: default;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h3 {
      margin: 0;
      font-size: 4vh;
      a {
        cursor: pointer;
        transition: 300ms color ease;
        color: hsl(var(--colorPrimary-h), calc(10% + var(--colorPrimary-s)), calc(100% - var(--colorPrimary-l)));
        &:hover {
            color: hsl(var(--colorPrimary-h), 100%, calc(100% - var(--colorPrimary-l)));
        }
      }
    }
  }
  aside {
    grid-area: aside;
    img, svg {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .navigator {
    cursor: pointer;
    grid-area: navigator;
    align-self: flex-end;
    justify-self: flex-end;
    svg {
      color: hsl(var(--colorPrimary-h), 0% , calc(100% - var(--colorPrimary-l)));
      transition: 300ms color ease;
      &:hover {
        color: hsl(var(--colorPrimary-h), var(--colorPrimary-s), calc(var(--colorPrimary-l) - 30%));
      }
    }
  }
  .chips {
    grid-area: chips;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .md-chip {
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      margin-right: 1ch;
    }
  }
  .ttr {
    display: flex;
    cursor: default;
    grid-area: ttr;
    font-family: var(--sansSerifFont);
    color: hsl(var(--colorPrimary-h), var(--colorPrimary-s), calc(var(--colorPrimary-l) - 40%));
    align-items: center;
    justify-content: center;
  }
}
</style>
