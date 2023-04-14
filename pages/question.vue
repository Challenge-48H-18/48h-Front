<template>
<div>
  <div v-if="loading"><spa>loading</spa></div>
  <div v-if="!loading">
  <client-only>
<v-card>
  <v-btn  v-if="test ===2" @click="caca">
    <v-icon color="red">mdi-close</v-icon>
  </v-btn>
  <p>
    Ouvert par : {{data.userId.name}}
  </p>
  <v-card-title>
    {{data.title}}
  </v-card-title>
  <v-card-subtitle>{{data.content}}</v-card-subtitle>
  <v-card-text>

    <br>
    <div>
      <p>tags :
        <span
          v-for="tags of data.tags"
          :key="tags.id">{{tags.name}}  </span>
      </p>
    </div>
    {{data.state.name}}
    <v-icon v-if="data.state.name==='En cours'" color="primary" large>mdi-dots-horizontal</v-icon>
    <v-icon v-if="data.state.name==='Abandonner'" color="red" large>mdi-close</v-icon>
    <v-icon v-if="data.state.name==='Terminer'" color="green" large>mdi-check</v-icon>
  </v-card-text>
  <p>Crée le : {{data.cratedAt}}</p>
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
      console.log(this.data, this.reponse, 'data et réponse')
      this.loading=false
    } catch (error) {
      console.error(error)
    }
  },
  methods:{
    caca(){

    }
  }

}
</script>

<style scoped>
.reponse{
  margin-top: 5%;
  border-radius: 25px;
}

</style>
