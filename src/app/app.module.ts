import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsComponent } from "./components/tabs/tabs.component";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent, TabsComponent],
    imports: [ReactiveFormsModule,FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent],
    exports: [
        TabsComponent
    ]
})
export class AppModule {}
