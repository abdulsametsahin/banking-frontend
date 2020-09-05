<template>
  <div class="card">
    <div class="card-header">History</div>
    <div class="card-body">
      <table class="table table-bordered" id="transactions_table">
        <tr>
          <th>#</th>
          <th>From</th>
          <th>To</th>
          <th>
            Amount
            <button class="btn btn-sm " @click="toggleAmountSorting">
              <Component :is="sortIconDefiner"></Component>
            </button>
          </th>
          <th class="details-column">Details</th>
        </tr>

          <tr
            v-for="transaction in transactionsInCurrentPage"
            :key="transaction.id"
          >
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.from }}</td>
            <td>{{ transaction.to }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.details }}</td>
          </tr>

      </table>

      <div class="d-flex justify-content-center mt-5">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="transactions_table"
        ></b-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import {BIconSortDown, BIconSortUp, BIconX} from "bootstrap-vue"

export default {
  components: {
    BIconSortUp,
    BIconSortDown,
    BIconX
  },
  props: ['transactions'],
  name: "TransactionsTable",
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      sortAmount: false,
    }
  },
  computed: {
    sortIconDefiner() {
      if (this.sortAmount === false) {
        return "b-icon-sort-down";
      } else if (this.sortAmount === "desc") {
        return "b-icon-sort-up";
      } else {
        return "b-icon-x";
      }
    },
    totalRows() {
      return this.transactions.length;
    },
    start() {
      return (this.currentPage - 1) * this.perPage;
    },
    end() {
      return this.start + this.perPage;
    },
    transactionsInCurrentPage() {
      let transactions = [...this.transactions];

      if (this.sortAmount !== false) {
        if (this.sortAmount === "desc") {
          transactions = transactions.sort((t1, t2) => {
            return t2.amount - t1.amount;
          });
        } else {
          transactions = transactions.sort((t1, t2) => {
            return t1.amount - t2.amount;
          });
        }
      }

      return transactions.slice(this.start, this.end);
    }
  },
  methods: {
    toggleAmountSorting() {
      this.currentPage = 1;

      if (this.sortAmount === false) {
        this.sortAmount = "desc";
      } else if (this.sortAmount === "desc") {
        this.sortAmount = "asc";
      } else {
        this.sortAmount = false;
      }
    }
  }
}
</script>

<style scoped>
.details-column {
  width: 40%;
}
</style>
