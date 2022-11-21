<template>
  <main>
    <!-- About US Start -->
    <div class="about-area">
      <div class="container">
        <!-- Hot Aimated News Tittle-->
        <div class="row">
          <div class="col-lg-12">
            <div class="trending-tittle">
              <strong>Trending now</strong>
              <!-- <p>Rem ipsum dolor sit amet, consectetur adipisicing elit.</p> -->
              <div class="trending-animated">
                <ul id="js-news" class="js-hidden">
                  <li class="news-item">HELLO THIS IS PRESENTING</li>
                  <li class="news-item">FROM THANDAR DAILY NEWS</li>
                  <li class="news-item">
                    HAVE A NICE DAY VIEWING YOUR FAVORITE NEWS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8" v-if="post && token">
            <!-- Trending Tittle -->
            <div class="about-right">
              <div class="about-img">
                <img :src="post.image" alt="" />
              </div>
              <div class="section-tittle mb-30 pt-30">
                <h3>{{ post.title }}</h3>
              </div>
              <div class="about-prea">
                <p class="about-pera1 mb-25">
                  {{ post.description }}
                </p>
                <p class="about-pera1 mb-25">
                  Post was created at {{ formattedDate }}.
                </p>
                <h6 class="about-pera1 mb-25">
                  <i class="fas fa-eye"></i> : {{ viewCount }}
                </h6>
              </div>
              <div class="social-share pt-30">
                <div class="section-tittle">
                  <h3 class="mr-20">Share :</h3>
                  <ul>
                    <li>
                      <a href="#"
                        ><img src="assets/img/news/icon-ins.png" alt=""
                      /></a>
                    </li>
                    <li>
                      <a href="#"
                        ><img src="assets/img/news/icon-fb.png" alt=""
                      /></a>
                    </li>
                    <li>
                      <a href="#"
                        ><img src="assets/img/news/icon-tw.png" alt=""
                      /></a>
                    </li>
                    <li>
                      <a href="#"
                        ><img src="assets/img/news/icon-yo.png" alt=""
                      /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- Back Button -->
            <div class="row">
              <div class="col-lg-8">
                <div class="form-group my-3">
                  <button
                    type="button"
                    class="button button-contactForm boxed-btn"
                    @click="$router.go(-1)"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <!-- Section Tittle -->
            <div class="section-tittle mb-40">
              <h3>Follow Us</h3>
            </div>
            <!-- Flow Socail -->
            <div class="single-follow mb-45">
              <div class="single-box">
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#"
                      ><img src="assets/img/news/icon-fb.png" alt=""
                    /></a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#"
                      ><img src="assets/img/news/icon-tw.png" alt=""
                    /></a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#"
                      ><img src="assets/img/news/icon-ins.png" alt=""
                    /></a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#"
                      ><img src="assets/img/news/icon-yo.png" alt=""
                    /></a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- New Poster -->
            <div class="news-poster d-none d-lg-block">
              <img src="assets/img/news/news_card.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- About US End -->
  </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "PostDetails",
  data() {
    return {
      post: null,
      formattedDate: "",
      viewCount: 0,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.userData,
      token: (state) => state.token,
    }),
  },
  methods: {
    changeDateFormat(date) {
      const d = new Date(date);
      this.formattedDate =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    },
    increaseViewCount(postId) {
      axios
        .post("http://127.0.0.1:8000/api/post/action", {
          postId,
          userId: this.user.id,
        })
        .then((response) => (this.viewCount = response.data.viewCount));
    },
    loadPostData(postId) {
      axios
        .post("http://127.0.0.1:8000/api/post/details", { postId })
        .then((response) => {
          response.data.post.image =
            "http://127.0.0.1:8000/storage/" + response.data.post.image;
          this.post = response.data.post;
          this.changeDateFormat(this.post.created_at);
        })
        .catch((error) => console.log(error.message));
    },
  },
  mounted() {
    const postId = this.$route.query.post_id;
    this.loadPostData(postId);
    if (this.user) {
      this.increaseViewCount(postId);
    }
  },
};
</script>