import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people-list',
  template: `
    <ul>
      <li *ngFor="let person of people" (click)="selectPerson(person)">
        {{person.name}}
      </li>
    </ul>

    <app-person-details [person]="selectedPerson"></app-person-details>
  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  selectedPerson: Person;

  constructor(private _peopleService: PeopleService) {
  }

  ngOnInit() {
    this.people = this._peopleService.getAll();
  }

  selectPerson(person: Person) {
    this.selectedPerson = person;
  }

}
