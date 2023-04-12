import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardTemplatesService {

  cards = [
    {
      id: 1,
      src: "../../assets/images/card-demo@3x.png"
    },
    {
      id: 2,
      src: "../../assets/images/card-template-blue.png"

    },
    {
      id: 3,
      src: "../../assets/images/card-template-black.png"
    },
    {
      id: 4,
      src: "../../assets/images/card-template-artico.png"
    },
  ]

  constructor() { }
}
