<template>
    <div>
        <h2>403 Forbidden: You have no access to this content</h2>
        <img height="500"
        src="~@/assets/forbidden.jpg"
        >
    </div>
</template>
<script>
export default {
  metaInfo: { title: '403 Forbidden' }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
h2 {
    font-family: 'Source Sans Pro';
    text-align: center;
    margin-top:10vh;
}
div {
    min-height: 80vh;
    min-width: 100vw;
    text-align: center ;
}
</style>
