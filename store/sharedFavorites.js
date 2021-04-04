export const state = () => ({
  list: []
})

export const mutations = {
  set (state, favoritesLists) {
    state.list = favoritesLists
  }
}
