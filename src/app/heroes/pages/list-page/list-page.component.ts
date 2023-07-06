import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((heroes) => (this.heroes = heroes));

    console.log(this.heroes);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
