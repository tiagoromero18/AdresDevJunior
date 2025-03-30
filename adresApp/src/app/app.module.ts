import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcquisitionService } from './services/acquisition.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importa CommonModule para tener acceso a las tuberías comunes como CurrencyPipe
import { AcquisitionListComponent } from './components/acquisition-list/acquisition-list.component';
import { AcquisitionFormComponent } from './components/acquisition-form/acquisition-form.component';

@NgModule({
  declarations: [
    AppComponent,  // Solo declaramos AppComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AcquisitionListComponent,  
    AcquisitionFormComponent, 
    CommonModule,
  ],
  providers: [
    provideHttpClient(), 
    AcquisitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


