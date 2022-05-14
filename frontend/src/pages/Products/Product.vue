<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о продукте</div>
      <q-btn label="Назад" @click="$router.push('/products')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateProduct">
          <q-input
            v-model="product.Price"
            class="input"
            filled
            label="Цена"
            lazy-rules
          />
          <q-input
            v-model="product.Delivery"
            class="input"
            filled
            label="Доставка"
            lazy-rules
            maxlength="20"
          />
          <q-input
            v-model="product.Description"
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
export default class Product extends Vue {
  product: any | [] = [];
  isAddButtonDisabled: boolean = true;

   get checkAddButtonDisabled() {
    return !(
      this.product.Price !== '' &&
      this.product.Delivery !== '' &&
      this.product.Description !== ''
    );
  }

  async getProduct() {
    const result = await axios.get(
      `http://localhost:8080/api/products/${this.$route.params.id}`
    );
    this.product = result.data[0];
  }

  async updateProduct() {
    this.product.Price = this.product.Price + 100
    await axios.put(
      `http://localhost:8080/api/products/${this.$route.params.id}`,
      this.product
    );
  }

  mounted() {
    this.getProduct();
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
