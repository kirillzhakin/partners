<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.field"
            @click="column.sortable && sort(column.field)"
            :class="[
              { 'cursor-pointer': column.sortable },
              { 'table-primary': sortKey === column.field },
            ]"
          >
            {{ column.name }}

            <span v-if="sortKey === column.field">
              {{ sortDirection === 1 ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="req in paginatedRequests"
          :key="req.id"
          @click="$emit('select', req)"
          style="cursor: pointer"
        >
          <td>{{ req.id }}</td>
          <td>{{ req.name }}</td>
          <td>{{ req.city }}</td>
          <td>{{ req.status }}</td>
          <td>{{ formatDate(req.created_at) }}</td>
        </tr>

        <tr v-if="!paginatedRequests.length">
          <td colspan="5" class="text-center">Нет данных</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center">
      <button
        class="btn btn-outline-primary"
        @click="prevPage"
        :disabled="page === 1"
      >
        Назад
      </button>

      <span>Страница {{ page }} / {{ pageCount }}</span>

      <button
        class="btn btn-outline-primary"
        @click="nextPage"
        :disabled="page >= pageCount"
      >
        Вперёд
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    requests: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      page: 1,
      perPage: 10,
      sortKey: "",
      sortDirection: 1,
      columns: [
        { name: "ID", field: "id", sortable: true },
        { name: "Имя партнёра", field: "name", sortable: true },
        { name: "Город", field: "city", sortable: true },
        { name: "Статус", field: "status", sortable: true },
        { name: "Дата создания", field: "created_at", sortable: true },
      ],
    };
  },

  computed: {
    filteredRequests() {
      const start = (this.page - 1) * this.perPage;
      return this.requests.slice(start, start + this.perPage);
    },
    sortedRequests() {
      if (!this.sortKey) return this.requests;

      return [...this.requests].sort((a, b) => {
        if (a[this.sortKey] > b[this.sortKey]) return this.sortDirection;
        if (a[this.sortKey] < b[this.sortKey]) return -this.sortDirection;
        return 0;
      });
    },

    pageCount() {
      return Math.ceil(this.sortedRequests.length / this.perPage);
    },

    paginatedRequests() {
      const start = (this.page - 1) * this.perPage;
      return this.sortedRequests.slice(start, start + this.perPage);
    },
  },

  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortDirection *= -1;
      } else {
        this.sortKey = key;
        this.sortDirection = 1;
      }
    },

    nextPage() {
      if (this.page < this.pageCount) this.page++;
    },

    prevPage() {
      if (this.page > 1) this.page--;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
