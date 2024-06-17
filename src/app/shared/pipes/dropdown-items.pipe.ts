import { Pipe, PipeTransform } from '@angular/core';
import { IDropdownItem } from '../models/dropdown-item.interface';
import { LocalStorageEnum } from '../enums/local-storage.enum';
import { ISavedDropdownGroup } from '../models/saved-dropdown-group.interface';

@Pipe({
  name: 'dropdownItems',
  standalone: true,
})
export class DropdownItemsPipe implements PipeTransform {
  transform(name: string | undefined): IDropdownItem[] {
    if (!name) {
      return [];
    }

    return this.getDropdownItems(name);
  }

  getDropdownItems(name: string): IDropdownItem[] {
    const groupsItem = localStorage.getItem(LocalStorageEnum.DropdownGroups);

    if (!groupsItem) {
      return [];
    }

    const groups = JSON.parse(groupsItem) as ISavedDropdownGroup[];
    const items: IDropdownItem[] = groups.reduce(
      (acc: IDropdownItem[], group) => {
        if (group.name === name) {
          return group.items;
        }

        return acc;
      },
      []
    );

    return items;
  }
}
