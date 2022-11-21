<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from "./components/HeaderComponent.vue";
import Footer from "./components/FooterComponent.vue";
export default {
  components: { Header, Footer },
};
</script>