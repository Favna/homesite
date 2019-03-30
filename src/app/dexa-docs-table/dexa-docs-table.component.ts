import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DexaDocsDatasource } from './dexa-docs-datasource';
import { DexaDocsErrorStateMatches } from './dexa-docs-error-state-matcher';

@Component({
  selector: 'favware-dexa-docs-table',
  templateUrl: './dexa-docs-table.component.html',
  styleUrls: ['./dexa-docs-table.component.scss'],
})
export class DexaDocsTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public dataSource: DexaDocsDatasource;
  public readonly definitionColumns = ['name', 'description', 'examples'];
  public readonly searchFormControl = new FormControl('', [Validators.pattern(/[A-z]+/g)]);
  public readonly matcher = new DexaDocsErrorStateMatches();

  ngOnInit () {
    this.dataSource = new DexaDocsDatasource(this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(() => this.dataSource.filter = this.filter.nativeElement.value);
  }

  clearFilter () {
    this.searchFormControl.setValue('');
    this.dataSource.filter = '';
  }
}