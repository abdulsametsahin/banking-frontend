<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <div class="d-flex w-100 justify-content-between alin-center">
        <h4>{{ account.name }} ({{ account.balance }})</h4>
        <div>
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Header",
  computed: {
    account() {
      return this.$store.state.auth.account;
    }
  },
  methods: {
    logout(event) {
      event.preventDefault();
      this.$store.commit("auth/logout");
      this.$router.push({path: "/"});
    },
  }
}
</script>
