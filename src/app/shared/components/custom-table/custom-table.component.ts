import { AuthService } from './../../services/auth.service';
import { DataTypesEnum } from '@app/shared/enums/data-types.enum';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITableData } from '@app/shared/models/table-data.interface';
import {
  TableEditCancelEvent,
  TableEditCompleteEvent,
  TableEditInitEvent,
  TableModule,
} from 'primeng/table';
import { ITableColumn } from '@app/shared/models/table-column.interface';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownItemsPipe } from '@app/shared/pipes/dropdown-items.pipe';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ITable } from '@app/shared/models/table.interface';
import {
  EMPTY,
  Observable,
  from,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    FormsModule,
    DropdownModule,
    DropdownItemsPipe,
    SkeletonModule,
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent implements OnInit {
  private fs = inject(Firestore);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  // editComplete = output<TableEditCompleteEvent>();
  // editCancel = output<TableEditCancelEvent>();
  // editInit = output<TableEditInitEvent>();

  loading = signal<boolean>(false);
  tableId = input.required<string>();

  table = toSignal(
    toObservable(this.tableId).pipe(
      tap(() => this.loading.set(true)),
      switchMap((id) => {
        return this.authService.user$.pipe(
          map((user) => {
            return { id, user };
          })
        );
      }),
      switchMap(({ id, user }) => {
        if (!user) {
          return of(undefined);
        }

        const userDataDoc = doc(this.fs, 'userPrivateData', user.uid);
        return (<Observable<{ tables: ITable[] }>>docData(userDataDoc)).pipe(
          map((data) => {
            if (!data) {
              return undefined;
            }

            const table = data.tables.find((table) => {
              return table.id === id;
            });
            return table;
          })
        );
      }),
      tap(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef),
      shareReplay(1)
    )
  );

  get DataTypesEnum() {
    return DataTypesEnum;
  }

  ngOnInit(): void {
    this.loading.set(true);
  }

  editComplete(e: TableEditCompleteEvent): void {
    console.log('edit complete: ', e);
  }
}
