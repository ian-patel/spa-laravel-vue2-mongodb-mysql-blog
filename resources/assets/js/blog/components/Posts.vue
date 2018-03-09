<template>
  <main>
    <div class="feeds">
      <div class="cf box-heading">
        <h2 class="latest-stories">What we're reading  <br/> <small> — Stuff we found interesting!</small></h2>
      </div>
      <section class="feeds">
        <ul class="cf">
          <li v-for="post in posts">
            <app-card :post="post" />
          </li>
        </ul>
        <infinite-loading 
          @infinite="loadMore" 
          :distance="500">
            <div slot="no-more">That's all we have 👍🏼</div>
            <div slot="spinner">
              <ul class="picks cf">
                <li v-for="n in 4">
                  <div class="tile"></div>
                </li>
              </ul>
            </div>
          </infinite-loading>
      </section>
    </div>
  </main>
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
  },
};
</script>