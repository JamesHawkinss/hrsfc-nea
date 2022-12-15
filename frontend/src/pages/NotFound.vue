<template>
    <Card>
        <h1>how the fuck did you get here?</h1>
        <p>(this is the 404 page btw)</p>
        <Button :type="'secondary'" @click="$router.push('/')">go home</Button>
    </Card>
</template>

<script>
import Button from '../components/core/Button.vue';
import Card from '../components/core/Card.vue';

export default {
    components: {
        Button,
        Card
    }
}
</script>
