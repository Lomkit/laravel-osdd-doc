import { useIntersectionObserver } from '@vueuse/core'
import type { MaybeElementRef } from '@vueuse/core'

export function prefersMotion(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const useLandingPlayback = (target: MaybeElementRef, start: () => void) => {
  const motion = ref(false)

  onMounted(() => {
    motion.value = prefersMotion()

    if (!motion.value) {
      return
    }

    const { stop } = useIntersectionObserver(target, ([entry]) => {
      if (entry?.isIntersecting) {
        stop()
        start()
      }
    }, { threshold: 0.35 })
  })

  return { motion }
}
