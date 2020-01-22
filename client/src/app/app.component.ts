import { Component, OnInit } from '@angular/core';
import { VolumenService } from 'src/services/volumen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  volumen = 0;

  constructor(public volumenService: VolumenService) { }

  ngOnInit() {
    this.getVolumeFromBack();
  }

  onChangeSlider() {
    this.setVolumeToBack(this.volumen);
    this.getVolumeFromBack();
  }

  async getVolumeFromBack(): Promise<void> {
    this.volumen = await this.volumenService.getVolumen();
  }

  async setVolumeToBack(newVolume): Promise<void>{
    this.volumenService.setVolumen(newVolume);
  }

}
