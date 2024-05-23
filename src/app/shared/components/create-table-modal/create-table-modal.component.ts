import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ITableColumn } from '@shared/models/table-column.interface';
import { DataTypesEnum } from '@app/shared/enums/data-types.enum';

@Component({
  selector: 'app-create-table-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    AccordionModule,
    ButtonModule,
  ],
  templateUrl: './create-table-modal.component.html',
  styleUrl: './create-table-modal.component.scss',
})
export class CreateTableModalComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  keyPattern = /^[a-zA-Z0-9]+$/;
  dataTypes: { name: string }[] = [];

  tableNameControl: FormControl = this.formBuilder.control({
    tableName: ['', Validators.required],
  });

  tableFormGroup = this.formBuilder.group({
    tableName: ['', Validators.required],
    columnFormGroups: this.formBuilder.array([this.createColumn()]),
  });

  ngOnInit(): void {
    this.dataTypes = Object.keys(DataTypesEnum).map((key) => ({
      name: key,
    }));
  }

  get columnGroups() {
    return this.tableFormGroup.get('columnFormGroups') as FormArray;
  }

  createColumn(): FormGroup {
    return this.formBuilder.group({
      headerName: ['', [Validators.required, Validators.maxLength(30)]],
      key: ['', [Validators.required, Validators.pattern(this.keyPattern)]],
      width: ['', Validators.required],
      type: [null, Validators.required],
    });
  }

  addColumn() {
    this.columnGroups.push(this.createColumn());

    console.log(this.columnGroups); // for debug
  }

  saveTable() {
    // will save to localStorage here
  }

  isValid() {
    return this.tableFormGroup.valid;
  }

  asFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }
}
