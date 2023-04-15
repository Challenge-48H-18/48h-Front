<template>
  <div>
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
      @click="test(item)"
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
    <v-pagination v-model="currentPage" :length="numPages"></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Archive',
  data(){
    return{
      dialog: false,
      data:[],
      datasave:[],
      currentPage: 1,
      itemsPerPage: 7,
      searchText: '',
      selectedFilters: [],
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
        const state = ["terminer", "abandonner"]
        const filteredData = this.data.filter(item => state.some(s => item.state.name.toLowerCase().includes(s)));
        filteredData.sort((a, b) => a.state.name.localeCompare(b.state.name));
        this.data= filteredData
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
    test(item){
      this.$router.push({path: '/question', query: { id: item.id }})
    },
    sendMessage() {
      const request = new XMLHttpRequest();
      request.open("POST", "https://discordapp.com/api/webhooks/1096438463085162536/r3nKYbNgzhVhVNQDCBvZfRqkw5coh0E6Gw0zkerBgGfT9DFMKkXKuJWyL8jnxBrTKRU1");
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
  },
}
</script>

<style>

.carte{
  margin-bottom: 20px;
  border-radius: 50%;
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
