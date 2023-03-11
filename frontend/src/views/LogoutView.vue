<template>
<div></div>
</template>

<script>
export default {
    data() {
        return {
                logoutState: {
                loading: false,
                error: false
            }
        }
    },
    methods: {
        async logout() {
            if (this.logoutState.loading) return

            this.logoutState.loading = true
            this.logoutState.error = false

            try {
                const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/logout`, {
                    method: 'POST',
                    credentials: 'include'
                })

                const data = await res.json()
                if (!data.status) {
                    throw new Error('failed to logout')
                }

                this.$store.commit('removeUser')
                this.$router.push('/')

                this.logoutState.loading = false
                this.logoutState.error = false
            } catch (err) {
                console.error('failed to logout', err)

                this.logoutState.loading = false
                this.logoutState.error = true

                return
            }
        }
    }
}
</script>