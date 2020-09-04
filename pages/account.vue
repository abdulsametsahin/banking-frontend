<template>
  <div id="account">
    <div v-if="account">
      <nav class="navbar navbar-light bg-light">
        <div class="container">
          <div class="d-flex w-100 justify-content-between alin-center">
            <h4>{{account.name}} ({{ account.balance }})</h4>
            <div>
              <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="container">
        <div class="d-flex justify-content-center w-100 mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">Make Transaction</div>
              <div class="card-body">
                <div class="form-group">
                  <label for="destination_id">Destination ID</label>
                  <input
                    type="number"
                    id="destination_id"
                    min="1"
                    :class="'form-control ' + (backend_errors['to'] ? 'is-invalid' : '')"
                    v-model="transaction.destination_id"
                  />
                </div>
                <div class="form-group">
                  <label for="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    min="0"
                    :class="'form-control ' + (backend_errors['amount'] ? 'is-invalid' : '')"
                    v-model="transaction.amount"
                  />
                </div>
                <div class="form-group">
                  <label for="details">Details</label>
                  <input
                    type="text"
                    id="details"
                    :class="'form-control ' + (backend_errors['details'] ? 'is-invalid' : '')"
                    v-model="transaction.details"
                  />
                </div>
                <button class="btn btn-success" @click="makeTransaction">Send</button>
                <div
                  class="alert alert-danger mt-3"
                  v-for="(error, index) in form_errors"
                  :key="index"
                >{{ error }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="d-flex justify-content-center w-100 mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">Make Transaction</div>
              <div class="card-body">
                <table class="table">
                  <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    <th width="50%">Details</th>
                  </tr>
                  <tr v-for="transaction in transactions" :key="transaction.id">
                    <td>{{ transaction.id }}</td>
                    <td>{{ transaction.from }}</td>
                    <td>{{ transaction.to }}</td>
                    <td>{{ transaction.amount }}</td>
                    <td>{{ transaction.details }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
  data() {
    return {
      transactions: [],
      is_loaded: false,
      form_errors: [],
      backend_errors: {},
      transaction: {
        destination_id: null,
        amount: null,
        details: null,
      },
    };
  },
  computed: {
    account() {
      return (
        this.$store.state.auth.account ||
        JSON.parse(localStorage.getItem("account"))
      );
    },
  },
  mounted() {
    let account = localStorage.getItem("account");
    if (!account) {
      this.$router.push({ path: "/" });
    }

    this.$store.commit("auth/login", JSON.parse(account));
    this.getTransactions();
  },
  methods: {
    getTransactions() {
      axios
        .get("/accounts/" + this.account.id + "/transactions")
        .then((response) => {
          this.transactions = response.data.data.transactions;
        });
    },
    makeTransaction() {
      this.form_errors = [];
      this.backend_errors = {};

      if (
        !this.transaction.destination_id ||
        isNaN(this.transaction.destination_id)
      ) {
        this.form_errors.push("Destination ID is required");
      }
      if (!this.transaction.amount || isNaN(this.transaction.amount)) {
        this.form_errors.push("Amount is required");
      }
      if (!this.transaction.details || this.transaction.details.length < 1) {
        this.form_errors.push("Details is required");
      }

      if (this.form_errors.length > 0) {
        return;
      }

      axios
        .post("accounts/" + this.account.id + "/transactions", {
          to: parseInt(this.transaction.destination_id),
          amount: parseFloat(this.transaction.amount),
          details: this.transaction.details,
        })
        .then((data) => {
          this.$bvToast.toast("Transaction completed successfully", {
            title: "Success",
            variant: "success",
            autoHideDelay: 3000,
            appendToast: false,
          });

          this.transaction = {
            destination_id: null,
            amount: null,
            details: null,
          };

          this.getTransactions();
        })
        .catch((err) => {
          this.backend_errors = err.response.data.errors;
          this.$bvToast.toast(err.response.data.message, {
            title: "Error",
            variant: "danger",
            autoHideDelay: 3000,
            appendToast: false,
          });
        });
    },
    logout(event) {
      event.preventDefault();
      this.$store.commit("auth/logout");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
