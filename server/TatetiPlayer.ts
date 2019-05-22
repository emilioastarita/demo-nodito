import {Player} from "nodito";
import {BoardCell, TatetiRoom} from "./TatetiRoom";

export class TatetiPlayer extends Player {

    room: TatetiRoom;
    moveName: BoardCell = BoardCell.Empty;

    start(): void {
        this.playValidMoves();
    }

    playValidMoves() {
        const moves = this.room.validMoves();
        this.restOfPlayers().forEach((p) => p.setInTurn(false));
        this.takeTurn(moves.map(x => ({...x, cmd: "move"})));
    }

    playGame(answer: any) {
        switch (answer.cmd) {
            case "move":
                this.move(answer.x, answer.y);
                break;
            default:
                console.log("Unknown command");
        }
    }

    checkWin(){
        return this.room.checkWin(this.moveName)
    }


    move(x: number, y: number) {
        this.room.setMove(x, y, this.moveName);
        this.room.sendStatusToAll();
        if (this.checkWin()) {
            this.send({type: "winGame"});
            this.restOfPlayers().forEach(x => x.send({type: "loseGame"}));
            this.room.finish();
        } else if (this.room.validMoves().length === 0) {
            this.room.each(x => x.send({type: "tieGame"}));
            this.room.finish();
        } else {
            this.nextPlayer().playValidMoves();
        }
    }

    setMoveName(board: BoardCell) {
        this.moveName = board;
    }

    nextPlayer(): TatetiPlayer {
        return this.restOfPlayers()[0] as TatetiPlayer;
    }

    sendStatus() {
        if (!this.user) {
            return;
        }
        if (this.isPlaying()) {
            this.send({type: "playStatus",
                data: {
                    game: "tateti",
                    board: this.room.getBoard(),
                    isPlaying: true,
                    player: this.user.toClient(true),
                    opponent: this.restOfPlayers()[0].user.toClient(true),
                    questions: this.asked,
            }});
        } else {
            this.send({type: "updateState",
                data: {
                    board: [],
                    isPlaying: false,
                    opponent: null,
                    player: this.user.toClient(),
                    questions: [],
                }});
        }
    }
}