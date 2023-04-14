<template>
<div>
  <v-text-field v-model="data.name" label="prénom"></v-text-field>
  <v-text-field v-model="data.password" label="mot de passe"></v-text-field>
  <v-text-field v-model="userId" label="ID Userdel"></v-text-field>
  <v-btn @click="send">send</v-btn>
  <v-btn @click="del">del</v-btn>
</div>
</template>

<script>
export default {
  name: "Test",
  data(){
    return{
      userId:'',
      data: {
        name:'',
        password:'',
        role: 'Global Elite',
        niveau: '/index.php/api/niveaux/147',
        tags: [
          "/index.php/api/tags/62",
          "/index.php/api/tags/64"
        ],
        point: 0
      }

    }
  }, async fetch(){
    try {
      const test = await this.$axios.get('http://thegoodnetwork.fr/index.php/api/states/En%20cours')
      console.log(test)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  },
  methods:{
    send(){
      console.log(this.data)
     this.$axios.post('http://thegoodnetwork.fr/index.php/api/users', this.data )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    del(){
      this.$axios.delete('http://thegoodnetwork.fr/index.php/api/users/' + this.userId )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
