<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showProductForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          :disabled='checkProductInOrders'
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
      :data="products"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="ProductID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/products/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <product-form @update-products-list="getProducts"></product-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import ProductForm from "src/components/Products/CreateProductForm";

@Component({
  components: {
      ProductForm,
  },
})
export default class Products extends Vue {
  products: any | [] = [];
  orders: any | [] = [];
  selected: { ProductID: number }[] = [];

  columns = [
    {
      name: "ProductID",
      label: "ProductID",
      field: "ProductID",
      required: true,
      align: "left",
    },
    {
      name: "Price",
      label: "Price",
      field: "Price",
      required: true,
      align: "left",
    },
    {
      name: "Delivery",
      label: "Delivery",
      field: "Delivery",
      required: true,
      align: "left",
    },
    {
      name: "Description",
      label: "Description",
      field: "Description",
      required: true,
      align: "left",
    },
  ];

  get checkProductInOrders() {
    for (let item of this.orders) {
      if (item.ProductID === this.selected[0].ProductID) {
        return true
      }
    }
  }

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить продукт?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/products/${this.selected[0].ProductID}`
        );
        if (response) {
          this.getProducts();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showProductForm(value: boolean) {
    this.$bus.$emit("toggle-product-form", value);
  }

  async getProducts() {
    const response = await axios.get("http://localhost:8080/api/products/");
    this.products = response.data;
  }

  async getOrders() {
    const response = await axios.get("http://localhost:8080/api/orders/");
    this.orders = response.data;
  }

  mounted() {
    this.getProducts();
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
