/**s
 * @class Game Die Game Klasse beinhaltet die Grundsteuerung für das Game
 */
class Game {
    //Das im Browser angezeigte Canvas
    gameCanvas = document.createElement("canvas");
    gameContext = this.gameCanvas.getContext("2d");

    //Gegner im Game
    createdEnemys = [];

    //Kontrollvariable ob das Game zu Ende ist
    end = false;

    /**
     * @function Erstellt ein Objekt der Game Klasse
     */
    constructor() {
        this.gameCanvas = document.getElementById("GameCanvas");
        this.gameCanvas.width = 1280;
        this.gameCanvas.height = 720;
        this.gameContext = this.gameCanvas.getContext("2d");
        this.end = false;
    }

    /**
     * @function Diese Funktion dient zur einmaligen Initialisierung am Levelstart
     */
    initialize() {
        sound.playIntroBackgroundMusic(usedLevel);

        this.createdEnemys = [];

        for (const enemy of map.enemys) {
            let buffer = new Enemy(enemy.x, enemy.y, enemy.width, enemy.height, enemy.enemyID,
                enemy.movementDirection, enemy.health);
            this.createdEnemys.push(buffer);
        }
    }

    /**
     * @function Die update Funktion updated alle notwendigen Objekte
     */
    update(deltaTime = 0) {
        sound.playBackgroundMusic(usedLevel);
        sound.updateSounds();

        //Aktualisiert die Gegner
        if (player.setSpaceshipInitialSpeed || !player.isPlayerSpaceship) {
            for (const createdEnemy of this.createdEnemys) {
                createdEnemy.update(deltaTime);
                for (const shoot of createdEnemy.shoots) {
                    shoot.update(deltaTime);
                }
            }
        }

        this.checkIfEnemyDead();

        //Aktualisiert den Spieler
        player.update(deltaTime);

        //Aktualisiert die Schüsse des Spielers
        for (const shoot of player.shoots) {
            shoot.update(deltaTime);
        }

        //Updated die Map
        map.updateMap();

        //Überprüfe ob das nächste Level aufgerufen werden soll
        this.getNextLevel();
    }

    /**
     * @function Die draw Funktion zeichnet die Map mit allen notwendigen Objekten
     */
    draw() {
        //Zeichnet die Map
        map.draw(this.gameContext);

        //Zeichnet den Spieler
        player.draw(this.gameContext);

        //Zeichnet die Gegner
        for (const createdEnemy of this.createdEnemys) {
            if (!createdEnemy.dead) {
                createdEnemy.draw(this.gameContext);
            }
            for (const shoot of createdEnemy.shoots) {
                shoot.draw(this.gameContext);
            }
        }

        //Zeichnet die Schüsse
        for (const shoot of player.shoots) {
            shoot.draw(this.gameContext);
        }
    }

    checkIfEnemyDead() {
        for (let i = 0; i < this.createdEnemys.length; i++) {
            if (this.createdEnemys[i].dead && this.createdEnemys[i].shoots.length <= 0) {
                this.createdEnemys.splice(i, 1);
            }
        }
    }

    /**
     * @function Die getNextLevel Funktion überprüft ob der Spieler am Levelende ist und somit das nächste Level geladen werden kann
     */
    getNextLevel() {
        if (player.animatedOnce && player.hitLevelEnd) {
            if (usedLevel < backgrounds.length) {
                //Erhöht das Level
                usedLevel++;

                //Setzt den Spieler
                usedPlayerGraphic++;
                /*if (usedLevel === 2) {
                    usedPlayerGraphic = 1;
                } else {
                    usedPlayerGraphic = 0;
                }*/

                //Erstellt eine neue Map mit dem entsprechenden Level
                map = new Map(testLevels["level" + usedLevel]);

                //Erstellt einen neuen Spieler als Objekt
                player = new Player(map.startPos.x, map.startPos.y, playerDrawInfo[usedPlayerGraphic].playerSpritesheet,
                    playerDrawInfo[usedPlayerGraphic].width, playerDrawInfo[usedPlayerGraphic].height,
                    playerDrawInfo[usedPlayerGraphic].isSpaceship);

                this.initialize();
            }
            else {
                game.end = true;

                usedLevel = -1;
                map = new Map(testLevels["endscreen"]);
                player = new Player(map.startPos.x, map.startPos.y, playerDrawInfo[0].playerSpritesheet,
                    0, 0, 0);
                this.initialize();
            }
        }
    }

    /**
     * @function Funktion um das Level neu zu starten
     */
    startLevelNew() {
        //Erstellt eine neue Map mit dem entsprechenden Level
        map = new Map(testLevels["level" + usedLevel]);

        //Erstellt einen neuen Spieler als Objekt
        player = new Player(map.startPos.x, map.startPos.y, playerDrawInfo[usedPlayerGraphic].playerSpritesheet,
            playerDrawInfo[usedPlayerGraphic].width, playerDrawInfo[usedPlayerGraphic].height,
            playerDrawInfo[usedPlayerGraphic].isSpaceship);

        this.initialize();
    }

    /**
     * @function Setzt das Canvas in Fullscreen oder beendet diesen, falls die entsprechende Taste gedrückt wurde
     */
    changeFullScreen() {
        options.changeFullScreen = false;

        if (!options.isFullScreen) {
            this.gameCanvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

        options.isFullScreen = !options.isFullScreen;
    }
}