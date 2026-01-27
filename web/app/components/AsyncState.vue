<template>
    <div>
        <div v-if="loading" class="text-center py-10">
        <slot name="loading">
            <div class="flex justify-center mb-4">
                <svg class="w-12 h-12 text-green-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </slot>
        </div>

        <div v-else-if="error" class="text-center py-10 text-red-600">
        <slot name="error" :error="error">
            {{ error }}
        </slot>
        </div>

        <div v-else>
        <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    loading: boolean
    error: string | null
}>()
</script>
