import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useDetectOutsideElementClick(component: Ref, callback: () => void) {
    if (!component) return;

    const listener = (event: MouseEvent) => {
        if (event.target !== component.value && event.composedPath().includes(component.value)) {
            return
        }
        if (typeof callback === 'function') {
            callback();
        }
    }
    onMounted(() => { window.addEventListener('mousedown', listener) })
    onBeforeUnmount(() => { window.removeEventListener('mousedown', listener) })

    return { listener }
}