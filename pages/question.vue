<template>
<div>
  <div v-if="loading"><spa>loading</spa></div>
  <div v-if="!loading">
  <client-only>
<v-card>
  <v-btn  v-if="test ===2" @click="caca">
    <v-icon color="red">mdi-close</v-icon>
  </v-btn>
  <v-card-title>
    {{data.title}}
  </v-card-title>
  <v-card-subtitle>{{data.content}}</v-card-subtitle>
  <v-card-text>
    {{data.state.name}}
    <v-icon v-if="data.state.name==='En cours'" color="primary" large>mdi-dots-horizontal</v-icon>
    <v-icon v-if="data.state.name==='Abandonner'" color="red" large>mdi-close</v-icon>
    <v-icon v-if="data.state.name==='Terminer'" color="green" large>mdi-check</v-icon>
    <br>
    <div>
      <p>tags :
        <span
          v-for="tags of data.tags"
          :key="tags.id">{{tags.name}}  </span>
      </p>
    </div>
    <p>
      Ouvert par : {{data.userId.name}}
    </p>
    <p>ticket ID: {{data.id}}</p>
  </v-card-text>
</v-card>
    <v-card
      v-for="items of reponse"
      :key="items.id"
    class="reponse">
      <v-card-subtitle>{{items.content}}</v-card-subtitle>
    </v-card>
  </client-only>
  </div>
</div>
</template>

<script>
export default {
  name: "Question",
  data(){
    return{
      data:[],
      loading: true,
      reponse:[],
      test:2,
    }
  },
  async fetch(){
    try {
      this.data = await this.$axios.get('http://thegoodnetwork.fr/index.php/api/posts/' + this.$route.query.id)
      this.data= this.data.data
      this.reponse= this.data.answers
      console.log(this.data, 'les data reçue')
      console.log(this.reponse, 'les réponse')
      this.loading=false
    } catch (error) {
      console.error(error)
    }
  },
  methods:{
    caca(){
      console.log('enculer')
      console.log(this.$route.query.id)
    }
  }

}
</script>

<style scoped>
.reponse{
  margin-top: 5%;
  border-radius: 20%;
}

</style>
