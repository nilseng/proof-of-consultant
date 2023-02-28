import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';

@NgModule({
  imports: [RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class SharedModule {}
