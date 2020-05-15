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
		function changeBg(state){
			var myfront = document.getElementById("front");
				myfront.style.backgroundImage = "background-image: url('https://www.landflip.com/photos/127403/prime-agricultural-land-deer-lodge-morgan-county-tennessee-127403-ZGjodS-XL.jpg')";
		}
		var inputValue = (<HTMLInputElement>document.getElementById("slct")).value;
		var dataAsOf = this.stateData[inputValue][this.stateData[inputValue].length -1].date;
		var totalCases = this.stateData[inputValue][this.stateData[inputValue].length - 1].confirmed;
		var totalDeaths = this.stateData[inputValue][this.stateData[inputValue].length - 1].deaths;

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
		var wrapper = document.getElementById("wrapper");
		wrapper.style.display = "none";
		wrapper.style.display = "block";
		changeBg(inputValue);
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
