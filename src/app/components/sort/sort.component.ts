import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  sortCharacters(e): void {
    let sortOrder = e.target.value;
    this.characterService.sortCharacters(sortOrder);
  }

}
