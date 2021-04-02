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
            Get new data
          </v-btn>
        </template>
        <span>Discard current data and, get new random data from randomuser.me API</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="usersHeaders"
        :items="$store.state.users.list"
        :loading="users.loading.state"
        :loading-text="users.loading.text"
        elevation="1"
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
        <template v-slot:body.append>
          <tr>
            <td>
              <v-select
                v-model="filters.gender"
                :items="['', 'Male', 'Female']"
                label="Gender"
              />
            </td>
            <td colspan="2" />
            <td>
              <v-text-field
                v-model="filters.nationality"
                type="string"
                title="ISO 3166-1 alpha-2"
                label="Nationality"
              />
            </td>
            <td>
              <v-text-field
                v-model="filters.age"
                type="number"
                label="Age (equal/older)"
              />
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppUsersList',
  data () {
    return {
      filters: {
        age: null,
        gender: '',
        nationality: ''
      },
      users: {
        loading: {
          state: true,
          text: 'Loading favorites... Please wait'
        },
        quantity: 100
      }
    }
  },
  computed: {
    usersHeaders () {
      return [{
        text: 'Gender',
        value: 'gender',
        filter: (value) => {
          if (!this.filters.gender) {
            return true
          } else {
            return value === this.filters.gender.toLowerCase()
          }
        }
      }, {
        text: 'Name',
        value: 'name.first'
      }, {
        text: 'Email',
        value: 'email'
      }, {
        text: 'Nationality',
        value: 'nat',
        filter: (value) => {
          if (!this.filters.nationality) {
            return true
          } else {
            return value === this.filters.nationality.toUpperCase()
          }
        }
      }, {
        text: 'Date of Birth',
        value: 'dob.date',
        filter: (value) => {
          if (!this.filters.age) {
            return true
          } else {
            const diffMs = Date.now() - new Date(value).getTime()
            const ageDate = new Date(diffMs)

            return Math.abs(ageDate.getUTCFullYear() - 1970) >= this.filters.age
          }
        }
      }, {
        text: 'Registration Date',
        value: 'registered.date'
      }, {
        text: 'Details',
        value: 'details',
        sortable: false
      }]
    }
  },
  created () {
    if (this.$store.state.users.list.length) {
      this.users.loading.state = false
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
        this.users.loading.state = false
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('Something went wrong: %o', error)
      })
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}

th:nth-of-type(5),
th:nth-of-type(6) {
  min-width: 170px;
}

th:nth-of-type(7) {
  width: 70px;
}
</style>
