import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: [
    './styles/base.css',
    './styles/buttons.css',
    './styles/hero.css',
    './styles/carousel.css',
    './styles/about.css',
    './styles/offer.css'
  ]
})
export class HomeComponent {}