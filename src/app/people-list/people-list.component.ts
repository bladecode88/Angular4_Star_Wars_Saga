import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  template: `
    <section>
      <section *ngIf="isLoading && !errorMessage">
        Loading our hyberdrives!! Retrieving data...
      </section>
      <ul>
        <li *ngFor="let person of people">
          <a href="#" [routerLink]="['/persons', person.id]">
            {{person.name}}
          </a>
        </li>
      </ul>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
    </section>

  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private _peopleService: PeopleService) {
  }

  ngOnInit() {
    // this.people = this._peopleService.getAll();
    this._peopleService
      .getAll()
      .subscribe(
        p => this.people = p,
        e => this.errorMessage = e,
        () => this.isLoading = false
      );
  }

}
