import { Component, OnInit } from '@angular/core';
import { IMatrixBlock, IVector2D } from '@shared/models/matrix.interface';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { randomIntFromInterval } from '@shared/helpers/random-int-from-interval.helper';
import { pathfinder } from '@shared/helpers/pathfinder.helper';

@Component({
  selector: 'app-pathfinder',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './pathfinder.component.html',
  styleUrl: './pathfinder.component.scss'
})
export class PathfinderComponent implements OnInit {
  matrixX = 20;
  matrixY = 30;
  matrix: IMatrixBlock[][] = [];
  sourceObjId: string | null = null;
  destinationObjId: string | null = null;
  sourceObjCoordinates?: IVector2D;
  destinationObjCoordinates?: IVector2D;
  unreachableBlocksModifier = 7;

  ngOnInit(): void {
    for (let y = 0; y < this.matrixY; y++) {
      let row: IMatrixBlock[] = [];
      for (let x = 0; x < this.matrixX; x++) {
        const isBlockUnreachable = randomIntFromInterval(1, this.unreachableBlocksModifier) === this.unreachableBlocksModifier;
        let matrixObj: IMatrixBlock = {
          id: x.toString() + y.toString(),
          type: isBlockUnreachable ? 'non-reachable' : 'default',
          visual: 'unchecked',
          coordinates: { x, y }
        }
        row.push(matrixObj)
      }
      this.matrix.push(row)
    }
  }

  selectNode(rowIndex: number, columnIndex: number, matrixObj: IMatrixBlock) {
    if (matrixObj.type === 'non-reachable') {
      return;
    }
    if (!this.sourceObjCoordinates) {
      this.sourceObjId = matrixObj.id;
      this.sourceObjCoordinates = { x: columnIndex, y: rowIndex };
      this.matrix[rowIndex][columnIndex].visual = 'source';
      return;
    }
    if (!this.destinationObjCoordinates) {
      this.destinationObjId = matrixObj.id;
      this.destinationObjCoordinates = { x: columnIndex, y: rowIndex };
      this.matrix[rowIndex][columnIndex].visual = 'destination';
    }

    if (this.sourceObjCoordinates && this.destinationObjCoordinates && this.sourceObjId !== null && this.destinationObjId !== null) {
      pathfinder(this.matrix, this.sourceObjCoordinates, this.destinationObjCoordinates, this.sourceObjId, this.destinationObjId)
    }
  }
}
