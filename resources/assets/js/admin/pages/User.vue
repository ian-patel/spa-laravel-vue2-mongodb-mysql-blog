<template>
  <div class="user-list mb-3">
    <div class="user-list__filters mb-3">
      <el-button size="mini" type="primary" icon="el-icon-plus">Add</el-button>
      <el-input class="user-list__search-input mr-2" size="mini" placeholder="Search users" />
      <el-checkbox class="mr-2">Include Deleted</el-checkbox>
    </div>

    <el-table class="user-list__table mb-3" stripe size="mini" :data="users" row-key="id" >

      <el-table-column label="" :width="70">
        <template slot-scope="scope" >
          <img :src="scope.row.avatar" :width="50" class="user-list__avatar"/>
        </template>
      </el-table-column>

      <el-table-column label="Name" :width="150" prop="name" />

      <el-table-column label="Email" :width="200" prop="email" />

      <el-table-column label="Role" :width="150" prop="role" />

      <el-table-column label="Active" :width="100">
        <template slot-scope="scope">
          <i class="el-icon-circle-check"></i>
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini">Edit</el-button>
          <el-button size="mini" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="totalUsers"
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
      limit: 10,
      page: 1,
    };
  },
  watch: {
    fetchQuery() {
      this.fetchData();
    },
  },
  computed: {
    ...mapGetters(['users', 'totalUsers']),
    fetchQuery() {
      return {
        limit: this.limit,
        page: this.page,
      };
    },
  },
  mounted() {
    if (!this.users) {
      this.fetchUsers(this.fetchQuery);
    }
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ]),
    fetchData() {
      this.fetchUsers(this.fetchQuery);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/admin/helpers";

.user-list__search-input {
  display: inline-block;
  width: 200px;
}
.user-list__avatar {
  border-radius: 50%;
}
</style>
