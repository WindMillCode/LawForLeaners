import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
    // {
    //     path:'scratchpad',
    //     loadChildren: () => import('./scratchpad/scratchpad.module').then(m => m.ScratchpadModule)
    // },
    {
        path:'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path:'videos',
        loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
