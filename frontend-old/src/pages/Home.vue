<template>
    <div>
        <h1>Home :D</h1>

        <Button @click="test()" :type="'primary'">Primary</Button>
        <Button @click="test()" :type="'secondary'">Secondary</Button>
        <Button @click="test()" :type="'danger'">Danger</Button>

        <TextInput :placeholder="'test'" :type="'password'" :label="'this is a label'" />

        <Tick />
        <Cross />
    </div>
</template>

<script>
import Button from '../components/core/Button.vue';
import TextInput from '../components/core/TextInput.vue';
import Tick from '../components/core/Tick.vue';
import Cross from '../components/core/Cross.vue';

export default {
    components: {
        Button,
        TextInput,
        Tick,
        Cross
    },
    methods: {
        test() {
            alert('clicked');
        }
    }
}
</script>