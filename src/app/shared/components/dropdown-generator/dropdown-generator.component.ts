import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';


interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownGroup {
  name: string;
  items: DropdownItem[];
}

@Component({
  selector: 'app-dropdown-generator',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    ListboxModule
  ],
  templateUrl: './dropdown-generator.component.html',
  styleUrl: './dropdown-generator.component.scss'
})
export class DropdownGeneratorComponent {
  dropdownGroups: DropdownGroup[] = [];
  newGroupName: string = '';
  newItemName: string = '';
  selectedGroup: DropdownGroup | null = null;

  addGroup(): void {
    if (this.newGroupName.trim()) {
      this.dropdownGroups.push({
        name: this.newGroupName,
        items: []
      });
      this.newGroupName = '';
    }
  }

  addItem(): void {
    if (this.selectedGroup && this.newItemName.trim()) {
      const newItem: DropdownItem = {
        id: this.generateId(),
        name: this.newItemName
      };
      this.selectedGroup.items.push(newItem);
      this.newItemName = '';
    }
    //console.log('groups[]: ', this.dropdownGroups);
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
