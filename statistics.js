class Statistics {
    constructor() {
        this.gameResults = [];
    }

    addGameToStatistics(win, bid) {
        let gameResult = {
            win,
            bid,
        }
        this.gameResults.push(gameResult);
    }

    showGameStats() {
        let games = this.gameResults.length;
        let wins = this.gameResults.filter(check => check.win).length
        let losses = this.gameResults.filter(check => !check.win).length
        return [games, wins, losses]
    }
}

const stats = new Statistics()