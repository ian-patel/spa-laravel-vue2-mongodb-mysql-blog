<template>
  <div v-if="post">
    <app-topbar />
    <main class="text-center">
      <div class="container">
        <div class="cf box-heading">
          <h2>{{ post.title }}</h2>
        </div>
        <h3>{{ post.details }}</h3>
        <img :src="post.image">
        <p>{{ post.body }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  watch: {
    id() {
      this.fetchData();
    },
  },
  computed: {
    ...mapGetters([
      'getPostById'
    ]),
    post() {
      return this.getPostById(this.id);
    },
  },
  mounted() {
    if (!this.post) this.fetchData();
    this.fireClick(this.id);
  },
  methods: {
    ...mapActions([
      'fetchPost',
      'fireClick',
    ]),
    async fetchData() {
      await this.fetchPost(this.id);
    },
  }
};
</script>

<style lang="scss" scoped>

  .text-center {
    text-align: center;
  }
  .box-heading h2  {
    float: none;
  }
  .container {
    margin: 10px auto;
    width: 80%;
  }
  h3 {
    color: rgba(0,0,0,.54);
    line-height: 25px;
    font-size: 20px;
  }
  img {
    margin: 3em;
  }
  p {
    font-size: 21px;
    font-weight: 200;
    line-height: 30px;
  }
</style>