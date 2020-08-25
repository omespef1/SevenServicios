import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from "@angular/common";


const routes: Routes = [

{
  path: 'tecuter',
  loadChildren: () => import('../te/tecuter/tecuter.module').then(te => te.TecuterPageModule)
},
{
  path: 'teinfar',
  loadChildren: () => import('../te/teinfar/teinfar.module').then(te => te.TeinfarPageModule)
},
{
  path : '',
  // redirectTo:'tecuter'
  redirectTo : 'tesmenu'
},
{
  path: 'tesmenu',
  loadChildren: () => import('../te/tesmenu/tesmenu.module').then(te => te.TesmenuPageModule)
},
{ path: 'tecasis',
  loadChildren: () => import('../te/tecasis/tecasis.module').then(te => te.TecasisPageModule)
},
{
  path: 'tecasis-aprt',
  loadChildren: () => import('../te/tecasis-aprt/tecasis-aprt.module').then(te => te.TecasisAprtPageModule)
},
{
  path: 'tecasis-capr',
  loadChildren: () => import('../te/tecasis-capr/tecasis-capr.module').then(te => te.TecasisCaprPageModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class TeRoutingModule { }
