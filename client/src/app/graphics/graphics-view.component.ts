import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GraphicsService } from './graphics.service';

@Component({
  selector: 'app-graphics-view',
  templateUrl: './graphics-view.component.html',
})
export class GraphicsViewComponent implements OnInit {
  @ViewChild('graphicsContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  constructor(private graphicsService: GraphicsService) {}

  ngOnInit(): void {
    const { canvas } = this.graphicsService.initGraphics(
      this.container.nativeElement
    );
    this.container.nativeElement.appendChild(canvas);
  }
}
