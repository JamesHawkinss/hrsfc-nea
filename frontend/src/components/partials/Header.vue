<template>
    <div class='header'>
        <router-link class='header-title' to='/'>Hills Timetables</router-link>
        <router-link class='header-link' to='/account'>My Account</router-link>
        <router-link class='header-link' to='/account'>My Account</router-link>
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
</style>