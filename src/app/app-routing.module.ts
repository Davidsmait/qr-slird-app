import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsComponent} from "./components/tabs/tabs.component";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children:[

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
                path: 'card-templates',
                redirectTo: '../card-templates'
              },
              {
                path: '',
                loadChildren: () => import('./pages/new-card/new-card.module').then( m => m.NewCardPageModule)
              }
            ]
          },
          {
            path: 'new-card/:id',
            redirectTo: 'new-card',
          },
          {
            path: 'card-templates',
            loadChildren: () => import('./pages/card-templates/card-templates.module').then( m => m.CardTemplatesPageModule)

          },
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
