<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о доставке</div>
      <q-btn label="Назад" @click="$router.push('/deliveries')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateCustomer">
          <q-input
            v-model="delivery.DeliveryPrice"
            class="input"
            filled
            label="Цена"
            lazy-rules
          />
          <q-input
            v-model="delivery.Speed"
            class="input"
            filled
            label="Скорость"
            lazy-rules
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
  delivery: any | [] = [];
  isAddButtonDisabled: boolean = true;

  get checkAddButtonDisabled() {
    return !(
      this.delivery.DeliveryPrice !== '' &&
      this.delivery.Speed !== ''
    );
  }

  async getCustomer() {
    const result = await axios.get(
      `http://localhost:8080/api/deliveries/${this.$route.params.id}`
    );
    this.delivery = result.data[0];
  }

  async updateCustomer() {
    await axios.put(
      `http://localhost:8080/api/deliveries/${this.$route.params.id}`,
      this.delivery
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
