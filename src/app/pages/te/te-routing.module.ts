import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

{
  path:'tecuter',
  loadChildren:()=> import('../te/tecuter/tecuter.module').then(te=>te.TecuterPageModule)
},
{
  path:'teinfar',
  loadChildren:()=> import('../te/teinfar/teinfar.module').then(te=>te.TeinfarPageModule)
},
{
  path:'',
  redirectTo:'tecuter'
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeRoutingModule { }
