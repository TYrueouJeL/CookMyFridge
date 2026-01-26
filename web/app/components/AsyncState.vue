<template>
    <div>
        <div v-if="loading" class="text-center py-10 text-gray-500">
        <slot name="loading">
            Chargement...
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
