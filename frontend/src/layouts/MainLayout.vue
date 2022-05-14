<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Company
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: "Home",
    caption: "Home page",
    icon: "home",
    link: "/",
  },
  {
    title: "Customers",
    caption: "List of customers",
    icon: "people",
    link: "/#/customers",
  },
  {
    title: "Deliveries",
    caption: "List of deliveries",
    icon: "local_shipping",
    link: "/#/deliveries",
  },
  {
    title: "Products",
    caption: "List of products",
    icon: "view_carousel",
    link: "/#/products",
  },
  {
    title: "Orders",
    caption: "List of orders",
    icon: "shopping_cart_checkout",
    link: "/#/orders",
  },
];

@Component({
  components: { EssentialLink },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;

  essentialLinks = linksData;
}

</script>
