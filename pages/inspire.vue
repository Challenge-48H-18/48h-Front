<template>
  <div>
    <v-card v-for="item of exo">
      <v-card-title>{{item.title}}</v-card-title>
      <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
      <v-card-text>{{item.text}}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'InspirePage',
  data(){
    return{
      exo: [
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', text:'d\'après plusieurs etudes blablabla'},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', text:'d\'après plusieurs etudes blablabla'},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', text:'d\'après plusieurs etudes blablabla'},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', text:'d\'après plusieurs etudes blablabla'}
      ]
    }
  }
}
</script>
