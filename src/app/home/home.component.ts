import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { AuthenticationService } from '@app/auth';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  inputValue: number | undefined;

  notMultiples: { valor: number; color: string }[] = [];
  multipleTree: { valor: number; color: string }[] = [];
  multipleFive: { valor: number; color: string }[] = [];
  multipleSeven: { valor: number; color: string }[] = [];

  constructor(
    private quoteService: QuoteService,
    private authenticationService: AuthenticationService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  logout() {
    this.authenticationService.logout();
  }

  obtain() {
    this.notMultiples = [];
    this.multipleTree = [];
    this.multipleFive = [];
    this.multipleSeven = [];
    if (this.inputValue !== undefined && this.inputValue > 0) {
      for (let i = 0; i <= this.inputValue; i++) {
        if (i === 0 || !(i % 3 === 0 || i % 5 === 0 || i % 7 === 0)) {
          this.notMultiples.push({ valor: i, color: 'black' });
        }
        if (i % 3 === 0 && i != 0) {
          this.multipleTree.push({ valor: i, color: 'green' });
        }
        if (i % 5 === 0 && i != 0) {
          this.multipleFive.push({ valor: i, color: 'red' });
        }
        if (i % 7 === 0 && i != 0) {
          this.multipleSeven.push({ valor: i, color: 'blue' });
        }
      }
      this.saveDataCollections();
    }
  }

  saveDataCollections() {
    const data = {
      notMultiples: this.notMultiples.map((item) => item.valor),
      multipleTree: this.multipleTree.map((item) => item.valor),
      multipleFive: this.multipleFive.map((item) => item.valor),
      multipleSeven: this.multipleSeven.map((item) => item.valor),
      numberEntered: this.inputValue || 0,
    };
    this.homeService.saveDataCollections(data);
  }
}
