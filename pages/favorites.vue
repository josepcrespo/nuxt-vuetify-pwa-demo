<template>
  <v-row
    align="start"
    justify="center"
  >
    <v-col
      v-if="favoritesList.length"
      cols="12"
    >
      <download-csv
        :data="getFavoritesForCsvFile()"
        name="favorite-users.csv"
        class="float-right mt-3 ml-4"
      >
        <v-btn>
          <v-icon left>
            mdi-download
          </v-icon>
          Download CSV file
        </v-btn>
      </download-csv>
      <v-dialog
        v-model="shareList.dialog"
        max-width="480"
        @click:outside="$refs.form.resetValidation()"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="float-right mt-3"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>
              mdi-cloud-upload
            </v-icon>
            Share List
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Choose a title and, share it!
          </v-card-title>
          <v-card-text>
            Write an appropriate and unique title to share your list of favorite users with the world.
          </v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="sharedListName.value"
              clearable
              class="mx-6"
              counter
              label="Shared List Name"
              maxlength="255"
              :rules="sharedListName.validations"
            />
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="shareList.dialog = false;
                      $refs.form.resetValidation()"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="submitList()"
            >
              Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="shareList.snackbar.model"
        :color="shareList.snackbar.color"
        :multi-line="true"
      >
        {{ shareList.snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="shareList.snackbar.model = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
            Back to the users list
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
          state: true,
          text: 'Loading favorite users… please wait'
        },
        sending: {
          state: false
        }
      },
      sharedListName: {
        value: '',
        validations: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
          value => (value || '').length <= 255 || 'Max 255 characters'
        ]
      },
      shareList: {
        dialog: false,
        snackbar: {
          color: '',
          model: false,
          text: ''
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
    },
    submitList () {
      if (this.$refs.form.validate()) {
        this.favorites.sending.state = true
        this.$axios.$post(
          `${process.env.favoritesApiBaseUrl}/favorites`, {
            listName: this.sharedListName.value,
            favorites: this.favoritesList
          }
        ).then((response) => {
          this.shareList.snackbar.color = 'green lighten-2'
          this.shareList.snackbar.text = 'Your list of favorite users has been shared!'
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.warn('Something went wrong: %o', error)
          this.shareList.snackbar.color = 'red lighten-2'
          this.shareList.snackbar.text =
            `Error: ${error.message}. 
            ${error.response.data.errors.map(e => e.message).join('. ')}`
        }).finally(() => {
          this.shareList.snackbar.model = true
          this.favorites.sending.state = false
        })
      }
    }
  }
}
</script>
