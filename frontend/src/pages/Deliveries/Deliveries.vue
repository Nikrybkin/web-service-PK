<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showDeliveryForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          :disabled='checkDeliveryInOrders'
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
      :data="deliveries"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="DeliveryID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/deliveries/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <delivery-form @update-deliveries-list="getDeliveries"></delivery-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import DeliveryForm from "src/components/Deliveries/CreateDeliveryForm";

@Component({
  components: {
      DeliveryForm,
  },
})
export default class Customers extends Vue {
  deliveries: any | [] = [];
  orders: any | [] = [];
  selected: { DeliveryID: number }[] = [];

  columns = [
    {
      name: "DeliveryID",
      label: "DeliveryID",
      field: "DeliveryID",
      required: true,
      align: "left",
    },
    {
      name: "DeliveryPrice",
      label: "DeliveryPrice",
      field: "DeliveryPrice",
      required: true,
      align: "left",
    },
    {
      name: "Speed",
      label: "Speed",
      field: "Speed",
      required: true,
      align: "left",
    },
  ];

  get checkDeliveryInOrders() {
    for (let item of this.orders) {
      if (item.DeliveryID === this.selected[0].DeliveryID) {
        return true
      }
    }
  }

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить доставку?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/deliveries/${this.selected[0].DeliveryID}`
        );
        if (response) {
          this.getDeliveries();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showDeliveryForm(value: boolean) {
    this.$bus.$emit("toggle-delivery-form", value);
  }

  async getDeliveries() {
    const response = await axios.get("http://localhost:8080/api/deliveries/");
    this.deliveries = response.data;
  }

  async getOrders() {
    const response = await axios.get("http://localhost:8080/api/orders/");
    this.orders = response.data;
  }

  mounted() {
    this.getDeliveries();
    this.getOrders();
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
