import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.scss']
})
export class SelectedFiltersComponent implements OnInit {

  selectedFilters: string[];
  selectedFilters$: Observable<string[]>;
  constructor(private characterService: CharacterService) { 
    const { selectedFilters$ } = this.characterService;
    this.selectedFilters$ = selectedFilters$;
  }

  ngOnInit(): void {
     this.selectedFilters = this.characterService.selectedFilters;
  }

  removeFilter(val: string, index: number) {
    for (const key in this.characterService.filterOptions) {
      let value = this.characterService.filterOptions[key];
      value.forEach(element => {
        if(element.label == val) {
          return element.checked = false;
        } 
      });
    }
    this.characterService.male$.next(false);
    this.characterService.selectedFilters.splice(index,1);
    this.characterService.filterCharacters();
  }

}
