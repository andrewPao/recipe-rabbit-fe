import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateFormModalComponent } from './modal/update-form-modal/update-form-modal.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HomeComponent,
    AdminPageComponent,
    UpdateFormModalComponent,
    BrowserAnimationsModule,
  ],
  providers: [],
  
})
export class AppModule { }