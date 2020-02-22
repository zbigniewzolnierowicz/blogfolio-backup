<template>
    <div class="md-chip" :title="title" @click="disabled ? null : $emit('click')" :class="disabled ? 'disabled' : ''" role="link">
      <slot />
    </div>
</template>

<script>
export default {
    name: "Chip",
    props: ['title', 'disabled']
}
</script>

<style lang="scss" scoped>
$md-chip-height: 32px;
.md-chip {
  cursor: pointer;
  display: inline-block;
  background: hsl(var(--colorPrimary-h), var(--colorPrimary-s), calc(var(--colorPrimary-l) - 10%));
  font-family: var(--sansSerifFont);
  padding: 0 12px;
  border-radius: 32px;
  font-size: 13px;
  font-weight: bold;
  color: hsl(var(--colorPrimary-h), 0% , calc(100% - calc(var(--colorPrimary-l))));
  &:hover {
    background: hsl(var(--colorPrimary-h), var(--colorPrimary-s), calc(var(--colorPrimary-l) - 30%));
    color: hsl(var(--colorPrimary-h), 0% , calc(100% - calc(var(--colorPrimary-l) + 20%)));
  }
  text-transform: capitalize;
  &.disabled {
    background: hsl(var(--colorPrimary-h), calc(var(--colorPrimary-s) - 10%), calc(var(--colorPrimary-l) - 10%));
    &:hover {
      background: hsl(var(--colorPrimary-h), calc(var(--colorPrimary-s) - 10%), calc(var(--colorPrimary-l) - 10%));
      color: hsl(var(--colorPrimary-h), 0% , calc(100% - calc(var(--colorPrimary-l))));
    }
  }
}

.md-chip, .md-chip-icon {
  height: $md-chip-height;
  line-height: $md-chip-height;
}
</style>