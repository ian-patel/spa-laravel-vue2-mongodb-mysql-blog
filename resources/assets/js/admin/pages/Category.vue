<template>
  <div class="category-list mb-3">
    <div class="category-list__filters mb-3">
      <el-button size="mini" type="primary" icon="el-icon-plus"
        >Add</el-button>
      <el-input class="category-list__search-input mr-2" size="mini" placeholder="Search Category" />
      <el-checkbox class="mr-2">Include Deleted</el-checkbox>
    </div>

    <el-table class="category-list__table mb-3" stripe size="mini" :data="categories" row-key="id" border >

      <el-table-column label="Title" :width="150" prop="title" />
      
      <el-table-column label="Image" :width="150">
        <template slot-scope="scope">
          <img :src="scope.row.image" :width="130" />
        </template>
      </el-table-column>

      <el-table-column label="Description" :width="400" prop="desc" />

      <el-table-column label="Active" :width="100" >
        <template slot-scope="scope">
          <i class="el-icon-circle-check"></i>
        </template>
      </el-table-column>


      <el-table-column label="Posts" :width="100" prop="posts_count" />

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini" >Edit</el-button>
          <el-button size="mini" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="totalCategories"
      @size-change="limit = $event"
      @current-change="page = $event"
      />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      limit: 5,
      page: 1,
    };
  },
  watch: {
    fetchQuery() {
      this.fetchData();
    },
  },
  computed: {
    ...mapGetters(['categories', 'totalCategories']),
    fetchQuery() {
      return {
        limit: this.limit,
        page: this.page,
      };
    },
  },
  mounted() {
    if (!this.categories) {
      this.fetchCategories(this.fetchQuery);
    }
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ]),
    fetchData() {
      this.fetchCategories(this.fetchQuery);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.category-list__search-input {
  display: inline-block;
  width: 200px;
}
</style>
