import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SortComponent } from './components/sort/sort.component';
import { SearchComponent } from './components/search/search.component';
import { SelectedFiltersComponent } from './components/selected-filters/selected-filters.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SortComponent,
    SearchComponent,
    SelectedFiltersComponent,
    FiltersComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
