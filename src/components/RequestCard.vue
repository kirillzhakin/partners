<template>
  <div class="modal-backdrop">
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <h5>Заявка {{ request.id }}</h5>

        <form @submit.prevent="save">
          <BaseInput
            label="Имя партнёра"
            v-model="form.name"
            :error="errors.name"
          />

          <BaseInput
            label="Телефон"
            v-model="form.phone"
            :error="errors.phone"
          />

          <BaseInput label="Город" v-model="form.city" :error="errors.city" />

          <div class="mb-2">
            <label class="form-label">Статус</label>

            <select v-model="form.status" class="form-select">
              <option
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
              >
                {{ status.label }}
              </option>
            </select>
          </div>

          <p><strong>Комментарий:</strong> {{ request.comment }}</p>
          <p><strong>Дата:</strong> {{ request.created_at }}</p>

          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-primary" type="submit">Сохранить</button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close')"
            >
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
  components: {
    BaseInput,
  },

  props: ["request"],

  data() {
    return {
      form: {
        id: this.request.id,
        name: this.request.name,
        phone: this.request.phone,
        city: this.request.city,
        status: this.request.status,
      },

      errors: {},

      statuses: [
        { label: "новая", value: "новая" },
        { label: "в работе", value: "в работе" },
        { label: "одобрена", value: "одобрена" },
        { label: "отклонена", value: "отклонена" },
      ],
    };
  },

  methods: {
    validate() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = "Введите имя партнёра";
      }

      if (!this.form.phone) {
        this.errors.phone = "Введите телефон";
      }

      if (!this.form.city) {
        this.errors.city = "Введите город";
      }

      return Object.keys(this.errors).length === 0;
    },

    save() {
      if (!this.validate()) return;

      this.$store.dispatch("changeRequest", this.form);

      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  background: white;
  border-radius: 5px;
}

.modal-content {
  min-width: 330px;
}
</style>
