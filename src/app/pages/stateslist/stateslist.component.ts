import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-stateslist',
  templateUrl: './stateslist.component.html',
  styleUrls: ['./stateslist.component.scss']
})
export class StatesListComponent implements OnInit {
	stateData: any;
	constructor(private projSvc:ProjectsService) { 
	  projSvc.getProjects().subscribe(result=>{
		this.stateData=result;
		this.createStatesList();
	  })
	}

	
	
	test() {
		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		function changeBg(flag){
			var myfront = document.getElementById("front");

			var newflag = flag % 3;
			if(newflag == 0){
				myfront.style.backgroundImage = "url('https://www.nrcs.usda.gov/Internet/FSE_MEDIA/stelprdb1049230.jpg')";
			}
			else if (newflag == 1){
				myfront.style.backgroundImage = "url('https://c4.wallpaperflare.com/wallpaper/798/928/859/united-states-california-valley-sunset-sea-landscape-ocean-photo-background-brown-bridge-near-ocean-wallpaper-preview.jpg')";
			}
			else{
				myfront.style.backgroundImage = "url('https://www.carnival.com/awaywego/wp-content/uploads/2018/06/mountains-in-kauai-hawaii.jpg')";
			}
		}
		var inputValue = (<HTMLInputElement>document.getElementById("slct")).value;
		var dataAsOf = this.stateData[inputValue][this.stateData[inputValue].length -1].date;
		var totalCases = this.stateData[inputValue][this.stateData[inputValue].length - 1].confirmed;
		var totalDeaths = this.stateData[inputValue][this.stateData[inputValue].length - 1].deaths;
		var allStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
		var allStateData = [['Alabama', 'https://www.alabamapublichealth.gov/covid19/'],['Alaska', 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.aspx'],['Arizona','https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-home'],['Arkansas', 'https://www.healthy.arkansas.gov/programs-services/topics/novel-coronavirus'],['California','https://covid19.ca.gov/'],['Colorado', 'https://covid19.colorado.gov/'],['Connecticut','https://portal.ct.gov/coronavirus'],['Delaware','https://coronavirus.delaware.gov/'],
						['Florida','https://floridahealthcovid19.gov/'],['Georgia','https://dph.georgia.gov/covid-19-daily-status-report'],['Hawaii','https://health.hawaii.gov/coronavirusdisease2019/'],['Idaho','https://coronavirus.idaho.gov/'],['Illinois', 'https://www.dph.illinois.gov/covid19/'],['Indiana','https://www.coronavirus.in.gov/'],['Iowa','https://coronavirus.iowa.gov/'],['Kansas','https://covid.ks.gov/'],['Kentucky', 'https://govstatus.egov.com/kycovid19'],['Louisiana','http://ldh.la.gov/Coronavirus/'],['Maine', 'https://www.maine.gov/covid19/'],['Maryland','https://coronavirus.maryland.gov/'],
						['Massachusetts', 'https://www.mass.gov/info-details/covid-19-response-reporting'],['Michigan','https://www.michigan.gov/coronavirus/'],['Minnesota','https://www.health.state.mn.us/diseases/coronavirus/'],['Mississippi','https://msdh.ms.gov/msdhsite/_static/14,0,420.html'],['Missouri','https://health.mo.gov/living/healthcondiseases/communicable/novel-coronavirus/'],['Montana','https://dphhs.mt.gov/publichealth/cdepi/diseases/coronavirusmt'],['Nebraska','http://dhhs.ne.gov/Pages/Coronavirus.aspx'],['Nevada','https://nvhealthresponse.nv.gov/'],
						['New Hampshire','https://www.nh.gov/covid19/'],['New Jersey','https://covid19.nj.gov/'],['New Mexico','https://cv.nmhealth.org/'],['New York', 'https://coronavirus.health.ny.gov/'],['North Carolina','https://covid19.ncdhhs.gov/'],['North Dakota','https://www.health.nd.gov/diseases-conditions/coronavirus'],['Ohio', 'https://coronavirus.ohio.gov/wps/portal/gov/covid-19/home'],['Oklahoma','https://coronavirus.health.ok.gov/'],['Oregon','https://govstatus.egov.com/OR-OHA-COVID-19'],['Pennsylvania', 'https://www.health.pa.gov/topics/disease/coronavirus/Pages/Coronavirus.aspx'],
						['Rhode Island', 'https://health.ri.gov/covid/'],['South Carolina', 'https://www.scdhec.gov/infectious-diseases/viruses/coronavirus-disease-2019-covid-19'],['South Dakota','https://doh.sd.gov/news/coronavirus.aspx'],['Tennessee', 'https://www.tn.gov/governor/covid-19.html'],['Texas','https://www.dshs.state.tx.us/coronavirus/'],['Utah','https://coronavirus.utah.gov/'],['Vermont','https://www.healthvermont.gov/response/coronavirus-covid-19'],['Virginia','https://www.vdh.virginia.gov/coronavirus/'],['Washington','https://www.doh.wa.gov/emergencies/coronavirus'],
						['West Virginia','https://dhhr.wv.gov/COVID-19'],['Wisconsin','https://www.dhs.wisconsin.gov/covid-19'],['Wyoming','https://health.wyo.gov/publichealth/infectious-disease-epidemiology-unit/disease/novel-coronavirus/']];
		var i, j, allCases = 0;
		var temp, url;
		
		for (i = 0; i < allStates.length; i++){
			temp = this.stateData[allStates[i]][this.stateData[allStates[i]].length - 1].confirmed;
			allCases = +allCases + +temp;
		}
		for(j = 0; j < allStateData.length; j++) {
			if(allStateData[j][0] == inputValue) {
				url = allStateData[j][1];
			}
		}
		var myh2 = document.getElementById("h2wrap");
		myh2.innerHTML = "<span style='text-transform:uppercase; font-size: 30px; color: #fff; letter-spacing: 3px; margin-bottom: 0.3em; grid-row: 2; font-weight: 500; text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);'> " 
			+ inputValue + " </span>";

		var myloc = document.getElementById("location");
		myloc.innerHTML = inputValue + ", United States";
		var mydate = document.getElementById("date");
		mydate.innerHTML = dataAsOf;
		var mycases = document.getElementById("cases");
		mycases.innerHTML = numberWithCommas(totalCases);
		var mydeaths = document.getElementById("deaths");
		mydeaths.innerHTML = numberWithCommas(totalDeaths);		
		var descrip = document.getElementById("description");
		var percentCases = parseInt(totalCases, 10);
		percentCases = Math.round(((percentCases / allCases) * 100) * 10)/10;
		descrip.innerHTML = "<p>As of the current date, " + inputValue + " has had:<br><b>" + percentCases + "%</b> of " 
							+ numberWithCommas(allCases) + " total cases. <br><br>For more information, please visit:<br><a href=" + url + ">"+url+"</a></p>";
		var wrapper = document.getElementById("wrapper");
		wrapper.style.display = "none";
		wrapper.style.display = "block";
		changeBg(totalDeaths);
	  }
	

	createStatesList(){

		
		// Initialize max children state (arbitrary)
		var max_children = this.stateData["Hawaii"]

		// Create array of states
		var state_ID = [this.stateData["Hawaii"], this.stateData.Alaska, this.stateData.Florida,  this.stateData["South Carolina"],   this.stateData.Georgia, 
					this.stateData.Alabama, this.stateData["North Carolina"], this.stateData.Tennessee,  this.stateData["Rhode Island"], 
					this.stateData.Connecticut,  this.stateData.Massachusetts,  this.stateData.Maine,  this.stateData["New Hampshire"], this.stateData.Vermont,
					this.stateData["New York"],  this.stateData["New Jersey"],  this.stateData.Pennsylvania,  this.stateData.Delaware,
					this.stateData.Maryland, this.stateData["West Virginia"], this.stateData.Kentucky, this.stateData.Ohio, this.stateData.Michigan,
					this.stateData.Wyoming, this.stateData.Montana, this.stateData.Idaho, this.stateData.Washington, 0, this.stateData.Texas, 
					this.stateData.California, this.stateData.Arizona, this.stateData.Nevada, this.stateData.Utah, this.stateData.Colorado,
					this.stateData["New Mexico"], this.stateData.Oregon, this.stateData["North Dakota"], this.stateData["South Dakota"], this.stateData.Nebraska,
					this.stateData.Iowa, this.stateData.Mississippi, this.stateData.Indiana, this.stateData.Illinois, this.stateData.Minnesota, 
					this.stateData.Wisconsin, this.stateData.Missouri, this.stateData.Arkansas, this.stateData.Oklahoma, this.stateData.Kansas,
					this.stateData.Louisiana, this.stateData.Virginia];
					
					
			// Calculate state with most dates collected
			state_ID.forEach(function(d, i){
					if(d.length > max_children.length){
						max_children = d;
					}
			});


			// Create a list of all the dates that are collected
			var listOfDates = [];
			max_children.forEach(function(d, i){
				listOfDates.push(d.date)
			});

			// Create an array that matches listOfDates in size and fill with total confirmed 
			var ConfirmedEachDay = []

			// Initalize confirmed deaths to 0
			for(var i = 0; i < listOfDates.length; i++){
				ConfirmedEachDay.push(0);
			}

			// Calculate the total confirmed cases each day
			state_ID.forEach(function(d,i){
				for(var k = 0; k < d.length; k++){
					ConfirmedEachDay[ConfirmedEachDay.length-1 - k] += +d[d.length - 1 - k].confirmed;
				}
			});

		// Set X and Y coordinates (X: Number of days, Y: Total Confirmed)
		let dataPoints = [];
		for ( var dateNumber = 0; dateNumber < listOfDates.length; dateNumber++ ) {	
			dataPoints.push({x: new Date(listOfDates[dateNumber] + " 00:00:00"), y: ConfirmedEachDay[dateNumber-1]});
		}
	}
	ngOnInit() {

    }
}
