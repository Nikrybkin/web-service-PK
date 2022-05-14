<template>
  <q-dialog @before-hide="hide" v-if="customers" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание пользователя</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addCustomer">
          <q-input
            v-model="customers.Name"
            class="input"
            filled
            label="Имя"
            lazy-rules
            clearable
            maxlength="20"
          />
          <q-input
            v-model="customers.Adress"
            class="input"
            filled
            label="Адрес"
            lazy-rules
            clearable
            maxlength="40"
          />
          <q-input
            v-model="customers.Phone"
            class="input"
            filled
            clearable
            label="Телефон"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="customers.ContactName"
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
              label="Создать"
              color="primary"
            />
          </q-card-actions>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component,  Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class CreateCustomerForm extends Vue {
  value = false;
  customers:
    | {
        Name: string;
        Adress: string;
        Phone: string;
        ContactName: string;
      }
    | any = null;

  get valid() {
    return true;
  }

  get checkAddButtonDisabled() {
    return !(
      this.customers.Name !== '' &&
      this.customers.Adress !== '' &&
      this.customers.Phone !== '' &&
      this.customers.ContactName !== ''
    );
  }

  async show() {
    this.customers = {
      Name: "",
      Adress: "",
      Phone: "",
      ContactName: "",
    };
    this.value = true;
  }

  async addCustomer() {
    if (!this.customers) return;
    const result = await axios.post(
      "http://localhost:8080/api/customers/",
      this.customers
    );
    if (result) {
      this.$emit("update-customers-list");
    }
    this.value = false;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-customer-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-customer-form", () => this.hide());
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
</style>
