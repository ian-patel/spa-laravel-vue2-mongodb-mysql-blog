<template>
  <header>
    <div class="pull-left">
      <router-link 
        to="/" 
        class="logo">
          <img src="/images/logo.png" alt="Ian's Blog"/> Ian Patel
      </router-link>
    </div>
    <div class="pull-right">
      <a class="login-cta" href="#">Sign In</a>
    </div>
  </header>
</template>

<style scoped>
  .login-cta {
    margin-right: 65px !important;
  }
</style>