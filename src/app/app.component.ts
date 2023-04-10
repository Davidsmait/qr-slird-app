import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private currentRoute: string = "";
  isOnLoginPage = true;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute); // Muestra la ruta actual en la consola
        this.isOnLoginPage = this.currentRoute === "/" || this.currentRoute === "/login";
      }
    });


  }
}
