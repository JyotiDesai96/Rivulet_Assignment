<template>
  <div class="home">
    <notifications group="foo" position="top center"/>
    <q-header elevated class="back-color">
      <q-toolbar style="display:flex;justify-content:space-between;">
        <q-toolbar-title class="div-logo">
          <img
            src="../assets/download.png"
            class="logo"
          >
        </q-toolbar-title>
        <q-toolbar-title style="font-size: 13px;">
           <div class="logout-btn-div">
            <i class="fas fa-user"/>
            <span style="margin-right: 15px;margin-left: 5px;">{{user}}</span>
            <i class="fas fa-power-off" style="cursor:pointer" @click="logout">
              <q-tooltip anchor="bottom middle" self="center middle">Logout</q-tooltip>
            </i>
          </div>
       </q-toolbar-title>
        
      </q-toolbar>
    </q-header>
    <q-page-container class="page-block">
      <q-page style="min-height: 400px;">
        <transition name="slide" mode="out-in">
        <router-view />
        </transition>
      </q-page>
    </q-page-container>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import moment from "moment";
export default {
  name: 'Home',
  components: {

  },
  beforeCreate(){
 
  },
  created() {
  },
  data(){
    return{
      date:new Date(),
      user:localStorage.getItem("username"),

      drawer: false,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#ffc776',
        width: '9px',
        opacity: 0.2
      },
    }
  },
  computed:{
    ...mapState({
    })
  },

  methods:{
    logout(){
      this.$router.push({ name: "login" });
      location.reload();
    },
  }
}
</script>

<style lang="scss">
@import 'src/assets/css/_variables.scss';

.q-drawer__content{
  background: rgb(255,255,255) !important;
}
.dashboard-page{
  /* background: rgb(229,230,231); */
}
.drawer{
  /* background-color: white; */
}
.logout-icon{
  position: absolute;
  margin-left: 160px;
  margin-top: -55px;
  cursor: pointer;
}
.sidebar-item{
  margin: 5px;
  // font-size: 1.125rem;
  cursor: pointer;
  font-weight: 500;
  /* border-radius: 5px; */
}


.logout-btn-div{
  float:right;
  padding: 5px 10px;
  position: absolute;
  right: 0px;
  z-index: 10;
  color:black;
  margin-top: -25px;
}
.div-logo{
}
.page-block{
  background: #ffffff;
  margin: 1%;
}
.logo{
  height: 45px;
  margin: 30px 20px 20px 20px !important;
  margin-left:4%;
}
.back-color{
  background-color: rgb(255,255,255) !important;
  height: 85px;
}
</style>
