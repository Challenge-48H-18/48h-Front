<template>
    <div>
      <div class="dialog">
  </div>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@600&display=swap" rel="stylesheet">
      <v-card
        v-for="item of data"
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
    name: 'ticket',
    data(){
      return{
        dialog: false,
        data:[],
        datasave:[],
        post:{
          title:'',
          content:'',
          tags:[],
          userId:'/index.php/api/users/122',
          crateAt: new Date(),
          slug:'LINK',
        },
        exo: [
          {title: 'COCORICO', subtitle: 'sont t\'il bon pour vous?', state:'En cour', id:1},
          {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'Valider', id:2},
          {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'Annuler', id:3},
          {title: 'les chocolat', subtitle: 'sont t\'il bon pour vous?', state:'En cour', id:4},
        ],
        chips: [],
        items: ['Dev', 'System', 'Reseaux', 'Cyber', 'IOT', 'Général'],
      }
    },
    async fetch(){
      // await store.dispatch('fetchData', $axios)
      try {
        await this.$axios.get('http://thegoodnetwork.fr/index.php/api/posts').then(response => {
          const hydraMember = response.data['hydra:member'];

          const test = hydraMember.filter(item => {
            return item.state.name === 'Terminer' || item.state.name === 'Abandonner'
          })

          this.data = test
          this.datasave = test

          console.log(hydraMember, 'hydramember');
        })
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    methods:{
      onSelectionChange(){
      console.log(this.chips)
      this.data = this.datasave
      if (this.chips.length > 0){
        this.data = this.data.filter(item => {
          return this.chips.every(tag => item.tags.some(itemTag => itemTag.name === tag))
        })
      }
      },
      remove (item) {
        console.log(this.chips)
        this.chips.splice(this.chips.indexOf(item), 1)
        },
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
      description: this.post.content + '\n\n' + tagString ,
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
  