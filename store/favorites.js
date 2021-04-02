export const state = () => ({
  list: []
})

export const mutations = {
  add (state, favorite) {
    state.list.push(favorite)
  },
  remove (state, favorite) {
    state.list = state.list.filter(
      listItem => listItem.email !== favorite.email
    )
  }
}
