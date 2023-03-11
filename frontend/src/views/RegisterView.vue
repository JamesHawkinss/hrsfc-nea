<template>
    <PageCard>
        <h1>Register</h1>
        <form onsubmit="return false">
            <div v-if="loading || error" class="notice">
                <p v-if="loading">Registering...</p>
                <p v-if="error">Failed to register</p>
            </div>
    
            <div class="fields">
                <label>Username</label>
                <input v-model="username" />

                <label>Student ID</label>
                <input v-model="studentId" />

                <label>Password</label>
                <input v-model="password" type="password" />

                <label>Confirm Password</label>
                <input v-model="confirmPassword" type="password" />
            </div>

            <div class="buttons">
                <button @click="submit()">Register</button>
                <button @click="$router.push('/login')">Login instead</button>
            </div>
        </form>
    </PageCard>
</template>

<script>
import PageCard from '../components/core/PageCard.vue'

export default {
    components: {
        PageCard
    },
    data() {
        return {
            loading: false,
            error: false,

            username: '',
            password: '',
            confirmPassword: '',
            studentId: ''
        }
    },
    methods: {
        async submit() {
            if (this.loading) return

            this.loading = true
            this.error = false

            try {
                const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/register`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: this.username.trim(),
                        password: this.password.trim(),
                        studentId: this.studentId.trim()
                    }),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                if (!data.status) {
                    throw new Error('failed to register')
                }

                this.$router.push('/')

                this.loading = false
                this.error = false
            } catch (err) {
                console.error('failed to register', err)
                this.loading = false
                this.error = true
                return;
            }
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;

    width: 400px;
}

h1 {
    padding-bottom: 1rem;
}

.notice {
    border: 3px solid lightcoral;
    border-radius: 10px;
    padding: .5rem;

}

.fields {
    display: flex;
    flex-direction: column;

    padding-bottom: 1rem;
}

button {
    text-align: center;
    width: 10rem;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
}
</style>