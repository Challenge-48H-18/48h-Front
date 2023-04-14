<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      app
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
          router
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app fixed>
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
  <v-btn class="ml-auto" icon @click.stop="rightDrawer = !rightDrawer">
    <v-icon>mdi-account</v-icon>
  </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" fixed temporary>
      <v-list>
        <v-img
          :aspect-ratio="16/9"
          align="center"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-avatar
            color="primary"
            size="56"
          ><img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-avatar>
          <h1>{{user.name}}</h1>
          <span>{{user.lvl}}</span>
        </v-img>

        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-card-text>
            <h2 class="text-h6 mb-2">
              Choisisez vos Compétance
            </h2>

            <v-chip-group
              column
              multiple
            >
              <v-chip
                filter
                outlined
              >
                Dev Mobile
              </v-chip>
              <v-chip
                filter
                outlined
              >
                Front-end
              </v-chip>
              <v-chip
                filter
                outlined
              >
                Back-end
              </v-chip>
              <v-chip
                filter
                outlined
              >
                Dev Web
              </v-chip>
              <v-chip
                filter
                outlined
              >
                Cyber Sécurité
              </v-chip>
              <v-chip
                filter
                outlined
              >
                Dev ops
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>



          <v-btn @click="onSwitchTheme">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>

      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      user:{
        name: 'Baptiste',
        id:'456qd864dqs5',
        role: 'Admin',
        lvl: 'Niveau 5',
        tags: ['Dev Web', 'Dev Mobile']
      },
      items: [
        {
          icon: 'mdi-ticket',
          title: 'Accueil Ticket',
          to: '/',
        },
        {
          icon: 'mdi-shopping',
          title: 'Boutique',
          to: '/shop',
        },
        {
          icon: '',
          title: 'Ticket resolu',
          to: '/finish',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods:{
    onSwitchTheme(){
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
    }
  }
}
</script>

<style>
</style>
