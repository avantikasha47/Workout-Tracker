import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Ensure this is the root component
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent], // Add the root component here
  imports: [
    BrowserModule,
    HomeComponent // Import standalone components if needed
  ],
  providers: [],
  bootstrap: [AppComponent] // Ensure the root component is bootstrapped
})
export class AppModule { }
