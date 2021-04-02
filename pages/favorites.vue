<template>
  <v-row
    align="start"
    justify="center"
  >
    <v-col
      class="mt-3"
      sm="6"
      v-if="favoritesList.length"
    >
      <v-btn @click="$router.go(-1)">
        <v-icon left>
          mdi-chevron-left
        </v-icon>
        Back
      </v-btn>
    </v-col>
    <v-col
      class="mt-3"
      sm="6"
      v-if="favoritesList.length"
    >
      <v-btn
        class="float-right"
      >
        <v-icon left>
          mdi-download
        </v-icon>
        Download CSV file
      </v-btn>
    </v-col>
    <v-col
      cols="12"
    >
      <v-data-table
        :headers="favorites.headers"
        :items="favoritesList"
        :loading="favorites.loading.state"
        :loading-text="favorites.loading.text"
        elevation="1"
        v-if="favoritesList.length"
      >
        <template v-slot:item.dob.date="{ item }">
          {{ new Date(item.dob.date).toDateString() }}
        </template>
        <template v-slot:item.registered.date="{ item }">
          {{ new Date(item.registered.date).toDateString() }}
        </template>
        <template v-slot:item.details="{ item }">
          <nuxt-link :to="{ name: 'user-details', params: { user: item }}">
            <v-icon>
              mdi-account-details
            </v-icon>
          </nuxt-link>
        </template>
      </v-data-table>
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
  name: 'AppFavoritesList',
  data () {
    return {
      favorites: {
        headers: [{
          text: 'Gender',
          value: 'gender'
        }, {
          text: 'Name',
          value: 'name.first'
        }, {
          text: 'Email',
          value: 'email'
        }, {
          text: 'Nationality',
          value: 'nat'
        }, {
          text: 'Date of Birth',
          value: 'dob.date'
        }, {
          text: 'Registration Date',
          value: 'registered.date'
        }, {
          text: 'Details',
          value: 'details',
          sortable: false
        }],
        loading: {
          state: true,
          text: 'Loading favorites... Please wait'
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
  }
}
</script>
