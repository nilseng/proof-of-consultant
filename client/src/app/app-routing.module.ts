import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => {
      const { LandingModule } = await import('./landing/landing.module');
      return LandingModule;
    },
  },
  {
    path: 'graphics-view',
    loadChildren: async () => {
      const { GraphicsModule } = await import('./graphics/graphics.module');
      return GraphicsModule;
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
