export const state = () => {
  account: null
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
