<template>
    <div class="header">
        <RouterLink class="header-title" to="/">Hills Timetables</RouterLink>
        <RouterLink class="header-link" to="/account">My Account</RouterLink>
        <RouterLink class="header-link" to="/timetable">My Timetable</RouterLink>
        <RouterLink class="header-link" to="/shared">Shared Timetables</RouterLink>

        <RouterLink class="header-link header-right" to="/login" v-if="!$store.state.isLoggedIn">Login</RouterLink>
        <RouterLink class="header-link header-right" to="/register" v-if="!$store.state.isLoggedIn">Register</RouterLink>
        <RouterLink class="header-link header-right" to="/logout" v-if="$store.state.isLoggedIn">Logout</RouterLink>
    </div>
</template>

<style scoped>
    .header {
        background-color: #1a1c24;
        padding: 1rem;
    }

    .header-title {
        color: #fff;
        text-decoration: none;
        font-weight: bold;

        margin-right: 20px;
    }

    .header-link {
        color: #676b7d;
        text-decoration: none;

        margin-left: 10px;
        margin-right: 10px;
    }

    .header-right {
        float: right;
    }
</style>