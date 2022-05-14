<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о пользователе</div>
      <q-btn label="Назад" @click="$router.push('/customers')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateCustomer">
          <q-input
            v-model="customer.Name"
            class="input"
            filled
            label="Имя"
            lazy-rules
            maxlength="20"
          />
          <q-input
            v-model="customer.Adress"
            class="input"
            filled
            label="Адрес"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="customer.Phone"
            class="input"
            filled
            clearable
            label="Телефон"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="customer.ContactName"
            class="input"
            filled
            clearable
            label="Контактное имя"
            lazy-rules
            maxlength="20"
          />
          <q-card-actions class="button-block">
            <q-btn
              :disabled="checkAddButtonDisabled"
              type="Submit"
              label="Изменить"
              color="primary"
            />
          </q-card-actions>
        </form>
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class Customer extends Vue {
  customer: any | [] = [];
  isAddButtonDisabled: boolean = true;

  get checkAddButtonDisabled() {
    return !(
      this.customer.Name !== '' &&
      this.customer.Adress !== '' &&
      this.customer.Phone !== '' &&
      this.customer.ContactName !== ''
    );
  }

  async getCustomer() {
    const result = await axios.get(
      `http://localhost:8080/api/customers/${this.$route.params.id}`
    );
    this.customer = result.data[0];
  }

  async updateCustomer() {
    await axios.put(
      `http://localhost:8080/api/customers/${this.$route.params.id}`,
      this.customer
    );
  }

  mounted() {
    this.getCustomer();
  }
}
</script>

<style lang="scss">
.input {
  margin-bottom: 20px;
}

.button-block {
  padding: 0;
  justify-content: flex-end;
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
