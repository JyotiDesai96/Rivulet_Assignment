<template>
  <div>
    <q-page-container class="bg-image">
      <q-page class="center-page">
        <div class="row">
          <div class="col-md-4 col-lg-4 col-sm-3 col-xs-1"></div>
          <div class="col-md-4 col-lg-4 col-sm-6 col-xs-10 vertical-middle">
            <q-card style="padding: 15px">
              <q-form class="q-gutter-md" @submit.prevent="getUsers">
                <!-- @submit="onSubmit"
                                    @reset="onReset" -->
                <q-card-section align="center">
                  <img
                    src="../assets/download.png"
                    style="height: 70px; width: 260px"
                  />
                </q-card-section>
                <q-card-section>
                  <q-input
                    dense
                    outlined
                    bottom-slots
                    v-model="username"
                    label="Email"
                    :rules="[(val) => (val && val.length > 0) || 'required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn class="btn-login" type="submit" label="Login" />
                </q-card-actions>
              </q-form>
            </q-card>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-3 col-xs-1"></div>
        </div>
      </q-page>
    </q-page-container>
  </div>
</template>
<script>
export default {
  created() {
    this.getUsers();
    // localStorage.removeItem("token");
  },
  data() {
    return {
      url: "../assets/pm2.jpg",
      username: "",
      password: "",
    };
  },
  methods: {
    getUsers() {
      this.$store
        .dispatch("getUsers", { this: this })
        .then(() => {
          // this.$router.push({ name: "overview" });
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    },
    
  },
};
</script>
<style scoped>
.btn-login{
  color:rgb(183,146,107);
  background:rgb(0,0,0);
}
.login-card {
  width: 30%;
}
.bg-image {
  background-image: url("../assets/pm3.jpg");
  background-repeat: no-repeat;
}
.center-page {
  padding: 70px 0;
}
</style>
