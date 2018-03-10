<template>
  <div class="login">
    <el-card class="login__card" :body-style="{ padding: '40px' }">
      <h1 class="login__title mb-4"><img src="/images/logo.png" class="login__logo" alt="Ian's Blog"/></h1>
      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent="submit">
        <el-form-item>
          <div class="login__email-item">
            <el-form-item class="login__email" prop="email">
              <el-input  placeholder="email" v-model="form.email"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="Password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="Remember" v-model="form.remember"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" class="login__btn-submit" type="primary">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
        remember: false,
      },
      rules: {
        email: [
          { type: 'email', required: true, message: 'Please enter email', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
        ],
      },
    };
  },
  computed: mapGetters(['isLoggedIn']),
  methods: {
    ...mapActions(['login']),
    async submit() {
      if (await this.$refs.form.validate()) {
        await this.login({ ...this.form });
        this.redirectIfLogined();
      }
    },
    redirectIfLogined() {
      if (this.isLoggedIn) this.$router.push(this.$route.query.r || '/admin');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.login__logo {
  width: 50px;
}
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
