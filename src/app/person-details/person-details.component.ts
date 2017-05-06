import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-person-details',
  template: `
    <section *ngIf="person">
      <h2>You selected: {{person.name}}</h2>
      <h3>Description</h3>
      <p>
        {{person.name}} weights {{person.weight}} and is {{person.height}} tall.
      </p>
    </section>
  `,
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  @Input() person: Person;

  constructor() { }

  ngOnInit() {
  }

}
