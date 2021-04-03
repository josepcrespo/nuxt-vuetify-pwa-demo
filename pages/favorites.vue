<template>
  <v-row
    align="start"
    justify="center"
  >
    <v-col
      v-if="favoritesList.length"
      class="mt-3"
      cols="12"
    >
      <download-csv
        :data="getFavoritesForCsvFile()"
        name="favorite-users.csv"
        class="float-right"
      >
        <v-btn>
          <v-icon left>
            mdi-download
          </v-icon>
          Download CSV file
        </v-btn>
      </download-csv>
    </v-col>
    <v-col cols="12">
      <users-data-table
        v-if="favoritesList.length"
        :loading-state="favorites.loading.state"
        :loading-text="favorites.loading.text"
        :users-list="favoritesList"
      />
      <v-banner v-else>
        <v-icon
          slot="icon"
          color="warning"
          size="36"
        >
          mdi-warning
        </v-icon>
        The favorites list is empty at this moment.
        <template v-slot:actions>
          <v-btn
            color="primary"
            to="/"
          >
            Back to users list
          </v-btn>
        </template>
      </v-banner>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FavoritesListPage',
  data () {
    return {
      favorites: {
        loading: {
          state: false,
          text: 'Loading favorite users… please wait'
        }
      }
    }
  },
  computed: {
    favoritesList () {
      return this.$store.state.favorites.list
    }
  },
  mounted () {
    this.favorites.loading.state = false
  },
  methods: {
    getFavoritesForCsvFile () {
      return this.favoritesList.map((fav) => {
        return {
          /* eslint-disable indent */
                   Gender: fav.gender,
                     Name: fav.name.first,
                    Email: fav.email,
              Nationality: fav.nat,
          'Date of Birth': new Date(fav.dob.date).toISOString().slice(0, 10),
          'Registry Date': new Date(fav.registered.date).toISOString().slice(0, 10)
          /* eslint-enable indent */
        }
      })
    }
  }
}
</script>
