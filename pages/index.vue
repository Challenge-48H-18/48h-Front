<template>
  <div>
    <v-text-field v-model="search" label="rechercher"></v-text-field>
    <div class="dialog">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          max-width="600px"
          persistent
        >
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Ouvrir ticket
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">Crée un ticket</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.title"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="post.content"
                      label="Description du problème "
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      v-model="post.tags"
                      :items="['Dev', 'System', 'Reseaux', 'Cyber', 'IOT', 'Général']"
                      label="Tags"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="cancelPost"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="onPost"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@600&display=swap" rel="stylesheet">
    <v-card
      v-for="item of filteredItems"
      :key="item.id"
      class="carte"
      @click="test"
    >
      <v-card-title >{{item.title}}</v-card-title>
      <v-card-subtitle>{{item.content}}</v-card-subtitle>
      <v-card-text>
        {{item.state.name}}
        <v-icon v-if="item.state.name==='En cours'" color="primary" large>mdi-dots-horizontal</v-icon>
        <v-icon v-if="item.state.name==='Abandonner'" color="red" large>mdi-close</v-icon>
        <v-icon v-if="item.state.name==='Terminer'" color="green" large>mdi-check</v-icon>
        <br>
        <div>
          <p>tags :
            <span
              v-for="tags of item.tags"
              :key="tags.id">{{tags.name}}  </span>
          </p>
        </div>
        <p>
          Ouvert par : {{item.userId.name}}
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'InspirePage',
  data(){
    return{
      dialog: false,
      data:[],
      enCour:'En cours',
      search:'',
      post:{
        title:'',
        content:'',
        state:'/index.php/api/states/En%20cours',
        tags:[],
        userId:'/index.php/api/users/422',
        slug:'LINK',
      },
      exo: [
        {title: 'COCORICO', subtitle: 'sont t\'il bon pour vous?', state:'En cour', id:1},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'Valider', id:2},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'Annuler', id:3},
        {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'En cour', id:4},
      ]
    }
  },
  async fetch(){
    // await store.dispatch('fetchData', $axios)
    try {
      await this.$axios.get('http://thegoodnetwork.fr/index.php/api/posts').then(response => {
        const hydraMember = response.data['hydra:member'];
        this.data = hydraMember
        console.log(hydraMember, 'hydramember');
        console.log(this.data[1].state.name, "state")

        const filteredData = this.data.filter(item => item.state.name.toLowerCase().includes('En Cours'));
        filteredData.sort((a, b) => a.state.name.localeCompare(b.state.name));
        this.data= filteredData
        console.log(filteredData, 'data filtrer')
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  },

  computed:{
    filteredItems() {
      const filteredData = this.data.filter(item => item.title.toLowerCase().includes(this.search.toLowerCase()));
      filteredData.sort((a, b) => a.title.localeCompare(b.title));
      return filteredData;
    }
  },
  mounted() {

  },
  methods:{
    test(){
      this.$router.push({path: '/question'})
    },
    onPost(){
      this.dialog =false
      this.format()
      console.log(this.post)
      this.$axios.post('http://thegoodnetwork.fr/index.php/api/posts', this.post )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    this.sendMessage()
    },
    cancelPost(){
      this.dialog = false
      this.post={
        title:'',
        desc:'',
        tags:[]
      }
    },

    sendMessage() {
  const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1095989356629594142/RF1aFmH18gYqNwELvmCIg5AHCTePAYj6CnV0T-cpwWgnQq2kOAfLvPqTnMxe5sEaSxC-");
  request.setRequestHeader('Content-type', 'application/json');

      const tags=[]
      for (const item of this.post.tags){
        switch (item) {
          case "Dev":
            tags.push("<@&1096093160318439454>")
            break;
          case "System":
            tags.push("<@&1096093290509643776>")
            break;
          case "Reseaux":
            tags.push("<@&1096093303147073668>")
            break;
          case "Cyber":
            tags.push("<@&1096093402279465032>")
            break;
          case "IOT":
            tags.push("<@&1096093446386765884>")
            break;
          case "Général":
            tags.push("<@&1096093503735484477>")
            break;
        }
      }

  const tagString = tags.join(' ')
  const myEmbed = {
    title: this.post.title,
    author:{
      name: this.post.username + '\n' + ' TicketID : ' + this.post.id
    },
    description: this.post.content + '\n\n' + tagString ,
    color: '2542600'
  }
  const params = {
    embeds: [myEmbed]
  }

    request.send(JSON.stringify(params));

  },
    format(){

      this.post.tags= this.post.tags.map(key=>{
        return `/index.php/api/tags/${key}`
      })

    }
  }
}
</script>

<style>

.carte{
  margin-bottom: 20px;
  border-radius: 50%;
}
.dialog{
  margin-bottom: 5%;
  margin-top: 5%;
}


</style>
