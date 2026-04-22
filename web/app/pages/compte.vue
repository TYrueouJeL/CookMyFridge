<template>
  <div>
    <h1>Compte</h1>
  </div>
</template>

<script setup>
import AuthService from '~/services/api/authApi';

const auth = useAuth();

onMounted(async () => {
    if (!auth.token.value) {
        await navigateTo('/auth/login')
    }
})
</script>
