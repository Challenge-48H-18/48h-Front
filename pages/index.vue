<template>
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@600&display=swap" rel="stylesheet">
    <v-card
      v-for="item of exo"
      :key="item.id"
      class="carte"
      @click="test"
    >
      <v-card-title style="title">{{item.title}}</v-card-title>
      <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
      <v-card-text>
        {{item.state}}
        <v-icon v-if="item.state==='En cour'" color="primary" large>mdi-dots-horizontal</v-icon>
        <v-icon v-if="item.state==='Annuler'" color="red" large>mdi-close</v-icon>
        <v-icon v-if="item.state==='Valider'" color="green" large>mdi-check</v-icon>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'InspirePage',
  data(){
    return{
      exo: [
        {title: 'COCORICO', subtitle: 'sont t\'il bon pour vous?', state:'En cour', id:1},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'Valider', id:2},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'Annuler', id:3},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'En cour', id:4},
      ]
    }
  },
  methods:{
    test(){
      this.$router.push({path: '/question'})
    }
  }
}
</script>

<style>


.title{
  font-family: 'Montserrat Alternates', sans-serif;
}

.carte{
  margin-bottom: 20px;
  border-radius: 50%;
}


</style>
