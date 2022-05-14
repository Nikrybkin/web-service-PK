<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showOrderForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          @click="confirm()"
          style="margin-left: 20px"
          color="red"
          label="Удалить"
        />
      </div>
    </div>
    <q-table
      class="table"
      :columns="columns"
      :data="getName"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="OrderID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/orders/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <order-form :propDelivery='deliveries'  :propCustomer='customers' :propProduct='products' @update-orders-list="getOrders"></order-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import OrderForm from "src/components/Orders/CreateOrderForm";

@Component({
  components: {
      OrderForm,
  },
})
export default class Orders extends Vue {
  orders: any | [] = [];
  deliveries: any | [] = [];
  customers: any | [] = [];
  products: any | [] = [];
  selected: { OrderID: number }[] = [];

  columns = [
    {
      name: "OrderID",
      label: "OrderID",
      field: "OrderID",
      required: true,
      align: "left",
    },
    {
      name: "DeliveryID",
      label: "DeliveryID",
      field: "DeliveryID",
      required: true,
      align: "left",
    },
    {
      name: "CustomerID",
      label: "Customer",
      field: "CustomerID",
      required: true,
      align: "left",
    },
    {
      name: "ProductID",
      label: "ProductID",
      field: "ProductID",
      required: true,
      align: "left",
    },
    {
      name: "OrderCount",
      label: "OrderCount",
      field: "OrderCount",
      required: true,
      align: "left",
    },
    {
      name: "Date",
      label: "Date",
      field: "Date",
      required: true,
      align: "left",
    },
  ];

  get getName() {
    for (let order of this.orders) {
      for (let customer of this.customers) {
        if (order.CustomerID === customer.CustomerID) {
          order.CustomerID = customer.Name
        }
      }
    }
    return this.orders
  }

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить пользователя?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/orders/${this.selected[0].OrderID}`
        );
        if (response) {
          this.getOrders();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showOrderForm(value: boolean) {
    this.$bus.$emit("toggle-order-form", value);
  }

  async getOrders() {
    const response = await axios.get("http://localhost:8080/api/orders/");
    this.orders = response.data;
  }

  async getDeliveries() {
    const response = await axios.get("http://localhost:8080/api/deliveries/");
    this.deliveries = response.data;
  }

  async getCustomers() {
    const response = await axios.get("http://localhost:8080/api/customers/");
    this.customers = response.data;
  }

  async getProducts() {
    const response = await axios.get("http://localhost:8080/api/products/");
    this.products = response.data;
  }

  mounted() {
    this.getOrders();
    this.getDeliveries();
    this.getCustomers();
    this.getProducts()
  }

  getSelectedString() {
    return this.selected.length === 0
      ? "ничего не выбрано"
      : `${this.selected.length} record${this.selected.length > 1 ? "s" : ""}`;
  }
}
</script>

<style lang="scss">
.container {
  margin: 20px;
}

.table {
  height: auto;
  max-height: calc(100vh - 146px);
}

.btns {
  margin-bottom: 20px;
}

.td-curs {
  cursor: pointer;
}
</style>
