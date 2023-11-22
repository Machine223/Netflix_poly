import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

export interface Hotel {
  "hotelno": string;
  "hotelname": string;
  "city": string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public readonly title: string = "INF3710 TP5";
  public hotels: Hotel[] = [
    {
    hotelno: "2030",
    hotelname: "string",
    city: "New York"
  }, ];
}
