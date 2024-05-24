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
  private modalService = inject(ModalService);
  private formBuilder = inject(FormBuilder);
  keyPattern = /^[a-zA-Z0-9]+$/;
  dataTypes: { name: string }[] = [];

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

  asFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }
}
