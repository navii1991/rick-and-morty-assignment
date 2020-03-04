import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { Observable } from 'rxjs';
import { FilterOpt } from 'src/app/models/filterOptions';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  
  filterLabel =  'Filters';
  filterOptions: FilterOpt;
  selectedFilters: string[] = [];
  filterOptions$: Observable<any>;
  filterForm: FormGroup;

  constructor(private characterService: CharacterService,
              private builder: FormBuilder) { 
    this.filterOptions = {
      'species': [
        { label: 'human', selected: false, controlName: 'human' },
        { label: 'mytholog', selected: false, controlName: 'mytholog' },
        { label: 'other species', selected: false, controlName: 'otherSpecies' }
      ],
      'gender': [
        { label: 'male', selected: false, controlName: 'male' },
        { label: 'female', selected: false, controlName: 'female' }
      ],
       'origin': [
         {label: 'unknown', selected: false, controlName: 'unknown'},
         {label: 'post-apocalyptic earth',selected: false, controlName: 'postApocalypticEarth'},
         {label: 'nuptia 4', selected: false, controlName: 'nuptia4'},
         {label: 'other origins', selected: false, controlName: 'otherOrigins' }
      ]
    }

    this.characterService.filterOptions = this.filterOptions;
    const { filterOptions$, selectedFilters$ } = this.characterService;
    this.filterOptions$ = filterOptions$;
    
    this.filterForm = this.builder.group({
      male: false,
      female: false,
      human: false,
      mytholog: false,
      otherSpecies: false,
      unknown: false,
      postApocalypticEarth: false,
      nuptia4: false,
      otherOrigins: false
    });
  }

  ngOnInit(): void {
    this.characterService.selectedFilters$.subscribe(res=>{
        this.filterForm = this.builder.group({
          male: this.characterService.selectedFilters.includes('male')? true : false,
          female: this.characterService.selectedFilters.includes('female')? true : false,
          human: this.characterService.selectedFilters.includes('human')? true : false,
          mytholog: this.characterService.selectedFilters.includes('mytholog')? true : false,
          otherSpecies: this.characterService.selectedFilters.includes('otherSpecies')? true : false,
          unknown: this.characterService.selectedFilters.includes('unknown')? true : false,
          postApocalypticEarth: this.characterService.selectedFilters.includes('postApocalypticEarth')? true : false,
          nuptia4: this.characterService.selectedFilters.includes('nuptia4')? true : false,
          otherOrigins: this.characterService.selectedFilters.includes('otherOrigins')? true : false
        })
    });
    
  }

  selectFilters(e, formControlName): void {
    let isChecked = e.target.checked;
    let val = e.target.value;
    if(isChecked && this.selectedFilters.indexOf(val) == -1) {
      this.selectedFilters.push(e.target.value);
    }

    if(!isChecked && this.selectedFilters.indexOf(val) >= 0) {
      this.selectedFilters.splice(this.selectedFilters.indexOf(val), 1)
    }
    this.characterService.selectedFilters = this.selectedFilters;
    this.characterService.filterCharacters();
  }
  
}
