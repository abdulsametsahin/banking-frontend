export default function ({store, redirect}) {
    try {
        const account = JSON.parse(localStorage.getItem('account'));
        if (!account) {
          throw new Error("auth_error");
        }
        store.commit("login", account);
    } catch (e) {
        return redirect('/');
    }
}
