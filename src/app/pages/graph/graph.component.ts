import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { ProjectsService } from 'src/app/services/projects.service';
import { max } from 'rxjs/operators';

enum Display {
	Confirmed = 0,
	Death = 1
  }

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
	stateData: any;
	display = Display.Confirmed;
	constructor(private projSvc:ProjectsService) { 
	  projSvc.getProjects().subscribe(result=>{
		this.stateData=result;
		this.createGraph(this.display);
	  })
	}

	public setDisplayConfirmed(): void {
		this.display = Display.Confirmed;
		this.createGraph(this.display);
	}
	
	public setDisplayDeaths(): void {
		this.display = Display.Death;
		this.createGraph(this.display);	
	}

	createGraph(display){
		
		
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
			var EachDay = []

			// Initalize confirmed deaths to 0
			for(var i = 0; i < listOfDates.length; i++){
				EachDay.push(0);
			}

			// Calculate the total confirmed cases each day
			state_ID.forEach(function(d,i){
				for(var k = 0; k < d.length; k++){
					if(display == Display.Confirmed)
						EachDay[EachDay.length-1 - k] += +d[d.length - 1 - k].confirmed;
					else
						EachDay[EachDay.length-1 - k] += +d[d.length - 1 - k].deaths;
				}
			});

		// Set X and Y coordinates (X: Number of days, Y: Total Confirmed)
		let dataPoints = [];
		for ( var dateNumber = 0; dateNumber < listOfDates.length; dateNumber++ ) {	
			dataPoints.push({x: new Date(listOfDates[dateNumber] + " 00:00:00"), y: EachDay[dateNumber-1]});
		}

		// Create the graph
		let titleText = "";
		if(display == Display.Confirmed)
			titleText = "Confirmed Cases Over Time";
		else
			titleText = "Deaths Over Time"

		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: titleText,
				fontFamily: "Times"
			},
			axisX:{
				labelFontFamily: "Times"
			},
			axisY:{
				labelFontFamily: "Times"
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
