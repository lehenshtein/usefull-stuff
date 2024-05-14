import { IMatrixBlock, IVector2D } from '@shared/models/matrix.interface';

let openNodes: {[key: string]: IMatrixBlock} = {};
let closedNodes: IMatrixBlock[] = [];

export function pathfinder(matrix: IMatrixBlock[][], sourceCoordinates: IVector2D, destinationCoordinates: IVector2D, sourceId: string, destinationId: string) {
  if (sourceId === destinationId) {
    console.log('Found');
    return;
  }

  checkNodes(matrix, sourceCoordinates, destinationId);

  console.log(openNodes);
}

function checkNodes(matrix: IMatrixBlock[][], sourceCoordinates: IVector2D, destinationId: string) {
  const moves = [[0, -1], [-1, 0], [0, 1], [1, 0]];
  moves.forEach(move => {
    if (isNodeValid(sourceCoordinates, matrix, move)) {
      resolveNode(matrix[sourceCoordinates.y + move[1]][sourceCoordinates.x + move[0]], destinationId);
    }
    // let checkingNode = matrix[sourceCoordinates.y + move[1]][sourceCoordinates.x + move[0]];
  })

  // checkTopNode(matrix, sourceCoordinates, destinationId);
  // checkLeftNode(matrix, sourceCoordinates, destinationId);
  // checkBottomNode(matrix, sourceCoordinates, destinationId);
  // checkRightNode(matrix, sourceCoordinates, destinationId);
}

// function checkTopNode(matrix: IMatrixBlock[][], sourceCoordinates: IVector2D, destinationId: number) {
//   if (!(sourceCoordinates.y - 1 < 0)) {
//     let checkingNode = matrix[sourceCoordinates.y - 1][sourceCoordinates.x];
//     resolveNode(checkingNode, destinationId);
//   }
// }
//
// function checkLeftNode(matrix: IMatrixBlock[][], sourceCoordinates: IVector2D, destinationId: number) {
//   if (!(sourceCoordinates.x - 1 < 0)) {
//     let checkingNode = matrix[sourceCoordinates.y][sourceCoordinates.x - 1];
//     resolveNode(checkingNode, destinationId);
//   }
// }
// function checkBottomNode(matrix: IMatrixBlock[][], sourceCoordinates: IVector2D, destinationId: number) {
//   if (!(sourceCoordinates.y + 1 > matrix.length - 1)) {
//     let checkingNode = matrix[sourceCoordinates.y + 1][sourceCoordinates.x];
//     resolveNode(checkingNode, destinationId);
//   }
// }
// function checkRightNode(matrix: IMatrixBlock[][], sourceCoordinates: IVector2D, destinationId: number) {
//   if (!(sourceCoordinates.x + 1 > matrix[sourceCoordinates.y][sourceCoordinates.x + 1])) {
//     let checkingNode = matrix[sourceCoordinates.y][sourceCoordinates.x + 1];
//     resolveNode(checkingNode, destinationId);
//   }
// }

function isNodeValid(sourceCoordinates: IVector2D, matrix: IMatrixBlock[][], move: number[]) {
  let checkingNodeCoordinates: IVector2D = {
    x: sourceCoordinates.x + move[0],
    y: sourceCoordinates.y + move[1]
  };

  if (
    (checkingNodeCoordinates.x < 0) ||
    (checkingNodeCoordinates.y < 0) ||
    (checkingNodeCoordinates.y > (matrix.length - 1)) ||
    (checkingNodeCoordinates.x > (matrix[sourceCoordinates.y].length - 1))) {
    console.log(checkingNodeCoordinates);
    console.log('is X < 0', checkingNodeCoordinates.x < 0);
    console.log('is Y < 0', checkingNodeCoordinates.y < 0);
    console.log('is Y > matrix length', checkingNodeCoordinates.y > (matrix.length - 1));
    console.log('is X > matrix length', checkingNodeCoordinates.x > (matrix[sourceCoordinates.y].length - 1));
    return false;
  }

  let checkingNode = matrix[sourceCoordinates.y + move[1]][sourceCoordinates.x + move[0]];
  return checkingNode.type !== 'non-reachable';
}

function resolveNode(checkingNode: IMatrixBlock, destinationId: string) {
  if (checkingNode.type === 'non-reachable') {
    return;
  }
  if (checkingNode.id === destinationId) {
    console.log('node found', 'coordinates: x - ' + checkingNode.coordinates.x + ' y - ' + checkingNode.coordinates.y);
    return;
  }
  const nodeKey = checkingNode.coordinates.x + ':' + checkingNode.coordinates.y;
  if (!openNodes[nodeKey]) {
    openNodes = {...openNodes, [nodeKey]: checkingNode};
  }
}
