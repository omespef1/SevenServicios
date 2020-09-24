import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from "@angular/common";
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [

{
  path: 'caregob',
  loadChildren: () => import('../cf/cfregob/cfregob.module').then(cf => cf.CfregobPageModule)
},
{
  path: 'cascrev',
  loadChildren: () => import('../cf/cascrev/cascrev.module').then(cf => cf.CascrevPageModule)
},
{
  path : '',
  redirectTo : 'cfsmenu'
},
{
  path: 'cfsmenu',
  loadChildren: () => import('../cf/cfsmenu/cfsmenu.module').then(cf => cf.CfsmenuPageModule),
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class CfRoutingModule { }
