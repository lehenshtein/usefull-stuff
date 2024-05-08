import { Component, OnInit, effect, inject } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DynamicDialogContent } from 'primeng/dynamicdialog/dynamicdialogcontent';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [],
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.scss',
})
export class UserEditModalComponent implements OnInit {
  private modalService = inject(ModalService);
  public dialogConfig = inject(DynamicDialogConfig);

  ngOnInit(): void {
    console.log('Dialog data: ', this.dialogConfig.data);
  }
}
