<template>
  <div id="app">
    <partner-requests />
  </div>
</template>

<script>
import PartnerRequests from "./views/PartnerRequests.vue";
export default {
  name: "App",
  components: {
    PartnerRequests,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
