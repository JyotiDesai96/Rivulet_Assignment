import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import moment from "moment";

Vue.use(Vuex)
const querystring = require("querystring");
 const apiBizagi = "https://jsonplaceholder.typicode.com"; 

export default new Vuex.Store({
  state: {
    token:"",
    isLoading:false,
    users:[],
    posts:[],
    userPosts:{},
    comments:[]
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
      localStorage.setItem("token", token);
    },
    SET_USERS(state,users){
      state.users = users
    },
    SET_POSTS(state,posts){
      state.posts = posts
    },
    SET_LOGIN_USER_POSTS(state,userPosts){
      state.userPosts = userPosts
    },
    SET_LOGIN_USER_POST_COMMENTS(state,comments){
      state.comments = comments
    },
    SET_LOADING(state,isLoading){
      state.isLoading = isLoading
    },
  },
  actions: {
    getUsers({commit,dispatch}, This){
      commit("SET_LOADING", true);
      // axios.defaults.headers.common["Authorization"] = "bearer " + localStorage.getItem("token");
      return axios
        .get(
          apiBizagi + "/users")
        .then(({ data }) => {
          console.log("SET_USERS",data)
          console.log("FIND",This.this.username)
          if(This.this.username){
            var foundValue = data.filter(obj=>obj.email===This.this.username);
            localStorage.setItem("username",foundValue[0].name);
            localStorage.setItem("id",foundValue[0].id);
            if(foundValue.length != 0){
              This.this.$router.push({ name: "post" });
            }else
            {
              This.this.$notify({
                group: 'foo',
                type: 'warn',
                title: 'Warning message',
                text: 'unauthorized user'
              });
            }
            console.log("FIND USER",foundValue);
          }

        commit("SET_USERS", data);
        commit("SET_LOADING", false);
        })
        .catch(err => {
          console.log("Error", err)
          commit("SET_LOADING", false);
          if(err.response.status == 401){
            This.this.$router.push({ name: "login" });
          }else{
            This.this.$notify({
              group: 'foo',
              type:'error',
              title: 'Error message',
              text: err.message
            });
          }
        })
    },
    getPosts({commit,dispatch}, This){
      commit("SET_LOADING", true);
      return axios
        .get(
          apiBizagi + "/posts")
        .then(({ data }) => {
          console.log("get_POSTS",data)         
        
          commit("SET_POSTS", data);
          commit("SET_LOADING", false);
        })
        .catch(err => {
          console.log("Error", err)
          commit("SET_LOADING", false);
          if(err.response.status == 401){
            This.this.$router.push({ name: "login" });
          }else{
            This.this.$notify({
              group: 'foo',
              type:'error',
              title: 'Error message',
              text: err.message
            });
          }
        })
    },
    CreatePost({commit,dispatch}, This){

      commit("SET_LOADING", true);
      const sendData = {
        title: This.this.title,
        body: This.this.body,
        userId: localStorage.getItem("id"),
      }
      console.log("sendData",sendData);

      axios.post(apiBizagi + "/posts",sendData)
      .then(({ data, status }) => {
        console.log("RESULT",data);
        commit("SET_LOADING", false);
        This.this.$notify({
          group: 'foo',
          type:'success',
          title: 'post created successfully',
        });
        dispatch("getPosts", {this:This.this})
        
      })
 
      .catch(err => {
        console.log("Error", err)
        commit("SET_LOADING", false);
        if(err.response.status == 401){
          This.this.$router.push({ name: "login" });
        }else{
          This.this.$notify({
            group: 'foo',
            type:'error',
            title: 'Error message',
            text: err.message
          });
        }
      })
    },
    loginUserPosts({commit,dispatch}, This){
      commit("SET_LOADING", true);
      return axios
        .get(
          apiBizagi + "/posts/" + localStorage.getItem("id"))
        .then(({ data }) => {
          console.log("SET_LOGIN_USER_POSTS",data)         
        
          commit("SET_LOGIN_USER_POSTS", data);
          commit("SET_LOADING", false);
        })
        .catch(err => {
          console.log("Error", err)
          commit("SET_LOADING", false);
          if(err.response.status == 401){
            This.this.$router.push({ name: "login" });
          }else{
            This.this.$notify({
              group: 'foo',
              type:'error',
              title: 'Error message',
              text: err.message
            });
          }
        })
    },
    loginUserPostComments({commit,dispatch}, This){
      commit("SET_LOADING", true);
      return axios
        .get(
          apiBizagi + "/posts/" + localStorage.getItem("id") + "/comments")
        .then(({ data }) => {
          console.log("SET_LOGIN_USER_POST_COMMENTS",data)         
        
          commit("SET_LOGIN_USER_POST_COMMENTS", data);
          commit("SET_LOADING", false);
        })
        .catch(err => {
          console.log("Error", err)
          commit("SET_LOADING", false);
          if(err.response.status == 401){
            This.this.$router.push({ name: "login" });
          }else{
            This.this.$notify({
              group: 'foo',
              type:'error',
              title: 'Error message',
              text: err.message
            });
          }
        })
    },
  }
})
