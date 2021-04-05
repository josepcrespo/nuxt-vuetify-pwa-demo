<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      fixed
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-select
        v-model="themes.model"
        :full-width="false"
        :items="themes.items"
        :prepend-inner-icon="themes.model.icon"
        :return-object="true"
        background-color="#f5f5f5"
        class="float-right mt-6"
        dense
        solo
        style="max-width: 80px;"
        @change="changeTheme()"
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      menuItems: [
        {
          icon: 'mdi-apps',
          title: 'Users',
          to: '/'
        },
        {
          icon: 'mdi-heart',
          title: 'Local Favorites',
          to: '/favorites'
        },
        {
          icon: 'mdi-hand-heart',
          title: 'Shared Favorites',
          to: '/shared-favorites'
        }
      ],
      selectedMenuItem: null,
      themes: {
        model: {},
        items: [{
          text: 'Light theme',
          value: 'light',
          icon: 'mdi-white-balance-sunny'
        }, {
          text: 'Dark theme',
          value: 'dark',
          icon: 'mdi-weather-night'
        }]
      },
      title: 'Fullstack (Vue.js/Node.js) Developer Demo'
    }
  },
  mounted () {
    if (this.$colorMode.value === 'dark') {
      this.themes.model = {
        text: 'Dark theme',
        value: 'dark',
        icon: 'mdi-weather-night'
      }
    } else {
      this.themes.model = {
        text: 'Light theme',
        value: 'light',
        icon: 'mdi-white-balance-sunny'
      }
    }
  },
  methods: {
    changeTheme () {
      if (this.$colorMode.value === 'dark') {
        this.$colorMode.preference = 'light'
      } else {
        this.$colorMode.preference = 'dark'
      }
    }
  }
}
</script>
