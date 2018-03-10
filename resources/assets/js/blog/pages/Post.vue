<template>
  <div>
    <app-topbar />
    <main class="">
      <div class="container"  v-if="post">
        <div class="post-view__body">
          <div class="cf box-heading">
            <h2>{{ post.title }}</h2>
          </div>
          <h3>{{ post.details }}</h3>
          <div class="text-center">
            <img :src="post.image" class="post-view__postimage">
          </div>
          <template v-for="line in body"><p class="post-view__p">{{ line }}</p><br></template>
        </div>

        <div class="post-view__comments">
          <h3>Responses</h3>
          <hr>
          <template v-if="post.comments" v-for="comment in post.comments">
            <div class="post-view__card">
              <img :src="comment.commenter.avatar" class="post-view__avatar">
              <span class="post-view__commenter">{{ comment.commenter.name }}</span>
              <p class="post-view__pcomment">{{ comment.comment }}</p>
            </div>
          </template>
        </div>
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
  data() {
    return {
      post: null,
    };
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
    body() {
      return _.split(this.post.body, '\n');
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions([
      'fetchPost',
      'fireClick',
    ]),
    async fetchData() {
      this.post = await this.fireClick(this.id);
    },
  }
};
</script>

<style lang="scss" scoped>
.post-view {

  &__comments {
    margin-top: 2em;
  }

  &__postimage {
    width: 100%;
    max-width: 700px;
    margin: 30px 0;
  }

  &__card {
    margin: 20px 10px;
    padding: 12px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
    -webkit-transition: opacity .2s ease-out, -webkit-box-shadow .3s ease-out, -webkit-transform .3s ease-out;
    transition: opacity .2s ease-out, -webkit-box-shadow .3s ease-out, -webkit-transform .3s ease-out;
    transition: box-shadow .3s ease-out, transform .3s ease-out, opacity .2s ease-out;
    transition: box-shadow .3s ease-out, transform .3s ease-out, opacity .2s ease-out, -webkit-box-shadow .3s ease-out, -webkit-transform .3s ease-out;
    -webkit-transition-delay: .1s;
    transition-delay: .1s;
    overflow: hidden;
    border-radius: 4px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }

  &__avatar {
    width: 40px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }

  &__commenter {
    margin-left: 10px;
    font-size: 16px;
  }

  &__p {
    font-size: 21px;
    font-weight: 200;
    line-height: 30px;
  }

  &__pcomment {
    font-size: 16px;
    color: #bbb;
    margin: 5px 20px 20px 52px;
  }
}
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

  @media only screen and (max-width: 1999px) and (min-width: 1400px) {
    .container {
      width: 70%;
    }    
  }
  @media only screen and (max-width: 1399px) and (min-width: 1150px) {
    .container {
      width: 80%;
    }
  }
  @media only screen and (max-width: 1150px) and (min-width: 900px) {
    .container {
      width: 85%;
    }
  }
  @media only screen and (max-width: 900px) {
    .container {
      width: 95%;
    }  
  }
</style>