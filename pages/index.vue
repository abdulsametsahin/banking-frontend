<template>
  <div class="container d-flex justify-content-center align-items-center h-100">
    <div class="d-flex justify-content-center w-100">
      <div class="col-md-6 col-xs-12">
        <div class="card w-100">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div class="form-group">
              <label for="account_id">Account ID:</label>
              <input type="number" class="form-control" v-model="account_id" />
            </div>

            <button class="btn btn-info" @click="login">🙋🏼‍♂️Login</button>
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
      is_loading: false,
      account_id: null,
    };
  },
  methods: {
    login(event) {
      axios
        .get("accounts/" + this.account_id)
        .then((res) => {
          this.$store.commit("auth/login", res.data.data.account);
          this.$router.push({ path: "/account" });
        })
        .catch((err) => {
          this.$bvToast.toast("User not found!", {
            title: "Warning",
            variant: "warning",
            autoHideDelay: 3000,
            appendToast: false,
          });
        });
    },
  },
};
</script>
