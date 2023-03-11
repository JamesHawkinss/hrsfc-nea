<template>
    <h1>Timetable</h1>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    components: {
        ...mapGetters(['user'])
    }
}
</script>