<template>
    <form onsubmit="return false">
      <label>
        username
        <input v-model="username" />
      </label>
      <label>
        studentId
        <input v-model="studentId" />
      </label>
      <label>
        password
        <input v-model="password" type="password" />
      </label>
      <label>
        confirm password
        <input v-model="confirmPassword" type="password" />
      </label>
      <button @click="submit()">register</button>
      <p v-if="loading">registering...</p>
      <p v-if="error">Failed to register</p>
      <button @click="$router.push('/login')">already have an account? login instead</button>
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
            studentId: '',
        }
    },
    methods: {
        async submit() {
        if (this.loading) return;

        this.loading = true;
        this.error = false;

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
            });
            const data = await res.json();
            if (!data.status) {
            throw new Error("failed to register");
            }

            this.$router.push('/');

            this.loading = false;
            this.error = false;
        } catch (err) {
            console.error("failed to register", err);
            this.loading = false;
            this.error = true;
            return;
        }
        },
    }
}
</script>