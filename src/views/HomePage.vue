<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-8">
        <div class="auth-wrapper auth-basic px-2">
          <div class="auth-inner my-2">
            <div class="card mb-0">
              <div class="card-body">
                <form
                  @submit.prevent="submitHandler"
                  class="auth-login-form mt-2"
                >
                  <div class="mb-1">
                    <BaseInput
                      v-model="email"
                      label="Email"
                      type="email"
                      :error="$v.email.$error ? true : false"
                      @blur="$v.email.$touch()"
                    />
                    <template v-if="$v.email.$error">
                      <p v-if="!$v.email.required" class="small text-danger">
                        Email is required.
                      </p>
                      <p v-if="!$v.email.email" class="small text-danger">
                        Please enter a valid email.
                      </p>
                    </template>
                  </div>

                  <div class="mb-1">
                    <BaseInput
                      v-model="password"
                      label="Password"
                      type="password"
                      :error="$v.password.$error ? true : false"
                      @blur="$v.password.$touch()"
                    />
                    <template v-if="$v.password.$error">
                      <p v-if="!$v.password.required" class="small text-danger">
                        Password is required.
                      </p>
                      <p
                        v-if="!$v.password.minLength"
                        class="small text-danger"
                      >
                        Password must be greater than 7 characters.
                      </p>
                    </template>
                  </div>

                  <div class="form-button">
                    <button
                      id="submit"
                      type="submit"
                      class="btn btn-primary w-100 waves-effect waves-float waves-light"
                      :disabled="loading || $v.$anyError"
                    >
                      <span
                        v-show="loading"
                        class="spinner-border text-light spinner-border-sm mx-2"
                        role="status"
                      ></span>
                      <span>Login</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(7),
    },
  },
  methods: {
    ...mapActions("authStore", [
      "loginUser",
    ]),

    submitHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = {
          email: this.email,
          password: this.password,
        };
        this.loading = true;
        this.loginUser(formData);
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
@import "@/assets/css/home.css";
</style>
