import { Component, inject } from '@angular/core';
import { CreateTableModalComponent } from '@app/shared/components/create-table-modal/create-table-modal.component';
import { ModalService } from '@app/shared/services/modal.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table-generator',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './table-generator.component.html',
  styleUrl: './table-generator.component.scss',
})
export class TableGeneratorComponent {
  private modalService = inject(ModalService);

  showModal() {
    this.modalService.showModal(CreateTableModalComponent, {
      header: 'Create New Table',
      width: '55vw',
      breakpoints: {
        '1280px': '60vw',
        '960px': '70vw',
        '790px': '85vw',
      },
    });
  }
}
