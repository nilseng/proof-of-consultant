import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsViewComponent } from './graphics-view.component';
import { GraphicsService } from './graphics.service';

@NgModule({
  providers: [GraphicsService],
  imports: [CommonModule, GraphicsRoutingModule],
  declarations: [GraphicsViewComponent],
})
export class GraphicsModule {}
