export const state = () => {
  account: {}
}

export const mutations = {
  login(state, account) {
    state.account = account;
    localStorage.setItem('account', JSON.stringify(account));
  },
  logout(state) {
    state.account = null;
    localStorage.removeItem('account');
  },
}

export const getters = {
  getAccount(state) {
    return state.account;
  }
}
