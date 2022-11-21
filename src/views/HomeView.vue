<template>
  <!-- Whats New Start -->
  <section class="whats-news-area pt-50 pb-20">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row d-flex justify-content-between">
            <div class="col-lg-3 col-md-3">
              <div class="section-tittle mb-30">
                <h3>Whats New</h3>
              </div>
            </div>
            <div class="col-lg-9 col-md-9">
              <div class="properties__button">
                <!--Nav Button  -->
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      class="nav-item nav-link active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      @click="filterPosts(null)"
                      >All</a
                    >
                    <a
                      class="nav-item nav-link"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                      v-for="category in categories"
                      :key="category.id"
                      @click="filterPosts(category.id)"
                      >{{ category.name }}</a
                    >
                  </div>
                </nav>
                <!--End Nav Button  -->
              </div>
            </div>
          </div>
          <div class="mb-4 col-sm-4 offset-8">
            <input
              type="text"
              class="form-control"
              v-model="searchKey"
              placeholder="Search posts..."
              @keyup.enter="search"
            />
          </div>
          <div class="row">
            <div class="col-12">
              <!-- Nav Card -->
              <div class="tab-content" id="nav-tabContent" v-if="hasLoggedIn">
                <!-- card one -->
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div class="whats-news-caption">
                    <div class="row" v-if="posts">
                      <div
                        class="col-lg-6 col-md-6"
                        v-for="post in posts"
                        :key="post.id"
                        @click="goToDetails(post.id)"
                      >
                        <div class="single-what-news mb-100">
                          <div class="what-img">
                            <img :src="post.image" alt="" />
                          </div>
                          <div class="what-cap">
                            <span class="color1">Breaking News</span>
                            <h4>
                              <a href="#">{{ post.title }}</a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <h4 class="alert alert-info">Loading Posts ...</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-content" v-else>
                <div class="alert alert-danger">
                  <p
                    style="margin-bottom: 0 !important"
                    class="text-capitalize text-center"
                  >
                    You don't have permission to view news. Please log in first.
                  </p>
                </div>
              </div>
              <!-- End Nav Card -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Whats New End -->

  <!--Start pagination -->
  <div class="pagination-area pb-45 text-center">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="single-wrap d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-start">
                <li class="page-item">
                  <a class="page-link" href="#"
                    ><span class="flaticon-arrow roted"></span
                  ></a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">01</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">02</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">03</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#"
                    ><span class="flaticon-arrow right-arrow"></span
                  ></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End pagination  -->
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "HomeView",
  data() {
    return {
      posts: null,
      categories: null,
      searchKey: "",
      hasLoggedIn: false,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    // load post api
    getPostsData() {
      axios
        .get("http://127.0.0.1:8000/api/posts")
        .then((response) => {
          for (let i = 0; i < response.data.posts.length; i++) {
            const element = response.data.posts[i];
            element.image = "http://127.0.0.1:8000/storage/" + element.image;
          }

          this.posts = response.data.posts;
        })
        .catch((error) => console.log(error.message));
    },
    // load category api
    loadCategory() {
      axios
        .get("http://127.0.0.1:8000/api/categories")
        .then((response) => {
          this.categories = response.data.categories;
        })
        .catch((error) => console.log(error.message));
    },
    // search data with post title
    search() {
      const searchKey = this.searchKey;
      axios
        .post("http://127.0.0.1:8000/api/search/posts", { searchKey })
        .then((response) => {
          for (let i = 0; i < response.data.results.length; i++) {
            const element = response.data.results[i];
            element.image = "http://127.0.0.1:8000/storage/" + element.image;
          }

          this.posts = response.data.results;
        })
        .catch((error) => console.log(error.message));
    },
    filterPosts(categoryId) {
      axios
        .post("http://127.0.0.1:8000/api/search/categories", { categoryId })
        .then((response) => {
          for (let i = 0; i < response.data.results.length; i++) {
            const element = response.data.results[i];
            element.image = "http://127.0.0.1:8000/storage/" + element.image;
          }

          this.posts = response.data.results;
        })
        .catch((error) => console.log(error.message));
    },
    goToDetails(post_id) {
      this.$router.push({ path: "/details", query: { post_id } });
    },
  },
  mounted() {
    if (this.token) {
      this.hasLoggedIn = true;
    } else {
      this.hasLoggedIn = false;
    }
    this.getPostsData();
    this.loadCategory();
  },
};
</script>