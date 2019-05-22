import {Player} from "nodito";
import {PPT, PPTMoves, PPTRoom} from "./PPTRoom";

export class PPTPlayer extends Player {

    protected room: PPTRoom | null = null;

    start(): void {
        this.playValidMoves();
    }

    opponent(): PPTPlayer {
        return super.opponent() as PPTPlayer;
    }

    playValidMoves() {
        this.takeTurn(PPTMoves.map(x => ({cmd: "move", choose: x})));
    }

    playGame(answer: any) {
        switch (answer.cmd) {
            case "move":
                this.move(answer.choose);
                break;
            default:
                console.log("Unknown command");
        }
    }

    move(play: PPT) {
        const moveNumber = this.room.getMoveNumber(this)
        this.room.addPlay(this, play);
        const opponentPlay = this.room.getMoveFrom(this.opponent(), moveNumber);
        this.room.sendStatusToAll();
        if (!opponentPlay) {
            // wait for opponent to play
            this.setInTurn(false);
            return;
        }
        const winner = this.room.checkWinner();
        setTimeout(() => {
            if (winner) {
                winner.send({type: "winGame"});
                winner.restOfPlayers().forEach(x => x.send({type: "loseGame"}));
                this.room.finish();
            } else {
                this.room.playMoves();
            }
        }, 3500);
    }


    sendStatus() {
        if (!this.user) {
            return;
        }
        if (this.isPlaying()) {
            this.send({
                type: "playStatus",
                data: {
                    game: "PPT",
                    pptStatus: this.room.getStatus(this),
                    isPlaying: true,
                    player: this.user.toClient(true),
                    opponent: this.opponent().user.toClient(true),
                    questions: this.asked,
                }
            });
        } else {
            this.send({
                type: "updateState",
                data: {
                    pptStatus: null,
                    isPlaying: false,
                    opponent: null,
                    player: this.user.toClient(),
                    questions: [],
                }
            });
        }
    }
}