<template>
  <div class="post-edit__body">

    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item v-if="action=='edit'">
        <el-button icon="el-icon-news" type="info" plain size="mini" @click="redirectToBlog()">View</el-button>
        <el-button icon="el-icon-edit" type="info" plain size="mini">Comments</el-button>
        <el-button type="danger" @click="deletePost()" icon="el-icon-circle-close" size="mini" v-if="deletable">Delete</el-button>
      </el-form-item>

      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title" placeholder="Title" ></el-input>
      </el-form-item>

      <el-form-item label="Details" prop="details">
        <el-input type="textarea" v-model="form.details" placeholder="Short details"></el-input>
      </el-form-item>

      <el-form-item label="Image" prop="image">
        <el-input v-model="form.image" placeholder="Paste the image valid url"></el-input>
      </el-form-item>

      <el-form-item label="">
        <img :src="form.image" width="200"/>
      </el-form-item>

      <el-form-item label="Category" v-if="categories" prop="category_id">
        <select v-model="form.category_id">
          <template v-for="category of categories">
            <option :value="category._id">{{ category.title }}</option>
          </template>
        </select>
      </el-form-item>

      <el-form-item label="Body" prop="body">
        <el-input type="textarea" v-model="form.body" placeholder="body" class="post-edit__textarea"></el-input>
      </el-form-item>
  
      <el-form-item>
         <el-button type="primary" @click="edit()" size="mini" v-if="action=='edit'">Save</el-button>
         <el-button type="primary" @click="add()" size="mini" v-if="action=='add'">Add</el-button>
         <el-button @click="cancel()" size="mini">Cancel</el-button>
       </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    id: {
      type: String,
    },
  },
  watch: {
    id() {
      this.fetchData();
    },
    post(value) {
      this.form = _.cloneDeep(value);
    }
  },
  data() {
    return {
      action: this.id ? 'edit' : 'add',
      form: {
        title: '',
        details: '',
        image: '',
        category_id: '',
        body: '',
      },
      rules: {
        title: [
          { required: true, message: 'Please enter title.', trigger: 'blur' },
        ],
        details: [
          { required: true, message: 'Please enter short details about the post.', trigger: 'blur' },
        ],
        image: [
          { required: true, message: 'Please paste the image url.', trigger: 'blur' },
        ],
        category_id: [
          { required: true, message: 'Please select the category.', trigger: 'blur' },
        ],
        body: [
          { required: true, message: 'Please write brief details about the post.', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'getPostById',
      'categories'
    ]),
    post() {
      if (this.id) {
        return this.getPostById(this.id);
      }
    },
    deletable() {
      return this.post && this.post.active;
    }
  },
  mounted() {
    if (!this.categories) this.getCategories();
    if (this.action == 'edit') {
      this.post ? this.form = this.post : this.fetchData();       
    }
  },
  methods: {
    ...mapActions([
      'editPost',
      'addPost',
      'fetchPost',
      'deletePostById',
      'fetchCategories',
    ]),
    async fetchData() {
      await this.fetchPost(this.id);
    },
    async getCategories() {
      await this.fetchCategories();
    },
    redirectToBlog() {
      window.open('/posts/' + this.post._id, "_blank");
    },
    async deletePost() {
      const response = await this.deletePostById(this.id);
      if (response) {
        this.$message({
          message: 'Post deleted.',
          type: 'success'
        });
        this.$router.push({ name: 'posts' });
      }
    },
    async edit() {
      if (await this.$refs.form.validate()) {
        const response = await this.editPost({ _id: this.post._id, data: this.form });
        if (response) {
          this.$message({
            message: 'Post updated.',
            type: 'success'
          });
        }
      }
    },
    async add() {
      if (await this.$refs.form.validate()) {
        const response = await this.addPost({data: this.form });
        if (response) {
          this.$message({
            message: 'Post added.',
            type: 'success'
          });
          this.$router.push({ name: 'posts' });
        }
      }
    },
    cancel() {
      this.$router.push({ name: 'posts' });    
    }
  }
};
</script>

<style lang="scss" scoped>

.post-edit {

  &__body {
    width: 70%;
  }

  &__textarea {
    height: 100px;
  }
}
</style>