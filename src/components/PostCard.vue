<template>
    <div class="PostCard" @mousemove.capture="moveHandler" @mouseleave="resetRotate" @mousedown="resetRotate" ref="card" :style="style">
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
        let height = this.$refs.card.clientHeight
        let width = this.$refs.card.clientWidth
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        this.xPercentage = ((x / width) - 0.5) * 2,
        this.yPercentage = ((y / height) - 0.5) * 2
        this.rotY = Math.round(this.xPercentage * angle)
        this.rotX = Math.round(-1 * this.yPercentage * angle)
    }
}
export default {
    name: "PostCard",
    props: [ "header" ],
    data() {
        return {
            rotX: 0,
            rotY: 0,
            xPercentage: 0,
            yPercentage: 0,
            color: "linear-gradient(145deg, #ffffff, #d6d6d6)"
        }
    },
    computed: {
        style() {
            return {
                transform: `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`,
                background: `radial-gradient(circle at ${((this.xPercentage + 1) / 2) * 100}% ${((this.yPercentage + 1) / 2) * 100}%, rgba(255, 255, 255, 0.5), transparent 75%), ${this.color}`
            }
        }
    },
    methods: {
        moveHandler: setRotationAndPercentage(5),
        resetRotate(e) {
            setTimeout(() => {
                gsap.to(this.$data, { rotX: 0, rotY: 0, xPercentage: 0, yPercentage: 0 });
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
    box-shadow: 21px 21px 36px #cacaca, 
            -21px -21px 36px #ffffff;
    color: white;
    main {
        grid-area: main;
        p {
            color: black;
        }
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
