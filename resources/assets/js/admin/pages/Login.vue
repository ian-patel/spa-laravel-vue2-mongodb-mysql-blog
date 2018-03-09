<template>
  <div class="login">
    <el-card class="login__card" :body-style="{ padding: '40px' }">
      <h1 class="login__title mb-4">Admin</h1>
      <el-form ref="form" @submit.native.prevent="submit">
        <el-form-item>
          <div class="login__email-item">
            <el-form-item class="login__email" prop="email">
              <el-input  placeholder="email"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="Remember"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" class="login__btn-submit" type="primary">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.login__card {
  width: 450px;
  margin: 20vh auto 0;
}
.login__title {
  font-size: 36px;
  text-align: center;
  color: $--color-primary;
}
.login__email-item {
  display: flex;
}
.login__country {
  width: 70px;
  margin-right: 15px;
}
.login__email {
  flex-grow: 1;
}
.login__btn-submit {
  width: 100%;
}
</style>
