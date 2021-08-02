<template>
	<div>
    <div class="row">
			<div class="col-lg-2 col-md-2">
			</div>
			<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
				<q-btn flat style="color: #FF0080" label="Create Post" @click="openCreatePostDailog()"/>
				<q-btn flat style="color: #FF0080" label="Posts" @click="loginUserPosts()"/>
				<q-btn flat style="color: #FF0080" label="Post Comments" @click="postComments()"/>

				<div v-if="postDailog" class="row">
						<q-card class="my-card">
							<q-card-section>
								
							<q-form class="q-gutter-md" @submit.prevent="CreatePost()">
                <q-card-section>
                  <q-input
                    dense
                    outlined
                    bottom-slots
                    v-model="title"
                    label="Post title"
                    :rules="[(val) => (val && val.length > 0) || 'required']"
                  >
                  </q-input>
									<q-input
                    dense
                    outlined
                    bottom-slots
                    v-model="body"
                    label="Post body"
                    :rules="[(val) => (val && val.length > 0) || 'required']"
                  >
                  </q-input>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn class="btn-login" type="submit" label="Create Post" />
                </q-card-actions>
              </q-form>

							</q-card-section>
						</q-card>
				</div>
				<div v-if="loginUserPostDailog" class="row">
					<q-card class="commentCard" style="margin:15px;">
						<q-card-section >
							<div><b>ID :</b> {{userPosts.id}}</div><br/>
							<div><b>Title :</b><span>{{userPosts.title}}</span></div><br/>
							<div><b>Body :</b><span>{{userPosts.body}}</span></div>
							
						</q-card-section>
					</q-card>
				</div>
				<div v-if="commentsDailog" class="row">
					<q-card-section class="commentCard">
						<q-table
							id="custom-table"
							:pagination="initialPagination"
							virtual-scroll
							style="width: 100%;		border-radius: 15px;"
							table-header-class="bg-grey-7 text-white"
							class="customers shadow-3"
							:data="comments"
							:columns="columns"
							row-key="name" dense
						>	
							<template v-slot:body="props">
								<q-tr :props="props" @click="rowDetails(props.row)" dense>
									<q-td dense key="name" :props="props" >
										<q-item-label style= "width: 100px;"><b>{{ props.row.name}}</b></q-item-label>
									</q-td>
									<q-td dense key="email" :props="props" >
										<q-item-label><b>{{ props.row.email ? props.row.email : ''}}</b></q-item-label>
									</q-td>
									<q-td dense key="body" :props="props" >
										<q-item-label><b>{{ props.row.body}}</b></q-item-label>
									</q-td>
								</q-tr>
							</template>
						</q-table>
					</q-card-section>
				</div>
			</div>
			<div class="col-lg-2 col-md-2">
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import moment from "moment";

export default {
	components:{
	},
	beforeCreate(){
  },
	created(){
		this.getPosts();
		this.postComments();
	},
	computed:{
    ...mapState({
			posts:"posts",
			userPosts:"userPosts",
			comments:"comments"
    }),
  },
	data () {
		return {
			postDailog:true,
			loginUserPostDailog:false,
			commentsDailog:false,
			title:"",
			body:"",
			columns : [
				{ name: 'name',align: 'center', label: 'Name', field: row => row.name },
				{ name: 'email',align: 'center', label: 'Email', field: 'email' },
				{ name: 'body',align: 'center', label: 'Body', field: 'body' }
			],
			initialPagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 20
				},
				statusPagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 5
				},
		}
	},
	methods:{
		loginUserPosts(){
			this.postDailog=false;
			this.commentsDailog=false;
			this.loginUserPostDailog=true;
			this.$store
        .dispatch("loginUserPosts", { this: this })
        .then(() => {})
        .catch((err) => {
          this.error = err;
        });
		},
		postComments(){
			this.postDailog=false;
			this.commentsDailog=true;
			this.loginUserPostDailog=false;
			this.$store
        .dispatch("loginUserPostComments", { this: this })
        .then(() => {})
        .catch((err) => {
          this.error = err;
        });
		},
		CreatePost() {
      this.$store
        .dispatch("CreatePost", { this: this })
        .then(() => {})
        .catch((err) => {
          this.error = err;
        });
    },
		getPosts() {
      this.$store
        .dispatch("getPosts", { this: this })
        .then(() => {})
        .catch((err) => {
          this.error = err;
        });
    },
		openCreatePostDailog(){
			this.postDailog=true;
			this.loginUserPostDailog=false;
			this.commentsDailog=false;
		}
	}
}
</script>

<style lang="scss" scoped>
.my-card{
	width: 100%;
  max-width: 450px;
	margin:15px;
}
.commentCard{
	width: 100%;
	// max-width: 600px;
}
.btn-login{
  color:rgb(183,146,107);
  background:rgb(0,0,0);
	text-transform:capitalize;
}
#custom-table td{
		white-space: break-spaces;
	}
</style>