import axios from "~/plugins/axios";

export function getAccount(accountId) {
    return new Promise((resolve, reject) => {
        axios.get(`accounts/${accountId}`)
          .then(resolve)
          .catch(reject);
    });
}

export function getTransactions(accountId) {
    return new Promise((resolve, reject) => {
        axios.get(`accounts/${accountId}/transactions`)
          .then(resolve)
          .catch(reject);
    });
}

export function makeTransaction(accountId, to, amount, details) {
    return new Promise((resolve, reject) => {
         axios
          .post(`accounts/${accountId}/transactions`, {
            to: parseInt(to),
            amount: parseFloat(amount),
            details: details,
          })
          .then(resolve)
          .catch(reject);
    });
}
