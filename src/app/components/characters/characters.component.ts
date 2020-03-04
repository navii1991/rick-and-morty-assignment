import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterResponse } from "src/app/models/CharacterResponse";
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  
 characters: Character[];
 characters$ : Observable<Character[]>;
 isCharacterFiltered$: Observable<boolean>;

  constructor(private characterService: CharacterService) { 
    const {characters$, filteredCharacters$, isCharacterFiltered$} = this.characterService;
    this.characters$ = characters$;
  }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((response:CharacterResponse)=>{
      this.characters = response.results;
      this.characterService.characters = this.characters;
      this.characterService.allCharacters = this.characters
    });
  }

  searchCharacterByName(name: string) {
    
  }

  

}
