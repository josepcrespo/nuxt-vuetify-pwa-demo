export const state = () => ({
  list: []
})

export const mutations = {
  set (state, users) {
    state.list = users
  }
}
