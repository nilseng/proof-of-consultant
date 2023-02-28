import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';

const routes = [{ path: '', component: LandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class LandingRoutingModule {}

@NgModule({
  imports: [LandingRoutingModule],
  declarations: [LandingComponent],
})
export class LandingModule {}
