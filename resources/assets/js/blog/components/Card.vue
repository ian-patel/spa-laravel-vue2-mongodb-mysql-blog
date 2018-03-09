<template>
  <div class="tile">
    <router-link 
      :to="{ name: 'post', params: { slug: slug, id: post._id } }" 
      class="feedLink" >
      <div class="postPhoto">
        <img v-lazy="post.image"
          :alt="post.title"
          />
      </div>
      <div class="postInfo">
        <h3>{{ post.title }}</h3>
      </div>
    </router-link>

    <div class="postMeta">
      <div class="details">
        <span 
          class="favorite icon-fav" 
          v-tooltip.top="'Save items'">
        </span>
        <div class="stats pull-right">
          <span>
            <span
              class="icon-star"
              v-tooltip="'Stars'">
            </span>
            <span>{{ post.likes }}</span>
          </span>
          <span>
            <span
              class="icon-view"
              v-tooltip="'Views'">
            </span>
            <span>{{ post.clicks }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getSlug from 'speakingurl';
import VTooltip from 'v-tooltip';

export default {
  props: {
    post: {
      type: Object,
    },
  },
  computed: {
    slug() {
      return getSlug(this.post.title);
    }
  },
};
</script>