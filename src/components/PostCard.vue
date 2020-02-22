<template>
    <div class="PostCard" @mousemove.capture="moveHandler" @mouseleave="resetRotate" @mousedown="resetRotate" ref="card">
        <header>
            <h3><a @click="$emit('click')">{{ header }}</a></h3>
        </header>
        <main>
            <slot name="main"/>
        </main>
        <aside>
            <slot name="aside"/>
        </aside>
        <section class="navigator" @click="$emit('click')"><chevron-right-icon /></section>
    </div>    
</template>

<script>
import { gsap } from 'gsap';
import { ChevronRightIcon } from 'vue-feather-icons';
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
        gsap.to(this.$refs.card, { rotationX: rotX, rotationY: rotY, background: `radial-gradient(circle at ${((xPercentage + 1) / 2) * 100}% ${((yPercentage + 1) / 2) * 100}%, rgba(255, 255, 255, 0.1), transparent 75%), var(--cardColorPrimary)` });
    }
}
export default {
    name: "PostCard",
    props: [ "header" ],
    computed: {
        style() {
            return {
            }
        }
    },
    methods: {
        moveHandler: setRotationAndPercentage(5),
        resetRotate(e) {
            setTimeout(() => {
                gsap.to(this.$refs.card, { rotationX: 0, rotationY: 0, background: `radial-gradient(circle at 50% 50%, transparent, transparent 75%), var(--cardColorPrimary)` });
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
    --cardColorPrimary: hsl(var(--cardColorPrimary-h), var(--cardColorPrimary-s), var(--cardColorPrimary-l));
    --top-left-shadow: hsl(var(--cardColorPrimary-h), var(--cardColorPrimary-s), calc(var(--cardColorPrimary-l) - 11%));
    --bottom-right-shadow: hsl(var(--cardColorPrimary-h), var(--cardColorPrimary-s), calc(var(--cardColorPrimary-l) + 11%));

    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 2fr 3fr 1fr;
    grid-template-areas:
        "header header header"
        "main main aside"
        "main main navigator";
    padding: 1em;
    margin: 1em;
    perspective: 300rem;
    transition: 100ms transform ease;
    width: fit-content;
    min-width: 20ch;
    max-width: 75ch;
    border-radius: 1em;
    box-shadow: 21px 21px 36px var(--top-left-shadow), 
            -21px -21px 36px var(--bottom-right-shadow);
    color: hsl(var(--cardColorPrimary-h), 0% , calc(100% - var(--cardColorPrimary-l)));
    background: radial-gradient(circle at 50% 50%, transparent, transparent 75%), var(--cardColorPrimary);
    main {
        grid-area: main;
    }
    header {
        cursor: pointer;
        grid-area: header;
        grid-row: 1 / 2;
        grid-column: 1 / 1;
        h3 a {
            transition: 300ms color ease;
            color: #734b6d;
            &:hover {
                color: #ac73a3;
            }
        }
    }
    aside {
        grid-area: aside;
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        img, svg {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    section.navigator {
        cursor: pointer;
        grid-area: navigator;
        grid-row: 3 / 3;
        grid-column: 2 / 2;
        align-self: flex-end;
        justify-self: flex-end;
        svg {
            color: black;
        }
    }
}
</style>
