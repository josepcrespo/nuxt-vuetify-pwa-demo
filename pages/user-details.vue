<template>
  <v-row
    align="start"
    justify="center"
  >
    <v-col
      class="mt-3"
      cols="12"
    >
      <v-btn
        @click="$router.go(-1)"
        class="float-left"
        >
        <v-icon left>
          mdi-chevron-left
        </v-icon>
        Back
      </v-btn>
      <v-btn
        v-show="isFavorite(user)"
        @click="removeFavorite(user)"
        class="float-right"
      >
        <v-icon left>
          mdi-heart-minus
        </v-icon>
        Remove from favorites
      </v-btn>
      <v-btn
        class="float-right"
        v-show="!isFavorite(user)"
        @click="addFavorite(user)"
      >
        <v-icon left>
          mdi-heart-plus
        </v-icon>
        Add to favorites
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-card class="mx-auto">
        <v-img :src="user.picture.large" />
        <v-card-title>
          {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
        </v-card-title>
        <v-divider class="mx-4" />
        <v-card-text>
          <div class="subtitle-1">
            <v-icon>
              mdi-email
            </v-icon>
            <a :href="`mailto:${user.email}`">{{ user.email }}</a>
          </div>
          <div class="subtitle-1">
            <v-icon>
              mdi-city
            </v-icon>
            {{ user.location.city }}
          </div>
          <div class="subtitle-1">
            <v-icon>
              mdi-map-marker
            </v-icon>
            {{ user.location.street.name }}
          </div>
          <div class="subtitle-1">
            <v-icon>
              mdi-cellphone
            </v-icon>
            <a :href="`tel:${user.cell}`">{{ user.cell }}</a>
          </div>
          <div class="subtitle-1">
            <v-icon>
              mdi-phone
            </v-icon>
            <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="8"
      class="map-cell"
    >
      <!-- https://maps.google.com/maps?q=-25.0524,-47.2084&z=7&output=embed -->
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        loading="lazy"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        class="v-card v-sheet pa-3"
        :src="getMapSource(user.location.coordinates)"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserDetailsPage',
  async asyncData ({ params }) {
    const user = await params.user
    return { user }
  },
  methods: {
    addFavorite (user) {
      this.$store.commit('favorites/add', user)
    },
    removeFavorite (user) {
      this.$store.commit('favorites/remove', user)
    },
    getMapSource (coordinates) {
      return `https://maps.google.com/maps?q=${coordinates.latitude},` +
             `${coordinates.longitude}&z=4&output=embed`
    },
    isFavorite (user) {
      return this.$store.state.favorites.list.find(
        (favorite) => { return favorite.email === user.email }
      )
    }
  }
}
</script>

<style scoped>
.map-cell {
  height: 80vh;
}
</style>
