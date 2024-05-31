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
import { DataTypesEnum } from '@app/shared/enums/data-types.enum';
import { ModalService } from '@app/shared/services/modal.service';
import { WidthTypesEnum } from '@app/shared/enums/width-types.enum';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IColumnWidth } from '@app/shared/models/column-width.interface';
import { widthTypes } from '@shared/messages/col-width-types';

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
    RadioButtonModule,
  ],
  templateUrl: './create-table-modal.component.html',
  styleUrl: './create-table-modal.component.scss',
})
export class CreateTableModalComponent implements OnInit {
  private modalService = inject(ModalService);
  private formBuilder = inject(FormBuilder);
  keyPattern = /^[a-zA-Z0-9]+$/;
  dataTypes: string[] = [];
  widthTypes: string[] = [];
  currentWidthType!: IColumnWidth;

  tableFormGroup = this.formBuilder.group({
    tableName: ['', Validators.required],
    columnFormGroups: this.formBuilder.array([this.createColumn()]),
  });

  ngOnInit(): void {
    this.dataTypes = Object.keys(DataTypesEnum).map(
      (key) => key as DataTypesEnum
    );
    this.widthTypes = Object.values(WidthTypesEnum).map(
      (value) => value as WidthTypesEnum
    );
    this.currentWidthType = widthTypes[1];
  }

  get columnGroups() {
    return this.tableFormGroup.get('columnFormGroups') as FormArray;
  }

  createColumn(): FormGroup {
    return this.formBuilder.group({
      headerName: ['', [Validators.required, Validators.maxLength(30)]],
      key: ['', [Validators.required, Validators.pattern(this.keyPattern)]],
      width: this.formBuilder.group({
        value: [null, Validators.required],
        type: ['', Validators.required],
      }),
      type: [null, Validators.required],
    });
  }

  addColumn() {
    this.columnGroups.push(this.createColumn());
  }

  deleteColumn(index: number) {
    this.columnGroups.removeAt(index);
  }

  saveTable() {
    localStorage.setItem(
      'tableData',
      JSON.stringify(this.tableFormGroup.value)
    );
    this.modalService.closeModal();

    console.log(JSON.stringify(this.tableFormGroup.value)); // for debug
  }

  isValid() {
    return this.tableFormGroup.valid;
  }

  asFormGroup(control: AbstractControl | null) {
    return control as FormGroup;
  }

  changeCurrentType(type: string) {
    switch (type) {
      case 'px':
        this.currentWidthType = widthTypes[0];
        break;
      case '%':
        this.currentWidthType = widthTypes[1];
        break;
      default:
        this.currentWidthType = widthTypes[1];
        break;
    }
  }
}
