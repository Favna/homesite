import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { RibbonDocsDatasource } from './ribbon-docs-datasource';
import { RibbonDocsErrorStateMatches } from './ribbon-docs-error-state-matcher';

@Component({
  selector: 'favware-ribbon-docs-table',
  templateUrl: './ribbon-docs-table.component.html',
  styleUrls: ['./ribbon-docs-table.component.scss']
})
export class RibbonDocsTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;
  @ViewChild('filter', { static: true }) public filter: ElementRef;

  public dataSource: RibbonDocsDatasource;
  public isSmall = false;
  public fullSizeColumns = ['name', 'aliases', 'description', 'category'];
  public smallSizeColumns = ['name', 'category'];
  public searchFormControl = new FormControl('', [Validators.pattern(/[A-z]+/g)]);
  public matcher = new RibbonDocsErrorStateMatches();

  public breakpointObserver: BreakpointObserver;

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpointObserver = breakpointObserver;
  }

  public ngOnInit(): void {
    this.dataSource = new RibbonDocsDatasource(this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(() => (this.dataSource.filter = this.filter.nativeElement.value));

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      this.isSmall = state.matches;
    });
  }

  public clearFilter() {
    this.searchFormControl.setValue('');
    this.dataSource.filter = '';
  }
}