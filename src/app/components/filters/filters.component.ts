import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { Observable } from 'rxjs';
import { FilterOpt } from 'src/app/models/filterOptions';
import { FormBuilder, FormGroup, FormControl, NgForm, FormArray } from '@angular/forms';


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
  

  male$: Observable<boolean>;
  female: FormControl = new FormControl(true);
  human: FormControl = new FormControl(true);
  mytholog: FormControl = new FormControl(true);
  otherSpecies: FormControl = new FormControl(true);
  unknown: FormControl = new FormControl(true);
  postApocalypticEarth: FormControl = new FormControl(true);
  nuptia4: FormControl = new FormControl(true);
  otherOrigins: FormControl = new FormControl(true);

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
    const { filterOptions$ } = this.characterService;
    this.filterOptions$ = filterOptions$;
    console.log('filter observable male', this.characterService.male$);    
    this.male$ = this.characterService.male$;
  }

  ngOnInit(): void {
    this.male$ = this.characterService.male$;
    this.filterForm = this.builder.group({
      male: this.male$,
      female: this.female,
      human: this.human,
      mytholog: this.mytholog,
      otherSpecies: this.otherSpecies,
      unknown: this.unknown,
      postApocalypticEarth: this.postApocalypticEarth,
      nuptia4: this.nuptia4,
      otherOrigins: this.otherOrigins
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
    
   // alert(`Male: ${this.characterService.male}`);
  }
  
}
