import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CharacterResponse } from '../models/CharacterResponse';
import { Character } from '../models/character';
import { FilterOpt } from '../models/filterOptions';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  allCharacters: Character[];
  _characters: Character[];
  characters$: BehaviorSubject<Character[]> = new BehaviorSubject([]);
  _filteredCharacters: Character[];
  filteredCharacters$: BehaviorSubject<Character[]> = new BehaviorSubject([]);
  _selectedFilters: string[] = [];
  selectedFilters$: BehaviorSubject<string[]> = new BehaviorSubject(this._selectedFilters);
  _filterOptions : FilterOpt;
  filterOptions$: BehaviorSubject<FilterOpt> = new BehaviorSubject(this._filterOptions);
  _isCharacterFiltered: boolean = false;
  isCharacterFiltered$: BehaviorSubject<boolean> = new BehaviorSubject(this._isCharacterFiltered)
  

  get characters() {
    return this._characters;
  }

  set characters(value: Character[]) {
    this._characters = value;
    
    // publishing the value to subscriber
    this.characters$.next(this._characters);
  }

  get filteredCharacters() {
    return this._filteredCharacters;
  }

  set filteredCharacters(value: Character[]) {
    this._filteredCharacters = value;
    
    // publishing the value to subscriber
    this.characters$.next(this._filteredCharacters);
  }

  get selectedFilters() {
    return this._selectedFilters;
  }

  set selectedFilters(value: string[]) {
    this._selectedFilters = value;
    
    // publishing the value to subscriber
    this.selectedFilters$.next(this._selectedFilters);
  }

  get filterOptions() {
    return this._filterOptions;
  }

  set filterOptions(value: FilterOpt) {
    this._filterOptions = value;
    
    // publishing the value to subscriber
    this.filterOptions$.next(this._filterOptions);
  }

  get isCharacterFiltered() {
    return this._isCharacterFiltered;
  }
  set isCharacterFiltered(value:boolean) {
    this._isCharacterFiltered = value;
    this.isCharacterFiltered$.next(this._isCharacterFiltered);
  }  

  constructor(private http: HttpClient) { }

  // GET /api/characters
  getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${environment.apiEndPoint}/api/character/`);
  }

  searchCharacterByName(name: string) {
    if(name == ""){
      this.characters = this.allCharacters;
      return;
    }
    if(this.isCharacterFiltered) {
      const searchedCharacter = this.filteredCharacters.filter((item) => {
        let str = item.name.toLowerCase(); 
        let re = new RegExp(name.toLowerCase(), 'g');
        if(str.match(re)) { 
          return item;
        }
      });
      this.filteredCharacters = searchedCharacter;
    } else {
      const searchedCharacter = this.characters.filter((item) => {
        let str = item.name.toLowerCase(); 
        let re = new RegExp(name.toLowerCase(), 'g');
        if(str.match(re)) { 
          return item;
        }
      });
      this.characters = searchedCharacter;
  }
 }

  filterCharacters() {
    if(this.selectedFilters.length == 0) {
      this.characters = this.allCharacters;
      return;
    }
    const filteredCharacter = this.characters.filter((item) => {
      if(this.selectedFilters.includes(item.gender.toLowerCase())) {
        return item;
      } else if(this.selectedFilters.includes(item.species.toLowerCase())) {
          return item;
      } else if (this.selectedFilters.includes(item.origin.name.toLowerCase())) {
            return item;
      } else {
        return;
      }
    });
    this.isCharacterFiltered = true;
    this.filteredCharacters = filteredCharacter;
  }

  sortCharacters(sortOrder) {
    if(this.isCharacterFiltered) {
      if(sortOrder=='asc') {
        this.filteredCharacters.sort((a,b)=> a.id - b.id)
      } else {
        this.filteredCharacters.sort((a,b)=> b.id - a.id)
      }
    } else {
      if(sortOrder=='asc') {
        this.characters.sort((a,b)=> a.id - b.id)
      } else {
        this.characters.sort((a,b)=> b.id - a.id)
      }
    }
  }
}
