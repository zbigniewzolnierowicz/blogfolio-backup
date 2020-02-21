<template>
    <div class="PostCard" @mousemove.capture="moveHandler" @mouseleave="resetRotate" @mousedown="resetRotate" ref="card" :style="style" @click.self="(event) => $emit('click', event)">
        <main>
            <slot name="main"/>
        </main>
        <aside>
            <slot name="aside"/>
        </aside>
    </div>    
</template>

<script>
import { gsap } from 'gsap';
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
    data() {
        return {
            rotX: 0,
            rotY: 0,
            xPercentage: 0,
            yPercentage: 0,
            color: "#734b6d"
        }
    },
    computed: {
        style() {
            return {
                transform: `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`,
                background: `radial-gradient(circle at ${((this.xPercentage + 1) / 2) * 100}% ${((this.yPercentage + 1) / 2) * 100}%, rgba(255, 255, 255, 0.1), transparent 75%), ${this.color}`
            }
        }
    },
    methods: {
        moveHandler: setRotationAndPercentage(7.5),
        resetRotate(e) {
            setTimeout(() => {
                gsap.to(this.$data, { rotX: 0, rotY: 0, xPercentage: 0, yPercentage: 0 });
            }, 500)
        }
    }
}
</script>

<style lang="scss" scoped>
.PostCard {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto;
    padding: 1em;
    margin: 1em;
    perspective: 300rem;
    transition: 100ms transform ease;
    width: fit-content;
    min-width: 50ch;
    max-width: 75ch;
    border-radius: 1em;
    box-shadow: 4px 4px 8px #22222280, -4px -4px 8px #e9e9e980;
    color: white;
    cursor: pointer;
    main {
        grid-column: 1 / 1;
    }
    aside {
        grid-column: 2 / 2;
        img, svg {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>
