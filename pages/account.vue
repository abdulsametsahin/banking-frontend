<template>
  <div id="account">
    <div v-if="account">
      <Header/>

      <div class="container">
        <div class="d-flex justify-content-center w-100 mt-5">
          <div class="col-md-12">
            <TransactionForm
                v-on:transactionIsSuccessful="transactionIsSuccessful"
                v-on:transactionIsFailed="transactionIsFailed"
            ></TransactionForm>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center w-100 mt-5">
        <div class="col-md-12">
          <TransactionsTable :transactions="transactions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAccount, getTransactions} from "~/services/account";
import Header from "~/components/Header";
import TransactionForm from "~/components/TransactionForm";
import TransactionsTable from "~/components/TransactionsTable";

export default {
  components: {TransactionsTable, TransactionForm, Header},
  middleware: ["auth"],
  head() {
    return {
      title: "My Account"
    }
  },
  data() {
    return {
      transactions: [],
      is_loaded: false,
      errors: {},
      transaction: {
        destination_id: null,
        amount: null,
        details: null,
      },
    };
  },
  computed: {
    account: function () {
      return this.$store.state.account;
    },
  },
  mounted() {
      this.getTransactions();
  },
  methods: {
    transactionIsSuccessful() {
      this.$bvToast.toast("Transaction completed successfully", {
        title: "Success",
        variant: "success",
        autoHideDelay: 3000,
        appendToast: false,
      });
      this.getTransactions();
      this.updateAccount();
    },
    transactionIsFailed(errors) {
      Object.keys(errors).forEach(key => {
        this.$bvToast.toast(errors[key], {
          title: "Error",
          variant: "danger",
          autoHideDelay: 3000,
          appendToast: false,
        });
      });
    },
    getTransactions() {
      getTransactions(this.account.id)
          .then(res => {
            this.transactions = res.data.data.transactions;
          });
    },
    updateAccount() {
      getAccount(this.account.id).then(response => {
        this.$store.commit('updateBalance', response.data.data.account.balance);
      })
    },
  },
};
</script>
