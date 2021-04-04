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
        v-model="shareListDialog"
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
              v-model="sharedListName"
              clearable
              class="mx-6"
              counter
              label="Shared List Name"
              maxlength="255"
              :rules="sharedListNameValidations"
            />
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="shareListDialog = false;
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
        }
      },
      sharedListName: '',
      sharedListNameValidations: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        value => (value || '').length <= 255 || 'Max 255 characters'
      ],
      shareListDialog: false
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
        // Initialize our Feathers client.
        const feathersClient = window.feathers()
        // Create the list on the service.
        const favService = feathersClient.service('favorites')
        favService.create({
          listName: this.sharedListName,
          favorites: this.favoritesList
        })
      }
    }
  }
}
</script>
