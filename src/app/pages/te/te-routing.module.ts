import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from "@angular/common";
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [

{
  path: 'tecuter',
  loadChildren: () => import('../te/tecuter/tecuter.module').then(te => te.TecuterPageModule)
},
{
  path: 'teinfar',
  loadChildren: () => import('../te/teinfar/teinfar.module').then(te => te.TeinfarPageModule),
  canActivate: [AuthGuard]
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
{ 
  path: 'tecasis',
  loadChildren: () => import('../te/tecasis/tecasis.module').then(te => te.TecasisPageModule),
  canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class TeRoutingModule { }
