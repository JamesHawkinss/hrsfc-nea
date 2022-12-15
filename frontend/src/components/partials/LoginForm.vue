<template>
  <form onsubmit="return false">
    <label>
      username
      <input v-model="username" />
    </label>
    <label>
      password
      <input v-model="password" type="password" />
    </label>
    <button @click="submit()">login</button>
    <p v-if="loading">logging in...</p>
    <p v-if="error">Failed to login</p>
    <button @click="$router.push('/register')">dont have an account? register instead</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",

      loading: false,
      error: false,
    };
  },
  methods: {
    async submit() {
      if (this.loading) return;

      this.loading = true;
      this.error = false;

      try {
        const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: this.username.trim(),
            password: this.password.trim()
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await res.json();
        if (!data.status) {
          throw new Error("failed to login");
        }

        this.$router.push('/');

        this.loading = false;
        this.error = false;
      } catch (err) {
        console.error("failed to login", err);

        this.loading = false;
        this.error = true;

        return;
      }
    },
  }
}
</script>