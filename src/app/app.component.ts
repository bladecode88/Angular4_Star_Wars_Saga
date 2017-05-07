import { Component } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PeopleService]
})
export class AppComponent {
  title:string = 'Star Wars!';
}
