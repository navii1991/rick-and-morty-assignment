import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  searchCharacter(e: string) {
    // if(e == '')
    // {
    //   return;
    // }
    this.characterService.searchCharacterByName(e);
  }

}
