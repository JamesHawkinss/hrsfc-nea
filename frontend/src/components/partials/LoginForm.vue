<template>
  <Card>
    <form onsubmit="return false">
      <p v-if="loading">logging in...</p>
      <p v-if="error">Failed to login</p>
      
      <div class="fields">
        <TextInput v-model="username" :label="'Username'" />
        <TextInput v-model="password" type="password" :label="'Password'" />
        <Button @click="submit()" :type="'primary'">Login</Button>
        <Button @click="$router.push('/register')" :type="'secondary'">dont have an account? register instead</Button>
      </div>

    </form>
  </Card>
</template>

<script>
import Button from '../core/Button.vue';
import Card from '../core/Card.vue'
import TextInput from '../core/TextInput.vue';

export default {
  data() {
    return {
      username: "",
      password: "",

      loading: false,
      error: false,
    };
  },
  components: {
    Card,
    TextInput,
    Button
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

<style scoped>
.fields {
  width: 50%;
}
</style>