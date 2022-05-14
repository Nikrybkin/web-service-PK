<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о заказе</div>
      <q-btn label="Назад" @click="$router.push('/orders')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateOrder">
          <q-input
            v-model="order.DeliveryID"
            class="input"
            filled
            label="Доставка"
            lazy-rules
          />
          <q-input
            v-model="order.CustomerID"
            class="input"
            filled
            clearable
            label="Пользователь"
            lazy-rules
          />
          <q-input
            v-model="order.ProductID"
            class="input"
            filled
            clearable
            label="Продукт"
            lazy-rules
          />
          <q-input
            v-model="order.OrderCount"
            class="input"
            filled
            clearable
            label="Количество заказов"
            lazy-rules
          />
          <q-input
            v-model="order.Date"
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
  order: any | [] = [];
  isAddButtonDisabled: boolean = true;

  async getOrder() {
    const result = await axios.get(
      `http://localhost:8080/api/orders/${this.$route.params.id}`
    );
    this.order = result.data[0];
  }

  async updateOrder() {
    await axios.put(
      `http://localhost:8080/api/orders/${this.$route.params.id}`,
      this.order
    );
  }

  mounted() {
    this.getOrder();
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
