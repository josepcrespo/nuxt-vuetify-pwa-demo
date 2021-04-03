<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-3 float-right"
            v-bind="attrs"
            v-on="on"
            @click="getUsers(users.quantity)"
          >
            <v-icon left>
              mdi-database-refresh
            </v-icon>
            Get new users
          </v-btn>
        </template>
        <span>Discard current users and, get new random users from randomuser.me API</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12">
      <users-data-table
        :loading-state="users.loading"
        :users-list="usersList"
        :with-filters="true"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UsersListPage',
  data () {
    return {
      users: {
        loading: false,
        quantity: 100
      }
    }
  },
  computed: {
    usersList () {
      return this.$store.state.users.list
    }
  },
  mounted () {
    if (this.usersList.length) {
      this.users.loading = false
    } else {
      this.getUsers(this.users.quantity)
    }
  },
  methods: {
    getUsers (numOfUsers) {
      const userFieldsWanted = [
        'gender', 'name', 'location', 'email', 'registered',
        'dob', 'phone', 'cell', 'picture', 'nat'
      ]
      this.$axios.$get(
        this.$axios.defaults.baseURL, {
          params: {
            results: numOfUsers,
            inc: userFieldsWanted.join()
          }
        }
      ).then((response) => {
        this.$store.commit('users/set', response.results)
        this.users.loading = false
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('Something went wrong: %o', error)
      })
    }
  }
}
</script>
