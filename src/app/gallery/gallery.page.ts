import { Component } from '@angular/core';
import data from '../../assets/data.json';
import {ActivatedRoute} from '@angular/router';

const PANOLENS = require("panolens-three");
const THREE =  PANOLENS.THREE;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {

  viewer:any;
  panoramas:any[] = [];
  type:string;
  sel:number = 0;

  constructor(public activatedRoute:ActivatedRoute) {
    this.type = activatedRoute.snapshot.params.type;
  }

  ionViewDidEnter() {
    let container = document.querySelector('.panorama');
    this.sel = 0;
    
    this.viewer = new PANOLENS.Viewer({
      controlBar: false,
      controlButtons: ['setting'],
      container: container,
      rotateSpeed: -100.0,
    });

    data[this.type].forEach(v=>{
      this.panoramas.push(new PANOLENS.ImagePanorama( "./assets/IMERSAO/"+this.type.toUpperCase()+"/"+v.file ));
    });

    for(let i:number=0; i<this.panoramas.length; i++){
      this.viewer.add( this.panoramas[i] );
    }
  }

  changePanorama(i:number){
    console.log(i, this.panoramas[i]);
    this.sel = i;
    this.viewer.setPanorama( this.panoramas[i] );
  }

  getData(){
    return data[this.type];
  }

  getFile(i:number){
    let f = "url('./assets/IMERSAO/"+this.type.toUpperCase()+"/small/"+data[this.type][i].file+"')";
    return f;
  }

}
