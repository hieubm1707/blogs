<script setup lang="ts">
// Vue port of page-mascot (https://github.com/nilbuild/page-mascot, MIT),
// which ships as a React component. Each character is two 3x3 sprite
// sheets: nine head directions and nine reactions. The pointer's angle
// picks a direction cell; a click shows reaction cells for a moment.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    directions: string
    reactions: string
    size?: number
    label?: string
  }>(),
  { size: 140, label: 'Boop the mascot' }
)

const DIRECTIONS = [
  'up-left',
  'up',
  'up-right',
  'left',
  'center',
  'right',
  'down-left',
  'down',
  'down-right'
]
const REACTIONS = [
  'blink',
  'heart',
  'sparkle',
  'surprised',
  'wink',
  'bashful',
  'sleepy',
  'dizzy',
  'delighted'
]
// Clockwise from the right, matching atan2 with y pointing down
const CLOCKWISE = [
  'right',
  'down-right',
  'down',
  'down-left',
  'left',
  'up-left',
  'up',
  'up-right'
]
const SECTOR = (Math.PI * 2) / CLOCKWISE.length
const HYSTERESIS = 0.12
const DEAD_ZONE = 70
const PAYOFFS = ['heart', 'sparkle', 'delighted']
const BOOP_PAYOFF = 120
const BOOP_END = 560
const SQUASH_MS = 420
const DIZZY_AFTER = 4
const DIZZY_WINDOW = 1600
const DIZZY_END = 1100
const SQUASH: Keyframe[] = [
  { transform: 'scale(1, 1)', easing: 'ease-in' },
  { transform: 'scale(1.10, 0.86)', offset: 0.18, easing: 'ease-out' },
  { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
  { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
  { transform: 'scale(1, 1)' }
]

const button = ref<HTMLButtonElement | null>(null)
const squash = ref<HTMLSpanElement | null>(null)
const direction = ref('center')
const reaction = ref<string | null>(null)

let timers: number[] = []
const boops = { count: 0, at: 0 }
let sector = -1
let pointer: { x: number; y: number } | null = null

// background-size 300% makes each cell a clean 0/50/100% step on both axes
function cell(index: number) {
  return `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`
}

function wrap(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle))
}

const directionPosition = computed(() =>
  cell(DIRECTIONS.indexOf(direction.value))
)
const reactionPosition = computed(() =>
  cell(REACTIONS.indexOf(reaction.value ?? 'blink'))
)

function aim() {
  if (!button.value || !pointer) return
  const box = button.value.getBoundingClientRect()
  const dx = pointer.x - (box.left + box.width / 2)
  const dy = pointer.y - (box.top + box.height / 2)
  if (Math.hypot(dx, dy) < DEAD_ZONE) {
    sector = -1
    direction.value = 'center'
    return
  }
  // Hold the current sector until the pointer is well past its edge
  const angle = Math.atan2(dy, dx)
  if (
    sector !== -1 &&
    Math.abs(wrap(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS
  ) {
    return
  }
  sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length
  direction.value = CLOCKWISE[sector]
}

function onPointerMove(event: PointerEvent) {
  pointer = { x: event.clientX, y: event.clientY }
  aim()
}

// Browser-only APIs live in onMounted so the SSR build doesn't touch window
let tracking = false
onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  tracking = true
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('scroll', aim, { passive: true })
})

onBeforeUnmount(() => {
  timers.forEach(window.clearTimeout)
  if (!tracking) return
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('scroll', aim)
})

function later(ms: number, next: string | null) {
  timers.push(window.setTimeout(() => (reaction.value = next), ms))
}

function boop() {
  timers.forEach(window.clearTimeout)
  timers = []

  const now = Date.now()
  boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1
  boops.at = now

  if (boops.count >= DIZZY_AFTER) {
    boops.count = 0
    reaction.value = 'dizzy'
    later(DIZZY_END, null)
  } else {
    reaction.value = 'blink'
    later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length])
    later(BOOP_END, null)
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Per-keyframe easing with a linear effect: an easing on the effect would
  // reinterpret every offset and front-load the whole bounce
  squash.value?.animate(SQUASH, { duration: SQUASH_MS, easing: 'linear' })
}
</script>

<template>
  <button
    ref="button"
    type="button"
    class="relative block shrink-0 p-0 border-0 bg-transparent cursor-pointer select-none"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    :aria-label="props.label"
    :title="props.label"
    @click="boop"
  >
    <span
      ref="squash"
      class="relative block w-full h-full"
      style="transform-origin: 50% 78%"
    >
      <span
        class="absolute inset-0 bg-no-repeat"
        :style="{
          backgroundImage: `url(${props.directions})`,
          backgroundSize: '300% 300%',
          backgroundPosition: directionPosition,
          opacity: reaction ? 0 : 1
        }"
      />
      <span
        class="absolute inset-0 bg-no-repeat"
        :style="{
          backgroundImage: `url(${props.reactions})`,
          backgroundSize: '300% 300%',
          backgroundPosition: reactionPosition,
          opacity: reaction ? 1 : 0
        }"
      />
    </span>
  </button>
</template>
