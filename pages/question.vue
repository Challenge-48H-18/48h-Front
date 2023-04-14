<template>
<div>
<v-card>
  <v-btn  v-if="test ===2" @click="caca">
    <v-icon color="red">mdi-close</v-icon>
  </v-btn>
  <v-card-title>
    test
  </v-card-title>
</v-card>

</div>
</template>

<script>
export default {
  name: "Question",
  data(){
    return{
      test:2,
    }
  },
  methods:{
    caca(){
      console.log('enculer')
    }
  }

}
</script>

<style scoped>

</style>
