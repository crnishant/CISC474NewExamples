import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GraphComponent } from './pages/graph/graph.component';
import { StatesListComponent } from './pages/stateslist/stateslist.component';
import { StateGraphComponent } from './pages/stategraph/stategraph.component'
import { D3MapComponent } from './d3-map/d3-map.component'


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component: D3MapComponent},
  {path:'stateslist',component: StatesListComponent},
  {path:'graph',component: GraphComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
