import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Map as MapboxMap, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  @ViewChild('mapboxContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const map = new MapboxMap({
      container: this.container.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [11.039684, 60.685738],
      zoom: 9,
      accessToken:
        'pk.eyJ1Ijoibmlsc2VuZyIsImEiOiJja2lyYmZoNnoyNHRoMnlxam42M2FhYTRzIn0.bNB_zGEjaXfrs-4cfz6V6w',
    });
    map.on('click', () => {
      this.router.navigateByUrl('/graphics-view');
    });
    new Marker().setLngLat([11.039684, 60.685738]).addTo(map);
  }
}
