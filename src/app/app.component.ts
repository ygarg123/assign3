import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputs$ = new Subject<any>();
  filterKey: any;
  items: any[] = [];
  filteredItems: any;

  constructor() {}

  ngOnInit() {
    this.filterKey = '';
    this.items = [
      'apple',
      'banana',
      'orange',
      'pineapple',
      'grapes',
      'mango',
      'cherry',
      'blackberry',
      'strawberry',
      'peach',
      'guava',
      'papaya',
    ];
    this.filteredItems = this.items;

    this.inputs$
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((input) => {
          let key = input.trim();
          let result = this.items.filter((item: string) =>
            item.toLowerCase().includes(key.toLowerCase())
          );

          return of(result);
        })
      )
      .subscribe((result) => {
        this.filteredItems = result;
      });
  }

  onFilterKeyChange(event: any) {
    this.filterKey = event.target.value;
    this.inputs$.next(this.filterKey);
  }
}
