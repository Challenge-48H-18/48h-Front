<template>
  <div>
    <span>work in progress</span>
    <h3>vous avez {{user.point}} point</h3>

  </div>
</template>

<script>
export default {
  name: "Shop",
  data(){
    return{
      user:{
        point:135,
        userId: '45',
        username: 'Baptiste',
      }
    }
  }
}
</script>

<style scoped>

</style>
