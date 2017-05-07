import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../people.service';
import { Person } from '../person';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  person: Person;
  sub: any;
  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

  constructor(private _peopleService: PeopleService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.person = this._peopleService.get(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoPeoplesList() {
    let link = ['/persons'];
    this.router.navigate(link);
  }

  savePersonDetails() {
    this._peopleService.save(this.person);
  }

}
