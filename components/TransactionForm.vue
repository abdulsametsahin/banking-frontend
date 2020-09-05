<template>
  <div class="card">
    <div class="card-header">Make Transaction</div>
    <div class="card-body">
      <div class="form-group">
        <label for="to">Destination ID</label>
        <input
            type="number"
            id="to"
            min="1"
            :class="'form-control ' + (errors['to'] ? 'is-invalid' : '')"
            v-model="to"
        />
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input
            type="number"
            id="amount"
            min="0"
            :class="'form-control ' + (errors['amount'] ? 'is-invalid' : '')"
            v-model="amount"
        />
      </div>
      <div class="form-group">
        <label for="details">Details</label>
        <input
            type="text"
            id="details"
            :class="'form-control ' + (errors['details'] ? 'is-invalid' : '')"
            v-model="details"
        />
      </div>
      <button class="btn btn-success" @click="send">Send</button>

    </div>
  </div>
</template>

<script>
import {makeTransaction} from "~/services/account";

export default {
  name: "TransactionForm",
  computed: {
    account() {
      return this.$store.state.auth.account;
    }
  },
  data() {
    return {
      to: null,
      amount: null,
      details: null,
      errors: {}
    }
  },
  methods: {
    send() {
      this.errors = {};

      makeTransaction(
          this.account.id,
          this.to,
          this.amount,
          this.details
      )
          .then(() => {
            this.$emit('transactionIsSuccessful');
            this.to = null;
            this.amount = null;
            this.details = null;
          })
          .catch((err) => {
            this.errors = err.response.data.errors;
            this.$emit('transactionIsFailed', this.errors);
          });
    },
  }
}
</script>
