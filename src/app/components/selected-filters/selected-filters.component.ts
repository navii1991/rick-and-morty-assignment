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
    const filtered = this.characterService.selectedFilters.filter((value, index, arr)=> { return value != val;});
    this.characterService.selectedFilters = filtered;
    this.characterService.selectedFilters$.next(filtered);
    this.characterService.filterCharacters();
  }

}
