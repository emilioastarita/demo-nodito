import {Room} from "nodito";
import {TatetiPlayer} from "./TatetiPlayer";

export interface Move {
    x: number;
    y: number;
}

export enum BoardCell {
    X,
    O,
    Empty,
}


export class TatetiRoom extends Room<TatetiPlayer> {
    protected type: string = 'Tateti';
    private board: BoardCell[][] = TatetiRoom.makeBoard();

    private static makeBoard() {
        return [
            [BoardCell.Empty, BoardCell.Empty, BoardCell.Empty,],
            [BoardCell.Empty, BoardCell.Empty, BoardCell.Empty,],
            [BoardCell.Empty, BoardCell.Empty, BoardCell.Empty,],
        ];
    }

    public validMoves(): Move[] {
        const moves: Move[] = [];
        this.board.forEach((row, x) =>
            row.forEach((item, y) => {
                if (item === BoardCell.Empty) {
                    moves.push({x, y})
                }
            }));
        return moves;
    }

    public getBoard() {
        return this.board;
    }

    start(): void {
        super.start();
        this.users[0].player.setMoveName(BoardCell.X);
        this.users[1].player.setMoveName(BoardCell.O);
        this.board = TatetiRoom.makeBoard();
        this.owner().player.start();
    }

    setMove(x: number, y: number, moveName: BoardCell) {
        this.board[x][y] = moveName;
    }

    checkWin(moveName: BoardCell) {
        const b = this.board;
        const z = b.length;
        const eq = (x: BoardCell[]) => x[0] === x[1] && x[0] === x[2] && x[0] === moveName;
        for (let i = 0; i < z; i++) {
            if (eq([
                b[i][0],
                b[i][1],
                b[i][2],
            ])) {
                return true;
            }
            if (eq([
                b[0][i],
                b[1][i],
                b[2][i],
            ])) {
                return true;
            }
        }
        return eq([
            b[0][2],
            b[1][1],
            b[2][0],
        ]) || eq([
            b[0][0],
            b[1][1],
            b[2][2],
        ]);
    }
}