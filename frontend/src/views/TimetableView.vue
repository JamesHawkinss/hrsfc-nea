<template>
    <LoginWrapper>
        <PageCard>
            <h1>Your Timetable</h1>
            <p v-if="loading">Loading timetable...</p>
            <p v-if="error">Failed to load timetable...</p>

            <p v-if="!(loading || error || editing) && !timetable.state" class="notice">
                You haven't configured your timetable yet. Click "Edit" to begin.
            </p>

            <p v-if="editing && !timetable.state" class="prompt">
                Tick the boxes in the timetable where you have lessons
            </p>

            <table v-if="timetable.state || editing">
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
                            <p v-if="!editing">{{ timetable.data[day][period] ? 'Lesson' : '' }}</p>
                            <input v-else type="checkbox" v-model="timetable.data[day][period]" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="management">
                <div v-if="!editing">
                    <button v-on:click="startEditing()">Edit</button>
                </div>
                <div v-else>
                    <button v-on:click="cancelEditing()">Revert</button>
                    <button v-on:click="commitEditing()">Save</button>
                </div>
            </div>
        </PageCard>
    </LoginWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginWrapper from '../components/auth/LoginWrapper.vue'
import PageCard from '../components/core/PageCard.vue'

export default {
    components: {
        ...mapGetters(['user']),
        LoginWrapper,
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
                    1: { 1: false, 2: false, 3: false, 4: false, 5: false },
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
            this.loading = true

            try {
                const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/timetable/@me`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await res.json()
                if (!data.status) {
                    this.timetable.state = false
                    this.loading = false
                    return
                }

                this.timetable.data = data.data

                // convert string bools to true bools
                Object.keys(this.timetable.data).forEach((day) => {
                    if (day == '_id') return

                    Object.keys(this.timetable.data[day]).forEach((period) => {
                        if (period == '_id') return

                        if (this.timetable.data[day][period] == 'false') {
                            this.timetable.data[day][period] = false
                        } else {
                            this.timetable.data[day][period] = true
                        }
                    })
                })

                this.timetable.state = true
                this.loading = false
                return
            } catch (e) {
                console.error('failed to get timetable', e)
                this.loading = false
                this.error = true
                return
            }
        },
        startEditing() {
            this.editing = true
        },
        async cancelEditing() {
            this.loading = true
            await this.getTimetable()
            this.loading = false
            this.editing = false
        },
        async commitEditing() {
            if (!this.editing) return
            this.loading = true

            try {
                const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/timetable/@me`, {
                    method: 'POST',
                    body: JSON.stringify(this.timetable.data),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await res.json()
                if (!data.status) {
                    throw new Error(data.message || 'unknown error')
                }

                this.loading = false
                this.timetable.state = true
            } catch (e) {
                console.error('failed to commit timetable', e)
                this.loading = false
                this.error = true
            }

            this.editing = false
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

th,
td {
    width: 100px;
}

input {
    align-items: center;
}

.notice {
    border: 3px solid lightcoral;
    border-radius: 10px;
    padding: 0.5rem;
}

.prompt {
    border: 3px solid lightblue;
    border-radius: 10px;
    padding: 0.5rem;
}
</style>
