<template>
    <div>
        <slot />
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #181a21;
    border-radius: 10px;
    margin: 1rem;
    padding: 1rem;
}
</style>