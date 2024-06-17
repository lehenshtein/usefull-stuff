import { LocalStorageEnum } from '@shared/enums/local-storage.enum';

export function initializeStorage(): void {
  Object.values(LocalStorageEnum).forEach((key) => {
    if (!localStorage.getItem(key)) {
      createDefaultStorageItem(key);
    }
  });
}

export function createDefaultStorageItem(key: string): void {
  switch (key) {
    case LocalStorageEnum.AuthToken:
      localStorage.setItem(key, '');
      break;
    case LocalStorageEnum.User:
      localStorage.setItem(key, 'user');
      break;
  }
}
