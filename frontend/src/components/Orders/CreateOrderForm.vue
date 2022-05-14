<template>
  <q-dialog @before-hide="hide" v-if="orders" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание заказа</div>
      </q-card-section>
      <q-card-section>
         <form @submit="addOrder">
          <q-select
            v-model="orders.DeliveryID"
            :options="getDeliveryName"
            class="input"
            filled
            label="Доставка"
            lazy-rules
          />
          <q-select
            v-model="orders.CustomerID"
            :options="getCustomerName"
            class="input"
            filled
            clearable
            label="Пользователь"
            lazy-rules
          />
          <q-select
            v-model="orders.ProductID"
            :options="getProductName"
            class="input"
            filled
            clearable
            label="Продукт"
            lazy-rules
          />
          <q-input
            v-model="orders.OrderCount"
            class="input"
            filled
            clearable
            label="Количество заказов"
            lazy-rules
          />
          <q-input
            v-model="orders.Date"
            class="input"
            filled
            clearable
            mask="####-##-##"
            label="Дата"
            lazy-rules
          />
          <q-card-actions class="button-block">
            <q-btn
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
import { Component, Prop,  Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class CreateOrderForm extends Vue {
  @Prop({ type: Array, required: true }) propDelivery: any;
  @Prop({ type: Array, required: true }) propCustomer: any;
  @Prop({ type: Array, required: true }) propProduct: any;
  value = false;
  orders:
    | {
        DeliveryID: string;
        CustomerID: string;
        ProductID: string;
        OrderCount: string;
        Date: string;
      }
    | any = null;


  get getDeliveryName() {
      let delivery = []
      for (let i of this.propDelivery) {
        delivery.push(i.DeliveryID)
      }
      return delivery
    }

  get getCustomerName() {
    let customer = []
    for (let i of this.propCustomer) {
      customer.push(i.Name)
    }
    return customer
  }

  get getProductName() {
    let customer = []
    for (let i of this.propProduct) {
      customer.push(i.ProductID)
    }
    return customer
  }

  get valid() {
    return true;
  }

  async show() {
    this.orders = {
      DeliveryID: "",
      Adress: "",
      ProductID: "",
      ContactName: "",
    };
    this.value = true;
  }

  async addOrder() {
    if (!this.orders) return;
    for (let item of this.propCustomer) {
      if (this.orders.CustomerID === item.Name) {
        this.orders.CustomerID = item.CustomerID
      }
    }
    const result = await axios.post(
      "http://localhost:8080/api/orders/",
      this.orders
    );
    if (result) {
      this.$emit("update-orders-list");
    }
    this.value = false;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-order-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-order-form", () => this.hide());
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
