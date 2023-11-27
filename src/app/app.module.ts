import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EDITABLE_CONFIG, EditableConfig } from '@ngneat/edit-in-place';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [BrowserModule, AppComponent, NgbModule],
  providers: [
    {
      provide: EDITABLE_CONFIG,
      useValue: {
        openBindingEvent: 'click',
        closeBindingEvent: 'click',
      } as EditableConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
