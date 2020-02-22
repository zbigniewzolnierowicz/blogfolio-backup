<template>
    <div class="md-chip" :title="title">
      <slot />
    </div>
</template>

<script>
export default {
    name: "Chip",
    props: ['title']
}
</script>

<style lang="scss" scoped>
$md-chip-height: 32px;
.md-chip {
  cursor: pointer;
  display: inline-block;
  background: hsl(var(--cardColorPrimary-h), var(--cardColorPrimary-s), calc(var(--cardColorPrimary-l) - 10%));
  font-family: var(--sansSerifFont);
  padding: 0 12px;
  border-radius: 32px;
  font-size: 13px;
  font-weight: bold;
  color: hsl(var(--cardColorPrimary-h), 0% , calc(100% - calc(var(--cardColorPrimary-l))));
  &:hover {
    background: hsl(var(--cardColorPrimary-h), var(--cardColorPrimary-s), calc(var(--cardColorPrimary-l) - 30%));
    color: hsl(var(--cardColorPrimary-h), 0% , calc(100% - calc(var(--cardColorPrimary-l) + 20%)));
  }
  text-transform: capitalize;
}

.md-chip, .md-chip-icon {
  height: $md-chip-height;
  line-height: $md-chip-height;
}
</style>