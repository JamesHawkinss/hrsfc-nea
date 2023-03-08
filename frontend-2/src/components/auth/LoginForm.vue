<template>
    <form onsubmit="return false">
        <p v-if="loading">Logging in...</p>
        <p v-if="error.status">Failed to login: {{ error.message }}</p>

        <div>
            <label for="username">Username</label>
            <input v-model="username" />

            <label for="password">Password</label>
            <input v-model="password" type="password" />

            <button @click="submit()">Login</button>

            <button @click="$router.push('/register')">Register</button>
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            username: "",
            password: "",
            loading: false,
            error: {
                status: false,
                message: ""
            }
        };
    },
    methods: {
        async submit() {
            if (this.loading)
                return;
            this.loading = true;
            this.error.status = false;
            this.error.message = "";

            try {
                const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        username: this.username.trim(),
                        password: this.password.trim()
                    }),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                console.log(data);
                if (!data.status) {
                    throw new Error("failed to login");
                }

                this.$router.push("/");
                this.loading = false;
            }
            catch (e) {
                this.loading = false;
                this.error.status = true;
                this.error.message = e.message;
                return;
            }
        }
    },
}
</script>