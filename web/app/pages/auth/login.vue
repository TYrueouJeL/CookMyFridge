<template>
    <div class="p-6 text-center mx-80">
        <!-- Titre dynamique -->
        <h1 class="text-3xl font-bold mb-6">{{ isConnection ? 'Connexion' : 'Inscription' }}</h1>

        <AsyncState :loading="loading" :error="error">
            <form
                @submit.prevent="submit"
                class="border rounded-lg border-gray-300 p-6 space-y-6 mx-80"
            >
                <!-- Champ Email - dans les deux cas -->
                <div>
                    <label class="block font-semibold mb-1">Email</label>
                    <input
                    v-model="form.email"
                    type="email"
                            class="w-full border rounded px-3 py-2"
                            :class="{ 'border-red-500': errors.email }"
                            />
                            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
                </div>
                
                <!-- Champ Mot de passe - dans les deux cas -->
                <div>
                    <label class="block font-semibold mb-1">Mot de passe</label>
                    <input 
                    v-model="form.password"
                    type="password"
                        class="w-full border rounded px-3 py-2"
                        :class="{ 'border-red-500': errors.password }"
                        />
                        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
                </div>

                <!-- Champ Pseudo - uniquement en inscription -->
                <div v-if="!isConnection">
                    <label class="block font-semibold mb-1">Pseudo</label>
                    <input
                        v-model="form.fullName"
                        type="text"
                        class="w-full border rounded px-3 py-2"
                        :class="{ 'border-red-500': errors.fullName }"
                    />
                    <span v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</span>
                </div>
                
                    <!-- Bouton Submit -->
                <button
                    type="submit"
                    class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded mt-4"
                >
                    {{ isConnection ? 'Se connecter' : 'S\'inscrire' }}
                </button>
            </form>
    
            <!-- Boutons de basculement -->
            <div class="mt-6 space-y-2">
                <button
                    v-if="isConnection"
                    @click="toggleForm"
                    class="text-green-500 hover:underline"
                >
                    Pas encore de compte ? S'inscrire
                </button>
                <button
                    v-if="!isConnection"
                    @click="toggleForm"
                    class="text-green-500 hover:underline"
                >
                    Déjà un compte ? Se connecter
                </button>
            </div>
        </AsyncState>
    </div>
</template>

<script setup lang="ts">
import AuthService from '~/services/api/authApi';
import type { RegisterType } from '~/types/UserType';

const router = useRouter()
const { isAuthenticated } = useAuth()

const isConnection = ref(true)

const loading = ref(false)
const error = ref<string | null>(null)

const form = reactive<RegisterType>({
    fullName: '',
    email: '',
    password: ''
})

const errors = reactive<{
    fullName?: string
    email?: string
    password?: string
}>({})

const validate = () => {
    errors.fullName = undefined
    errors.email = undefined
    errors.password = undefined
    
    // Validation du pseudo - uniquement en inscription
    if (!isConnection.value) {
        if (!form.fullName.trim()) {
            errors.fullName = 'Le pseudo est obligatoire'
        }
    }
    
    // Validation de l'email
    if (!form.email.trim()) {
        errors.email = 'L\'email est obligatoire'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'L\'adresse email n\'est pas valide'
    }

    // Validation du mot de passe
    if (!form.password.trim()) {
        errors.password = 'Le mot de passe est obligatoire'
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(form.password)) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
    }

    return !errors.fullName && !errors.email && !errors.password
}

const toggleForm = () => {
    // Réinitialiser le formulaire et les erreurs
    form.fullName = ''
    form.email = ''
    form.password = ''
    errors.fullName = undefined
    errors.email = undefined
    errors.password = undefined
    error.value = null
    
    // Basculer entre connexion et inscription
    isConnection.value = !isConnection.value
}

const submit = async () => {
    if (!validate()) return

    loading.value = true
    error.value = null

    try {
        if (isConnection) {
            await AuthService.login({
                email: form.email,
                password: form.password
            })
        } else {
            await AuthService.register({
                fullName: form.fullName,
                email: form.email,
                password: form.password
            })
        }
        await router.push(`/`)
    } catch (e: any) {
        error.value = e.message ?? 'Erreur de l\'authentification'
        loading.value = false
    }
}

useHead(() => ({
    title: isConnection.value ? 'Connexion' : 'Inscription'
}))
</script>