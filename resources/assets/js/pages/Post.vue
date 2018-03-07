<template>
  <div>
    <app-topbar />
    <main>
      <h2>{{ slug }}</h2>
    </main>
  </div>
</template>

<script>

export default {
  props: {
    slug: {
      type: String,
    },
    slug: {
      id: String,
      required: true,
    },
  },
  data() {
    return {
      // 
    };
  },
  computed: {
    //
  },
  methods: {
    //
  }
};
</script>