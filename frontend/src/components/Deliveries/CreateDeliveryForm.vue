<template>
  <q-dialog @before-hide="hide" v-if="delivery" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание доставки</div>
      </q-card-section>
      <q-card-section>
      <form @submit="addDelivery">
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
export default class CreateDeliveryForm extends Vue {
  value = false;
  delivery:
    | {
        DeliveryPrice: number;
        Speed: number;
      }
    | any = null;

  get valid() {
    return true;
  }

  get checkAddButtonDisabled() {
    return !(
      this.delivery.DeliveryPrice !== '' &&
      this.delivery.Speed !== ''
    );
  }

  async show() {
    this.delivery = {
      DeliveryPrice: "",
      Speed: "",
    };
    this.value = true;
  }

  async addDelivery() {
    if (!this.delivery) return;
    const result = await axios.post(
      "http://localhost:8080/api/deliveries/",
      this.delivery
    );
    if (result) {
      this.$emit("update-deliveries-list");
    }
    this.value = false;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-delivery-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-delivery-form", () => this.hide());
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
