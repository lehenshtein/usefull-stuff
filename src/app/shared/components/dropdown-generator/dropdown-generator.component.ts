import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { IDropdownGroup } from '@app/shared/models/dropdown-group.interface';
import { IDropdownItem } from '@app/shared/models/dropdown-item.interface';

@Component({
  selector: 'app-dropdown-generator',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    ListboxModule,
  ],
  templateUrl: './dropdown-generator.component.html',
  styleUrl: './dropdown-generator.component.scss',
})
export class DropdownGeneratorComponent implements OnInit {
  dropdownGroups: IDropdownGroup[] = [];
  newGroupName: string = '';
  newItemName: string = '';
  selectedGroup: IDropdownGroup | null = null;

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  addGroup(): void {
    if (this.newGroupName.trim()) {
      this.dropdownGroups.push({
        name: this.newGroupName,
        items: [],
      });
      this.newGroupName = '';
      this.saveToLocalStorage();
    }
  }

  addItem(): void {
    if (this.selectedGroup && this.newItemName.trim()) {
      const newItem: IDropdownItem = {
        id: this.generateId(),
        name: this.newItemName,
      };
      this.selectedGroup.items.push(newItem);
      this.newItemName = '';
      this.saveToLocalStorage();
    }
    //console.log('groups[]: ', this.dropdownGroups);
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  saveToLocalStorage(): void {
    localStorage.setItem('dropdownGroups', JSON.stringify(this.dropdownGroups));
  }

  loadFromLocalStorage(): void {
    const data = localStorage.getItem('dropdownGroups');
    if (data) {
      this.dropdownGroups = JSON.parse(data);
    }
  }
}
