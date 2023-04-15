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
              <span class="text-h5">Ouvrir un ticket</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.title"
                      :rules="[() => !!post.title || 'Ce Champ dois être remplie']"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="post.content"
                      :rules="[() => !!post.title || 'Ce Champ dois être remplie']"
                      label="Description du problème "
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      v-model="posttag"
                      :rules="[() => !!post.title || 'Ce Champ dois être remplie']"
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
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                :disabled="post.title==='' || post.content==='' || posttag.length===0 "
                text
                @click="onPost"
              >
                Poster
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div align="center">
      <div >
        <v-text-field
          v-model="searchText"
          filled
          rounded
          dense
          class="recherche"
          label="Search"
          @input="onFilter" />
      </div>
      <div class="filtre">
        <v-card-text class="centered">
          <v-chip-group
            v-model="selectedFilters"
            column
            multiple
            @change="onFilter"
          >
            <v-chip
              filter
              outlined
              value="Dev"
            >
              Dev
            </v-chip>
            <v-chip
              filter
              outlined
              value="System"
            >
              System
            </v-chip>
            <v-chip
              filter
              outlined
              value="Reseaux"
            >
              Reseaux
            </v-chip>
            <v-chip
              filter
              outlined
              value="Cyber"
            >
              Cyber
            </v-chip>
            <v-chip
              filter
              outlined
              value="IOT"
            >
              IOT
            </v-chip>
            <v-chip
              filter
              outlined
              value="Général"
            >
              Général
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </div>
    </div>
    <v-card
      v-for="item of paginatedItems"
      :key="item.id"
      class="carte"
      @click="rootQuestion(item)"
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
    <v-pagination v-model="currentPage" :total-visible="7" :length="numPages"></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'InspirePage',
  data(){
    return{
      dialog: false,
      data:[],
      datasave:[],
      posttag:[],
      currentPage: 1,
      itemsPerPage: 7,
      searchText: '',
      selectedFilters: [],
      username:'Baptiste',
      postId:0,
      post:{
        title:'',
        content:'',
        state:'/index.php/api/states/En%20cours',
        tags:[],
        userId:'/index.php/api/users/422',
        slug:'LINK',
      },
    }
  },
  async fetch(){
    try {
      await this.$axios.get('http://thegoodnetwork.fr/index.php/api/posts').then(response => {
        this.data = response.data['hydra:member'];
        this.data = this.data.filter(item => item.state.name.toLowerCase().includes("en cours"));
        this.datasave = this.data
      })
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.data.slice(startIndex, endIndex);
    },
    numPages() {
      if (this.data.length > 10) {
        return Math.ceil(this.data.length / this.itemsPerPage);
      }
      return 0;
    }
  },
  methods:{
    onFilter(){
      this.currentPage=1
      this.data = this.datasave
      if (this.searchText.length > 0){
        this.data = this.data.filter(post => {
          return post.title.toLowerCase().includes(this.searchText.toLowerCase())
        });
      }
      if (this.selectedFilters.length > 0){
        this.data = this.data.filter(post => {
          return post.tags.some(tag => this.selectedFilters.includes(tag.name))
        });
      }
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.data = this.datasave
      this.data = this.data.filter(post => {
        return post.tags.some(tag => this.chips.includes(tag.name))
      });
    },
    rootQuestion(item){
      this.$router.push({path: '/question', query: { id: item.id }})
    },
   async onPost(){
      this.dialog =false

      this.format()
      let valTemp =0
      await this.$axios.post('http://thegoodnetwork.fr/index.php/api/posts', this.post )
        .then(function (response) {
          valTemp = response.data.id
        })
        .catch(function (error) {
          console.error(error);
        });
      this.postId = valTemp

     this.sendMessage()
      this.post.tags = []

     setTimeout(()=>{
       location.reload();
     },1000)

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
  request.open("POST", "https://discordapp.com/api/webhooks/1096438463085162536/r3nKYbNgzhVhVNQDCBvZfRqkw5coh0E6Gw0zkerBgGfT9DFMKkXKuJWyL8jnxBrTKRU1");
  request.setRequestHeader('Content-type', 'application/json');

      const tags=[]
      for (const item of this.posttag){
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
  const localUrl= 'http://localhost:3000/question?id=' + this.postId
  const myEmbed = {
    title: this.post.title,
    author:{
      name: 'Ouvert par : ' + this.username + '\n'
    },
    description: this.post.content + '\n\n' + tagString,
    fields: [
      {
        name: 'Cliquez ici pour voir le ticket',
        value: `[Lien du ticket](${localUrl})`
      }
    ],
    color: 4324192
  }
  const params = {
    embeds: [myEmbed]
  }

    request.send(JSON.stringify(params));

  },
    format(){

      this.post.tags= this.posttag.map(key=>{
        return `/index.php/api/tags/${key}`
      })

    }
  },
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
.recherche{
  border-radius: 15px;
  width: 50%;
  color: red;
}
.filtre{
  margin-top: -40px;
}
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
