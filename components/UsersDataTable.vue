<template>
  <client-only><!-- https://github.com/vuetifyjs/vuetify/issues/9624#issuecomment-574555018 -->
    <v-data-table
      :headers="headers"
      :items="usersList"
      :loading-state="loadingState"
      :loading-text="loadingText"
      class="elevation-1"
    >
      <template v-slot:item.dob.date="{ item }">
        {{ new Date(item.dob.date).toDateString() }}
      </template>
      <template v-slot:item.registered.date="{ item }">
        {{ new Date(item.registered.date).toDateString() }}
      </template>
      <template v-slot:item.details="{ item }">
        <v-btn
          :to="{ name: 'user-details', params: { user: item }}"
          icon
          nuxt
        >
          <v-icon>
            mdi-account-details
          </v-icon>
        </v-btn>
      </template>
      <template
        v-if="withFilters"
        v-slot:body.append
      >
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
  </client-only>
</template>

<script>
export default {
  name: 'UsersDataTableComponent',
  props: {
    loadingState: {
      required: true,
      type: Boolean
    },
    loadingText: {
      default: 'Loading users… please wait',
      required: false,
      type: String
    },
    usersList: {
      default: () => [],
      required: true,
      type: Array
    },
    withFilters: {
      default: false,
      required: false,
      type: Boolean
    }
  },
  data () {
    return {
      filters: {
        age: null,
        gender: '',
        nationality: ''
      }
    }
  },
  computed: {
    headers () {
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
  }
}
</script>

<style>
th:nth-of-type(5),
th:nth-of-type(6) {
  min-width: 165px;
}

th:nth-of-type(7) {
  width: 70px;
}
</style>
