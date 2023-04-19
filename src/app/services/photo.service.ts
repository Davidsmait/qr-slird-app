import { Injectable } from '@angular/core';
import {Camera, GalleryPhotos} from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async takeFromGallery():Promise<GalleryPhotos>{
    return await Camera.pickImages({
      quality: 90,
      limit: 1
    })
  }

}
