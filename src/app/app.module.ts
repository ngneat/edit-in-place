import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EDITABLE_CONFIG, EditableConfig, EditableModule } from '@ngneat/edit-in-place';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, EditableModule, ReactiveFormsModule],
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
