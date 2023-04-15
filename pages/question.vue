<template>
<div>
  <div v-if="loading"><span>loading</span></div>
  <div v-if="!loading">
  <client-only>
<v-card>
  <div style="display: flex; justify-content: space-between;">
    <p>
      Ouvert par : {{data.userId.name}}
    </p>
    <v-btn v-if="test === 2 && data.state.name ==='En cours'" @click="giveUp">
      <v-icon color="red">mdi-close</v-icon>
    </v-btn>
    <v-btn v-if="test === 2 && data.state.name ==='Abandonner'" @click="reloadticket">
      <v-icon color="blue">mdi-reload</v-icon>
    </v-btn>
  </div>

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
  <p>Crée le : {{date}}</p>
</v-card>
    <v-card v-if="data.state.name === 'En cours'">
      <v-card-title>Répondre :</v-card-title>
      <v-card-text>
        <v-textarea v-model="userReponse.content" class="reponse_area" clearable outlined></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="userReponse.content===''" @click="sendReponse" >Envoyer</v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      v-for="items of reponse"
      :key="items.id"
    class="reponse"
    >  <div style="display: flex; justify-content: space-between;">
      <v-card-title>réponse crée par : {{items.userID.name}}</v-card-title>
      <v-btn v-if="test === 2 && data.state.name ==='En cours'" @click="validate">
        <v-icon color="green">mdi-check</v-icon>
      </v-btn>
    </div>
      <p>crée le : {{ reponseDate(items.createdAt) }}</p>
      <v-card-subtitle>{{items.content}}</v-card-subtitle>
    </v-card>
  </client-only>
  </div>
</div>
</template>

<script>
import moment, {isMoment} from "moment/moment";

export default {
  name: "Question",
  data(){
    return{
      data:[],
      date:'',
      loading: true,
      reponse:[],
      test:2,
      userReponse:{
        post:'/index.php/api/posts/',
        content:'',
        userID:'/index.php/api/users/422'
      }
    }
  },
  async fetch(){
    try {
      this.data = await this.$axios.get('http://thegoodnetwork.fr/index.php/api/posts/' + this.$route.query.id)
      this.data= this.data.data
      this.reponse= this.data.answers
      this.date=moment(this.data.cratedAt).format('\'DD/MM/YYYY HH:mm:ss\'')
      this.userReponse.post = (this.userReponse.post + this.data.id)
      this.loading=false
    } catch (error) {
      console.error(error)
    }
  },
  methods:{
    isMoment,
   async giveUp(){
     await this.$axios.put('http://thegoodnetwork.fr/index.php/api/posts/' + this.data.id, {state: '/index.php/api/states/Abandonner'} )
       .then(function (response) {
         setTimeout(()=>{
           location.reload();
         },1000)
       })
       .catch(function (error) {
         console.error(error);
       });
    },
    async validate(){
      await this.$axios.put('http://thegoodnetwork.fr/index.php/api/posts/' + this.data.id, {state: '/index.php/api/states/Terminer'} )
        .then(function (response) {
          setTimeout(()=>{
            location.reload();
          },1000)
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async reloadticket(){
      await this.$axios.put('http://thegoodnetwork.fr/index.php/api/posts/' + this.data.id, {state: '/index.php/api/states/En%20cours'} )
        .then(function (response) {
          setTimeout(()=>{
            location.reload();
          },1000)
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    reponseDate(item){
      return moment(item).format('\'DD/MM/YYYY HH:mm:ss\'')

    },
    async sendReponse(){
      await this.$axios.post('http://thegoodnetwork.fr/index.php/api/answers', this.userReponse )
        .then(function (response) {

        })
        .catch(function (error) {
          console.error(error);
        });

      setTimeout(()=>{
        location.reload();
      },1000)
    }
  }

}
</script>

<style scoped>
.reponse{
  margin-top: 5%;
  border-radius: 25px;
}
.reponse_area{
  width: 98%;
}

</style>
