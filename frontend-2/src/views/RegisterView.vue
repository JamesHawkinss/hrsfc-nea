<template>
    <form onsubmit="return false">
        <p v-if="loading">registering...</p>
        <p v-if="error">Failed to register</p>

        <div class="fields">
            <input v-model="username" />
            <input v-model="studentId" />
            <input v-model="password" type="password" />
            <input v-model="confirmPassword" type="password" />

            <button @click="submit()">Register</button>
            <button @click="$router.push('/login')">Login instead</button>

        </div>
    </form>
</template>

<script>
export default {
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
