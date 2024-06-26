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
import { DropdownItemsPipe } from '@app/shared/pipes/dropdown-items.pipe';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ITable } from '@app/shared/models/table.interface';
import {
  EMPTY,
  Observable,
  from,
  map,
  of,
  switchMap,
  take,
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
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent implements OnInit {
  private fs = inject(Firestore);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  private user = toSignal(this.authService.user$);

  // editComplete = output<TableEditCompleteEvent>();
  editCancel = output<TableEditCancelEvent>();
  editInit = output<TableEditInitEvent>();

  tableId = input.required<string>();

  table = toSignal<ITable | undefined>(
    toObservable(this.tableId).pipe(
      switchMap((id) => {
        return this.authService.user$.pipe(map((user) => ({ user, id })));
      }),
      switchMap(({ user, id }) => {
        const userId = user?.uid;

        if (userId !== id) {
          return of(undefined);
        }

        const userDoc = doc(this.fs, 'userPrivateData', id);
        return docData(userDoc) as Observable<ITable>;
      }),
      takeUntilDestroyed(this.destroyRef)
    )
  );

  get DataTypesEnum() {
    return DataTypesEnum;
  }

  ngOnInit(): void {}

  editComplete(e: TableEditCompleteEvent): void {
    console.log('edit complete: ', e);
  }

  private areObjectsEqual(x: object, y: object): boolean {
    return (
      JSON.stringify(Object.entries(x).sort()) !==
      JSON.stringify(Object.entries(y).sort())
    );
  }
}
