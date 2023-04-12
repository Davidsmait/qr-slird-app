import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsComponent} from "./components/tabs/tabs.component";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'new-card',
            children: [
              {
                path: '',
                loadChildren: () => import('./pages/new-card/new-card.module').then( m => m.NewCardPageModule)
              },

              {
                path: 'card-templates',
                loadChildren: () => import('./pages/card-templates/card-templates.module').then( m => m.CardTemplatesPageModule)
              }
            ]
          },
          {
            path: 'new-card/:id',
            redirectTo: 'new-card'
          },
        ]
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
      },
    ]
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
