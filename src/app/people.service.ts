import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Person } from './person';

const PEOPLE : Person[] = [
  {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
  {id: 2, name: 'Darth Vader', height: 200, weight: 100},
  {id: 3, name: 'Han Solo', height: 185, weight: 85}
];

function mapPersons(response: Response): Person[] {
  throw new Error('ups! Force choke!');
  // return response.json().results.map(toPerson);
}

function mapPerson(response: Response): Person {
  return toPerson(response.json());
}

function toPerson(r: any): Person {
  let person = <Person>({
    id: extractId(r),
    url: r.url,
    name: r.name,
    weight: r.mass,
    height: r.height
  });
  console.log('Parsed person:', person);
  return person;
}

function handleError(error: any) {
  let errorMsg = error.message || `Yikes! There was a problem`;
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}

function extractId(personData: any) {
  let extractId = personData.url.replace('http://swapi.co/api/people', '').replace('/', '');
  return parseInt(extractId);
}

@Injectable()
export class PeopleService {
  private baseUrl : string = 'http://swapi.co/api';
  constructor(private http: Http) {

  }

  getAll() : Observable<Person[]> {
    // return PEOPLE.map(p => this.clone(p));

    let people$ = this.http
      .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
      .map(mapPersons)
      .catch(handleError);
    // people$ = people$.map(mapPersons);
    return people$;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  get(id: number) : Observable<Person> {
    // return this.clone(PEOPLE.find(p => p.id === id));

    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .map(mapPerson);
    return person$;
  }

  save(person: Person): Observable<Response> {
    // let originalPerson = PEOPLE.find(p => p.id == person.id);
    // if (originalPerson) Object.assign(originalPerson, person);
    return this.http
      .put(`${this.baseUrl}/people/${person.id}`, JSON.stringify(person), {headers: this.getHeaders()});
  }

  private clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }
}
