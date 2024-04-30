import { Component } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ISelect } from '@shared/models/select.interface';
import { DatePipe } from '@angular/common';
import { dateWithTimezone, getOffset } from '@shared/helpers/timezones.helper';

@Component({
  selector: 'app-timezones',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    DatePipe
  ],
  templateUrl: './timezones.component.html',
  styleUrl: './timezones.component.scss'
})
export class TimezonesComponent {
  currentLocalDate = new Date();
  currentDateWithTimezone: string | Date = new Date();
  selectedTimeZone?: ISelect;
  timezones: ISelect[] = Intl.supportedValuesOf('timeZone').map(el => {
    return {id: el, value: el}
  });
  offset = '';

  setNewDate() {
    if (this.selectedTimeZone) {
      this.offset = getOffset(this.selectedTimeZone.value) || '';
      this.currentDateWithTimezone = dateWithTimezone(this.currentLocalDate, this.selectedTimeZone.value);
    }
  }
}
