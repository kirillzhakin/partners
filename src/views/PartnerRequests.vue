<template>
  <div v-if="isLoading" class="loaderWrapper">
    <loader />
  </div>
  <div v-else-if="isError" class="container mt-3">
    {{ isError }}
  </div>
  <div v-else class="container mt-3">
    <h3>Заявки партнёров</h3>
    <div class="inputWrapper">
      <search-input v-model="search.name" :placeholder="'Введите имя'" />
      <search-input v-model="search.city" :placeholder="'Введите город'" />

      <select v-model="statusFilter" class="form-select mb-3">
        <option
          v-for="status in statuses"
          :key="status.value"
          :value="status.value"
        >
          {{ status.label }}
        </option>
      </select>
    </div>

    <request-table :requests="requests" @select="openCard" />

    <request-card
      v-if="selectedRequest"
      :request="selectedRequest"
      @close="selectedRequest = null"
    />
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";
import RequestCard from "@/components/RequestCard.vue";
import RequestTable from "@/components/RequestTable.vue";
import Loader from "@/components/LoaderTemp.vue";

export default {
  components: {
    SearchInput,
    RequestTable,
    RequestCard,
    Loader,
  },
  data() {
    return {
      search: { name: "", city: "" },
      statusFilter: "",
      statuses: [
        { label: "Все", value: "" },
        { label: "новая", value: "новая" },
        { label: "в работе", value: "в работе" },
        { label: "одобрена", value: "одобрена" },
        { label: "отклонена", value: "отклонена" },
      ],
      selectedRequest: null,
    };
  },
  computed: {
    isError() {
      return this.$store.getters.isError;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    requests() {
      return this.$store.getters.filteredRequests(
        this.search,
        this.statusFilter,
      );
    },
  },
  methods: {
    openCard(req) {
      this.selectedRequest = req;
    },
  },
  created() {
    this.$store.dispatch("fetchRequests");
  },
};
</script>
<style>
.loaderWrapper {
  height: 500px;
}
.inputWrapper {
  width: fit-content;
  max-width: 300px;
  margin: 0;
}
</style>
