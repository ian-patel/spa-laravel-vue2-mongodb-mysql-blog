<template>
  <div class="post-list">
    <div class="post-list__filters mb-3">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="addPost">Add</el-button>
    </div>
    <el-row>
      <el-col :span="6" v-for="(post, index) in posts" :key="index" v-if="posts.length > 1">
        <el-card :body-style="{ padding: '0px' }" class="m-3 post-list__body">
          <router-link 
            :to="{ name: 'post', params: { id: post._id } }" >
            <img :src="post.image" class="post-list__image">
            <div style="padding: 14px;">
              <span>{{ post.title }}</span>
              <div class="post-list__bottom">
                <span class="post-list__category">{{ post.category.title }}</span>
                <span class="post-list__clicks pull-right"><i class="el-icon-view"></i> {{ post.clicks }}</span>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
      <infinite-loading 
        @infinite="loadMore" 
        :distance="500">
          <div slot="no-more">That's all we have 👍🏼</div>
          <div slot="spinner">
            <el-col :span="6" v-for="(post, index) in 4" :key="index">
              <el-card :body-style="{ padding: '0px' }" class="m-3 post-list__body">
                <img src="" class="post-list__image">
              </el-card>
            </el-col>
          </div>
        </infinite-loading>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'posts',
      'hasMore',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchPosts',
    ]),
    async loadMore($infinite) {
      await this.fetchPosts();
      // complete loading
      if (!this.hasMore) {
        $infinite.complete();
        return;
      }
      // loaded from this request
      $infinite.loaded();
    },
    addPost() {
      this.$router.push({ name: 'addPost' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.post-list {

  &__filters {
    display: inline-block;
    width: 200px;
  }
  
  &__body {
    min-height: 350px;
  } 
  
  &__image {
    width: 100%;
    background: #EBEBEB;
    display: block;
    min-height: 200px;
  }
  
  &__clicks {
    float: right;
  }

  &__bottom {
    margin-top: 13px;
    line-height: 12px;
    color: #999;
    font-size: 13px;
  }
}
</style>