export const state = () => ({
    account: {}
})

export const mutations = {
  login(state, account) {
    state.account = account;
    localStorage.setItem('account', JSON.stringify(account));
  },
  updateBalance(state, balance) {
    state.account.balance = balance;
  },
  logout(state) {
    state.account = null;
    localStorage.removeItem('account');
  },
}
