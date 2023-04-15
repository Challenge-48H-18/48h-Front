<template>
  <div align="center">
    <span>work in progress</span>
    <h3 v-if="!rat">vous avez {{user.point}} point</h3>
    <h3 v-if="rat">vous avez plus de point</h3>

    <v-card v-for="items of shopdata" :key="items.id" class="shopclass" @click="buy(items) ">
      <v-card-title>
        {{items.title}}
      </v-card-title>
      <v-card-text>{{items.desc}}</v-card-text>
    </v-card>

  </div>
</template>

<script>
export default {
  name: "Shop",
  data(){
    return{
      user:{
        point:1250,
        userId: '45',
        username: 'Baptiste',
      },
      rat:false,
      shopdata:[
        {
          id:0,
          title: 'Cigarette',
          desc: 'vous pouvez vous offrir un paquet pour 250points',
          price: 250
        },
        {
          id:1,
          title: 'Bière 33cl',
          desc: 'vous pouvez vous offrir une bière pour 150points',
          price: 150
        },
        {
          id:2,
          title: 'Pizza 250g',
          desc: 'vous pouvez vous offrir une pizza pour 100points',
          price: 100
        },
        {
          id:3,
          title: 'Riz 200g Poulet 550g',
          desc: 'vous pouvez vous offrir un repas pdm pour 50points',
          price: 50
        },
        {
          id:4,
          title: 'riz 350g thon 120g',
          desc: 'vous pouvez vous offrir un repas pdm pour 75points',
          price: 75
        }
      ]
    }
  },
  methods:{
    buy(items){
      if (this.user.point <= 0){
        this.rat=true
      }else {
        this.user.point -= items.price
      }

    }
  }
}
</script>

<style scoped>

.shopclass{
  border-radius: 25px;
  margin-top: 5%;
  width: 50%;
}

</style>
