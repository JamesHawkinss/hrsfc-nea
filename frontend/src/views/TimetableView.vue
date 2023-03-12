<template>
    <!-- <LoginWrapper> -->
    <PageCard>
        <h1>Timetable</h1>
        <p v-if="loading">Loading timetable...</p>
        <p v-if="error">Failed to load timetable...</p>

        <p v-if="!(loading || error || editing) && !timetable.state">
            You haven't configured your timetable yet. Click "Edit" to begin.
        </p>
        <p>{{ timetable.data }}</p>

        <!-- FLIP BOOL -->
        <table v-if="!timetable.state">
            <thead>
                <tr>
                    <th></th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="period in 5" :key="period">
                    <td class="period">Period {{ period }}</td>
                    <td v-for="day in 5" :key="day">
                        <p v-if="!editing">{{ timetable.data[day][period] ? "Lesson" : "" }}</p>
                        <input v-else type="checkbox" v-model="timetable.data[day][period]" />
                    </td>
                </tr>
            </tbody>
        </table>
    </PageCard>
    <!-- </LoginWrapper> -->
</template>

<script>
import { mapGetters } from 'vuex'
// import LoginWrapper from '../components/auth/LoginWrapper.vue'
import PageCard from '../components/core/PageCard.vue'

export default {
    components: {
        ...mapGetters(['user']),
        // LoginWrapper,
        PageCard
    },
    data() {
        return {
            loading: false,
            error: false,

            editing: false,

            timetable: {
                state: false,
                data: {
                    1: { 1: true, 2: false, 3: false, 4: false, 5: false },
                    2: { 1: false, 2: false, 3: false, 4: false, 5: false },
                    3: { 1: false, 2: false, 3: false, 4: false, 5: false },
                    4: { 1: false, 2: false, 3: false, 4: false, 5: false },
                    5: { 1: false, 2: false, 3: false, 4: false, 5: false }
                }
            }
        }
    },
    mounted() {
        this.getTimetable()
    },
    methods: {
        async getTimetable() {
            this.loading = true;
        },
        startEditing() {
            this.editing = true;
        },
        commitEditing() {
            if (!this.editing) return;
        }
    }
}
</script>

<style scoped>
table,
th,
td {
    border: 1px solid;
    border-collapse: collapse;
    padding: 0.5rem;

    text-align: center;
}

th,
.period {
    font-weight: bold;
}

input {
    align-items: center;
}
</style>
