<template>
  <q-dialog @before-hide="hide" v-if="products" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание продукта</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addProduct">
          <q-input
            v-model="products.Price"
            class="input"
            filled
            label="Цена"
            lazy-rules
          />
          <q-input
            v-model="products.Delivery"
            class="input"
            filled
            label="Доставка"
            lazy-rules
            maxlength="20"
          />
          <q-input
            v-model="products.Description"
            class="input"
            filled
            clearable
            label="Описание"
            lazy-rules
            maxlength="50"
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
export default class CreateProductForm extends Vue {
  value = false;
  products:
    | {
        Price: string;
        Delivery: string;
        Decription: string;
      }
    | any = null;

  get checkAddButtonDisabled() {
    return !(
      this.products.Price !== '' &&
      this.products.Delivery !== '' &&
      this.products.Description !== ''
    );
  }

  get valid() {
    return true;
  }

  async show() {
    this.products = {
      Price: "",
      Delivery: "",
      Decription: "",
    };
    this.value = true;
  }

  async addProduct() {
    if (!this.products) return;
    const result = await axios.post(
      "http://localhost:8080/api/products/",
      this.products
    );
    if (result) {
      this.$emit("update-products-list");
    }
    this.value = false;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-product-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-product-form", () => this.hide());
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
