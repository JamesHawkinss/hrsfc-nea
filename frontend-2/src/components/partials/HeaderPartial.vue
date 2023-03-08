<template>
    <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login" v-if="!$store.state.isLoggedIn">Login</RouterLink>
    </div>
</template>