<template>
  <main>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-8 offset-2 shadow-sm p-3">
          <div class="alert alert-danger" v-if="loggedInFailed">
            <small>The credentials do not match!</small>
          </div>
          <form @submit.prevent="handleSubmit">
            <legend
              class="
                p-3
                bg-danger bg-opacity-10
                border border-danger
                rounded-end
                mb-3
              "
            >
              Login First
            </legend>
            <div class="row mb-3">
              <label for="inputEmail" class="col-sm-2 col-form-label"
                >Email</label
              >
              <div class="col-sm-10">
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  v-model="user.email"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword" class="col-sm-2 col-form-label"
                >Password</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  v-model="user.password"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-danger">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loggedInFailed: false,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://127.0.0.1:8000/api/user/login", this.user)
        .then((response) => {
          this.store(response.data);
          if (this.token) {
            this.$router.push({
              name: "Home",
            });
          } else {
            this.loggedInFailed = true;
          }
        });
    },
    // store user data and token in global state
    store(data) {
      this.$store.dispatch("storeToken", data.token);
      this.$store.dispatch("storeUserData", data.user);
    },
  },
};
</script>