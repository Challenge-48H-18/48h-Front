<template>
  <div>
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
                      v-model="post.desc"
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
      v-for="item of exo"
      :key="item.id"
      class="carte"
      @click="test"
    >
      <v-card-title :style="title">{{item.title}}</v-card-title>
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
      dialog: false,
      post:{
        title:'',
        desc:'',
        id:'10',
        username: 'Baptiste',
        tags:[]
      },
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
    },
    onPost(){
      this.dialog =false

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
    description: this.post.desc + '\n\n' + tagString ,
    color: '2542600'
  }
  const params = {
    embeds: [myEmbed]
  }

  request.send(JSON.stringify(params));
},
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
