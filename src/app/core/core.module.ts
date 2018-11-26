import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharService } from './services/char.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [CharService]
})

export class CoreModule {}
