<template>
  <v-row
    align="start"
    justify="center"
  >
    <v-col
      v-if="sharedFavoritesLists.length"
      cols="1"
      class="mt-3"
      align="right"
      justify="center"
      style="line-height: 40px;"
    >
      Lists
    </v-col>
    <v-col
      v-if="sharedFavoritesLists.length"
      cols="11"
      class="mt-3 shared-lists"
      style="height: 72px;"
    >
      <v-select
        v-model="sharedFavorites.current"
        class="float-right"
        :items="sharedFavoritesLists"
        item-text="listName"
        item-value="favorites"
        :full-width="true"
        solo
        dense
        style="width: 100%;"
      />
    </v-col>
    <v-col cols="12">
      <users-data-table
        v-if="sharedFavoritesLists.length"
        :loading-state="sharedFavorites.loading.state"
        :loading-text="sharedFavorites.loading.text"
        :users-list="sharedFavorites.current"
      />
      <v-banner v-else>
        <v-icon
          slot="icon"
          color="warning"
          size="36"
        >
          mdi-warning
        </v-icon>
        There are no shared favorite user lists at this time.
        <template v-slot:actions>
          <v-btn
            color="primary"
            to="/"
          >
            Back to the users list
          </v-btn>
        </template>
      </v-banner>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SharedFavoritesListPage',
  data () {
    return {
      sharedFavorites: {
        loading: {
          state: true,
          text: 'Loading shared favorite users lists… please wait'
        },
        current: []
      }
    }
  },
  computed: {
    sharedFavoritesLists () {
      return this.$store.state.sharedFavorites.list
    }
  },
  created () {
    this.getSharedFavorites()
  },
  methods: {
    getSharedFavorites () {
      this.$axios.$get(
        `${process.env.favoritesApiBaseUrl}/favorites`
      ).then((response) => {
        this.$store.commit('sharedFavorites/set', response.data)
        this.setSharedFavoritesListModel()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('Something went wrong: %o', error)
      }).finally(() => {
        this.sharedFavorites.loading.state = false
      })
    },
    setSharedFavoritesListModel () {
      this.sharedFavorites.current =
        this.sharedFavoritesLists.length
          ? this.sharedFavoritesLists[0].favorites
          : []
    }
  }
}
</script>
