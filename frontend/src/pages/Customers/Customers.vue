<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showCustomerForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          :disabled='checkCustomerInOrders'
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
      :data="customers"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="CustomerID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/customers/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <customer-form @update-customers-list="getCustomers"></customer-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import CustomerForm from "src/components/Customers/CreateCustomerForm";

@Component({
  components: {
      CustomerForm,
  },
})
export default class Customers extends Vue {
  customers: any | [] = [];
  orders: any | [] = [];
  selected: { CustomerID: number }[] = [];

  columns = [
    {
      name: "CustomerID",
      label: "CustomerID",
      field: "CustomerID",
      required: true,
      align: "left",
    },
    {
      name: "Name",
      label: "Name",
      field: "Name",
      required: true,
      align: "left",
    },
    {
      name: "Adress",
      label: "Adress",
      field: "Adress",
      required: true,
      align: "left",
    },
    {
      name: "Phone",
      label: "Phone",
      field: "Phone",
      required: true,
      align: "left",
    },
    {
      name: "ContactName",
      label: "ContactName",
      field: "ContactName",
      required: true,
      align: "left",
    },
  ];

  get checkCustomerInOrders() {
    for (let item of this.orders) {
      if (item.CustomerID === this.selected[0].CustomerID) {
        return true
      }
    }
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
          `http://localhost:8080/api/customers/${this.selected[0].CustomerID}`
        );
        if (response) {
          this.getCustomers();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showCustomerForm(value: boolean) {
    this.$bus.$emit("toggle-customer-form", value);
  }

  async getCustomers() {
    const response = await axios.get("http://localhost:8080/api/customers/");
    this.customers = response.data;
  }

  async getOrders() {
    const response = await axios.get("http://localhost:8080/api/orders/");
    this.orders = response.data;
  }

  mounted() {
    this.getCustomers();
    this.getOrders()
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
