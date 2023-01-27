<template>
  <Card>
    <form onsubmit="return false">
      <p v-if="loading">registering...</p>
      <p v-if="error">Failed to register</p>

      <div class="fields">
        <TextInput :value="username" :label="'Username'" />
        <TextInput v-model="studentId" :label="'Student ID'" />
        <TextInput v-model="password" type="password" :label="'Password'" />
        <TextInput
          v-model="confirmPassword"
          type="password"
          :label="'Confirm Password'"
        />
        <Button @click="submit()" :type="'primary'">Register</Button>
        <Button @click="$router.push('/login')" :type="'secondary'">
          already have an account? login instead
        </Button>
      </div>
    </form>
  </Card>
</template>


<script>
import Button from "../core/Button.vue";
import Card from "../core/Card.vue";
import TextInput from "../core/TextInput.vue";

export default {
  components: { TextInput, Button, Card },
  data() {
    return {
      loading: false,
      error: false,
      username: "",
      password: "",
      confirmPassword: "",
      studentId: "",
    };
  },
  methods: {
    async submit() {
      if (this.loading) return;

      this.loading = true;
      this.error = false;

      try {
        const res = await fetch(
          `${window._env_.FRONTEND_API_URL}/api/v1/auth/register`,
          {
            method: "POST",
            body: JSON.stringify({
              username: this.username.trim(),
              password: this.password.trim(),
              studentId: this.studentId.trim(),
            }),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.status) {
          throw new Error("failed to register");
        }

        this.$router.push("/");

        this.loading = false;
        this.error = false;
      } catch (err) {
        console.error("failed to register", err);
        this.loading = false;
        this.error = true;
        return;
      }
    },
  },
};
</script>

<style scoped>
.fields {
  width: 50%;
}
</style>