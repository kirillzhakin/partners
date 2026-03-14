<template>
  <div class="loaderContainer">
    <div class="loader" />
  </div>
</template>

<style>
.loader {
  border: 10px solid #f5f5f5;
  border-top: 10px solid #2985bf;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loaderContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
