import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GraphicsViewComponent } from './graphics-view.component';

const routes = [{ path: '', component: GraphicsViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphicsRoutingModule {}
