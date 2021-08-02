<template>
	<div>
		<div class="row">
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding: 10px;">
				<q-card class="my-card shadow-3" style="display:flex;">
					<div style="width:50%;">
						<q-card class="my-card shadow-2 header-margin" style="height: 100%;">
							<q-card-section>
								<label class="header-margin header-amount">€{{cAmount.Committed ? cAmount.Committed : 0}}</label>
								<label class="header-margin header-data"><b>Commited </b>Amount</label>
							</q-card-section>
						</q-card>
					</div>
					<q-card-section style="width:50%;padding: 12px;">
						<label class="header-margin Overview">Overview</label>
						<div class="header-margin">
							<q-input class="header-margin bg-white text-white rounded-borders" dense outlined v-model="fromDate"  ref="CPDate" 
								style="background:white; width: 180px;margin: 7px 0px;">
					
								<template v-slot:append>
									<q-icon name="event" class="cursor-pointer text-indigoC">
										<q-popup-proxy ref="fromDate" transition-show="scale" transition-hide="scale">
											<q-date v-model="fromDate" mask="YYYY-MM-DD" @input="UpdateFromDate()">
											</q-date>
										</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
						</div>
						<div class="header-margin">
							<q-input class="bg-white text-white rounded-borders" dense outlined v-model="toDate"
								ref="TODate" style="background:white; width: 180px;margin: 7px 0px;">
								<template v-slot:append>
									<q-icon name="event" class="cursor-pointer text-indigoC">
										<q-popup-proxy ref="toDate" transition-show="scale" transition-hide="scale">
											<q-date v-model="toDate" :options="optionsDateFuture" mask="YYYY-MM-DD" @input="UpdateDate()">
											</q-date>
										</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
						</div>
					</q-card-section>
				</q-card>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding: 10px;">
				<q-card class="my-card shadow-3" style="display:flex;">
					<div style="width:50%;">
						<q-card class="my-card shadow-2 header-margin" style="height: 100%;">
							<q-card-section>
								<label class="header-margin header-amount">€{{pAmount.pendig ? pAmount.pendig : 0}}</label>
								<label class="header-margin header-data"><b>Pending</b>Amount</label>
							</q-card-section>
						</q-card>
					</div>
					<div class="header-margin" style="width:50%;">
						<q-card-section>
							<label class="header-margin header-amount">€{{orderLost.Order ? orderLost.Order : 0}}</label>
							<label class="header-margin header-data"><b>Order</b>Lost</label>
						</q-card-section>
					</div>
					
				</q-card>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding: 10px;">
				<q-card class="my-card shadow-3" style="display:flex;">
					<div style="width:50%;">
						<q-card class="my-card shadow-2 header-margin" style="height: 100%;">
							<q-card-section>
								<label class="header-margin Overview">Country</label>
								<div class="header-margin">
									<q-select
										color="grey-3"
										outlined
										dense
										:options="allCountrys"
										v-model="selectCountry"
										@input=" onClickCountry(selectCountry), apiCallAtInput()"
										style="width: 160px;margin: 7px 0px;"
										options-dense
									>
									</q-select>
								</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="header-margin" style="width:50%;">
						<q-card-section>
							<label class="header-margin Overview">Product Type</label>
							<div class="header-margin">
								<q-select
									color="grey-3"
									outlined
									dense
									:options="allProductTypes"
									v-model="selectProduct"
									@input="onClickProduct(selectProduct),apiCallAtInput()"
									style="width: 160px;margin: 7px 0px;"
									options-dense
								>
								</q-select>
							</div>
						</q-card-section>
					</div>
					
				</q-card>
			</div>
		</div>
		<div class="row" >
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding:10px;">
				<q-card class="leaderboard-card shadow-3">
					<q-card-section style="padding:5px 12px 2px 12px;">
						<label class="title">Leaderboard</label>
					</q-card-section>
					<q-separator style="height: 2px; margin: 5px 0px 5px 0px;color:rgb(53, 52, 52);"/>
						<Leaderboard :committedCustomers="committedCustomers" :graphData="graphData"/>
						<div class="row" style="margin-bottom: -30px;">
							<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-new-div">
								<q-card-section>
									<!--<apexchart type="bar" :options="chartOptions" :series="series" style="margin:-15px;height:100px;"></apexchart>-->
									<apexchart type="line" height="350" :options="customerchartOptions" :series="customerseries"></apexchart>
								</q-card-section>
							</div>
						</div>
				</q-card>
				<DueDaysChart />
			</div>
			<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12" style="padding:10px;">
				<Questions :allQuestionsAnswers="allQuestionsAnswers" :ograph="ograph"/>
				<div class="row">
					<Status :currentstatus="currentstatus"/>
				</div>
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
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date();
  },
	created(){
		this.QuestionsAnswers();
		console.log('SELECTED DATE',this.toDate);
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date();

    // console.log("MONTH START",moment(firstDay).format('DD-MM-YYYY'));
    localStorage.setItem("mStartDate",moment(firstDay).format('YYYY-MM-DD'));
    // console.log("CURRENT DATE",moment(lastDay).format('DD-MM-YYYY'));
    localStorage.setItem("mEndDate",moment(lastDay).format('YYYY-MM-DD'));

    localStorage.setItem("fromDate",localStorage.getItem("fromDate") ? localStorage.getItem("fromDate") : localStorage.getItem("mStartDate"));
    localStorage.setItem("toDate",localStorage.getItem("toDate") ? localStorage.getItem("toDate") : localStorage.getItem("mEndDate"));


    var that = this;
    var pastDate = moment().subtract(7, 'days').toDate();
    pastDate = moment(pastDate).format('YYYY-MM-DD');
    // console.log("pastDate", pastDate);
    // localStorage.setItem("pastDate",pastDate);

    var dd = String(this.date.getDate()).padStart(2, '0');
    var mm = String(this.date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.date.getFullYear();
    var today = this.date;
    today = yyyy + '-' + mm + '-' + dd;
    // console.log("TODAY", today);
    // localStorage.setItem("today",today);

    window.addEventListener('resize', () => {
      // console.log("innerWidth", window.innerWidth);
      if(window.innerWidth < 500){
        this.circularSize="75px";
      }else{
        this.circularSize="90px";
      }
    }),
		console.log("FROMDATE",localStorage.getItem('fromDate'))
    setTimeout(()=>{
      console.log("FROMDATE", localStorage.getItem('fromDate'));
      
			that.getAllCountryName();
			that.getAllProductType();
			that.LastCommittedCustomers();
			that.LastCommittedCustomersGraph();
			that.CommittedAmount();
      that.PendingAmount();
      that.OrderLost();
			that.OverviewGraph();
			that.CurrentStatus();
    },200)
	},
	computed:{
    ...mapState({
			allCountrys:"allCountrys",
			allProductTypes:"allProductTypes",
			cAmount:"cAmount",
      pAmount:"pAmount",
      orderLost:"orderLost",
			allQuestionsAnswers:"allQuestionsAnswers",
			ograph:"ograph",
			currentstatus:"currentstatus",
			committedCustomers:"committedCustomers",
			graphData:"graphData"
    }),
  },
	data () {
		return {
			customerseries: [{
        name: 'Amount',
        data: []
      }],
      customerchartOptions: {
        chart: {
          height: 350,
          type: 'line',
					toolbar: {
						show: false
					},
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },
        xaxis: {
          categories: [],
          tickAmount: 10,
        },
        title: {
          text: 'Committed opportunity value over time',
          align: 'left',
          style: {
            fontSize: "14px",
            color: '#666'
          }
        },
        markers: {
          size: 4,
          colors: ["#EEB018"],
          strokeColors: "#EEB018",
          strokeWidth: 2,
          hover: {
            size: 7,
          }
        },
        yaxis: {
        }
      },
			chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        colors:['#4d80e4', '#c10015'],
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 6
        },
      },
      series: [
        {
          name: 'Pending Task',
          data: []
        }
      ],
			date:new Date(),
			selectCountry:{
        label:'All',
        value:0
      },
			selectProduct:{
        label:'All',
        value:0
      },
			fromDate:localStorage.getItem('fromDate'),
      toDate:localStorage.getItem('toDate'),
		}
	},
	methods:{
		UpdateFromDate(){
			this.$refs.fromDate.hide();
			if(this.fromDate > this.toDate){
				this.toDate = "";
			}
			if(this.toDate){
				this.UpdateDate();
			}
		},
    optionsDateFuture(date){
      return date >= moment(this.fromDate,'YYYY-MM-DD').format('YYYY/MM/DD');
      // return date >= moment(this.fromDate,'YYYY-MM-DD').format('YYYY-MM-DD');
    },
		apiCallAtInput(){
			this.CurrentStatus();
      this.LastCommittedCustomers();
      this.LastCommittedCustomersGraph();
      this.OverviewGraph();
      this.QuestionsAnswers();
      this.CommittedAmount();
      this.PendingAmount();
      this.OrderLost();
		},
		onClickCountry(selectCountry){
			this.LastCommittedCustomersGraph();
			console.log("selectCountry",selectCountry.value);
			localStorage.setItem("selectCountry",selectCountry.value)
    },
		onClickProduct(selectProduct){
			console.log("selectProduct",selectProduct.value);
			localStorage.setItem("selectProduct",selectProduct.value)
    },
    UpdateDate(){
      this.$refs.toDate.hide();
      console.log("Date Updated");
      localStorage.setItem("fromDate",this.fromDate);
      localStorage.setItem("toDate",this.toDate);
      this.LastCommittedCustomers();
      this.LastCommittedCustomersGraph();
      this.OverviewGraph();
      //this.CurrentStatus();
      this.QuestionsAnswers();
      this.CommittedAmount();
      this.PendingAmount();
      this.OrderLost();
    },
		getAllCountryName(){
      this.$store.dispatch("getAllCountryName", {this:this})
      .then((data) => {
      })
      .catch(err => {
          console.log("ERRORs",err);
      })
    },
		getAllProductType(){
      this.$store.dispatch("getAllProductType", {this:this})
      .then((data) => {
      })
      .catch(err => {
          console.log("ERRORs",err);
      })
    },
		QuestionsAnswers(){
			this.$store.dispatch("QuestionsAnswers", {this:this})
			.then((data) => {
			// this.$router.push({ name: "dashboard" });
			})
			.catch(err => {
				console.log("ERRORs",err);
			})
		},
		CommittedAmount(){
      this.$store.dispatch("CommittedAmount", {this:this})
      .then((data) => {
      })
      .catch(err => {
          console.log("ERRORs",err);
      })
    },
    PendingAmount(){
      this.$store.dispatch("PendingAmount", {this:this})
      .then((data) => {
      })
      .catch(err => {
          console.log("ERRORs",err);
      })
    },
    OrderLost(){
      this.$store.dispatch("OrderLost", {this:this})
      .then((data) => {
      })
      .catch(err => {
          console.log("ERRORs",err);
      })
    },
		OverviewGraph(){
			this.$store.dispatch("OverviewGraph", {this:this})
			.then((data) => {
			})
			.catch(err => {
					console.log("ERRORs",err);
			})
		},
		CurrentStatus(){
			this.$store.dispatch("CurrentStatus", {this:this})
			.then((data) => {
			})
			.catch(err => {
					console.log("ERRORs",err);
			})
		},
		LastCommittedCustomers(){
      this.$store.dispatch("LastCommittedCustomers", {this:this})
			.then((data) => {
			})
			.catch(err => {
					console.log("ERRORs",err);
			})
    },
		LastCommittedCustomersGraph(){
      this.$store.dispatch("LastCommittedCustomersGraph", {this:this})
      .then((data) => {
      })
      .catch(err => {
          console.log("ERRORs",err);
      })
    },
	}
}
</script>

<style lang="scss" scoped>
.header-margin{
	display:flex;
	justify-content:center;
	align-items:center;
}
.header-amount{
	font-size: 32px;
  font-weight: 900;
}
.header-data{
	text-transform:uppercase;
	font-size: 13px;
}
.Overview{
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.4px;
}
.text-indigoC{
  color: #26193c;
}
.bg-indigoC {
  background: #26193c;
}
b{
	padding-right:4px;
}
.q-input{
	height: 2.2em;
}
.my-card{
	height: 134px;
	border-radius: 15px;
}
.title{
	font-weight: 700;
	font-size: 16px;
	letter-spacing: 0.2px;
}
.leaderboard-card{
		width: 100%;
		padding-bottom: 8px;
		border-radius: 15px;
	}
</style>