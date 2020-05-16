import * as CanvasJS from './canvasjs.min';
import { ProjectsService } from 'src/app/services/projects.service';
import { max } from 'rxjs/operators';

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-stategraph',
  templateUrl: './stategraph.component.html',
  styleUrls: ['./stategraph.component.scss']
})
export class StateGraphComponent implements OnInit {
    stateData: any;
    @ViewChild('slct') myId: ElementRef;
	constructor(private projSvc:ProjectsService) { 
	  projSvc.getProjects().subscribe(result=>{
		this.stateData=result;
		var stateName = "Hawaii"; // set this stateName when using component
		//this.createGraph(stateName);
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
		this.createGraph(inputValue)
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
      notifyMe() {
		console.log('Event Fired');
	  }
	createGraph(stateName){

		
		// Set state IDs
		var state_ID = this.stateData[stateName];

		console.log(state_ID);

		// Calculate number of dates collected for state
		var max_children = state_ID.length;

		// Create a list of all the dates that are collected
		var listOfDates = [];
		for(var i = 0; i < max_children; i++){
			listOfDates.push(state_ID[i].date);
		}

		// Create an array that matches listOfDates in size and fill with total confirmed 
		var ConfirmedEachDay = []

		// Initalize confirmed deaths to 0
		for(var i = 0; i < listOfDates.length; i++){
			ConfirmedEachDay.push(0);
		}

		// Set confirmed each day
		for(var k = 0; k < state_ID.length; k++){
			ConfirmedEachDay[ConfirmedEachDay.length-1 - k] += +state_ID[state_ID.length - 1 - k].confirmed;
		}

		// Set X and Y coordinates (X: Number of days, Y: Total Confirmed)
		let dataPoints = [];
		for ( var dateNumber = 0; dateNumber < listOfDates.length; dateNumber++ ) {	
			dataPoints.push({x: new Date(listOfDates[dateNumber] + " 00:00:00"), y: ConfirmedEachDay[dateNumber-1]});
		}

		// Create the graph
		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Confirmed Cases Over Time",
				fontFamily: "Montserrat"
			},
			subtitles:[
				{
					text: stateName,
					fontFamily: "Montserrat",
					fontSize: 24
				}
			],
			axisX:{
				labelFontFamily: "Montserrat"
			},
			axisY:{
				labelFontFamily: "Montserrat"
			},
			data: [
			{
				type: "line",                
				dataPoints: dataPoints
			}]
		});
			
		// Render the graph
		chart.render();
	}
	ngOnInit() {

    }
}