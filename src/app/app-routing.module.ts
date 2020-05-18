import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GraphComponent } from './pages/graph/graph.component';
import { StatesListComponent } from './pages/stateslist/stateslist.component';
import { StateGraphComponent } from './pages/stategraph/stategraph.component'
import { D3MapComponent } from './pages/d3-map/d3-map.component';
import { DonationsComponent } from './pages/donations/donations.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component: D3MapComponent},
  {path:'stateslist',component: StateGraphComponent},
  {path:'graph',component: GraphComponent},
  {path:'donations', component: DonationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
