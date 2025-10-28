/**
 * @class Shoot Die Shoot Klasse dient zur Erstellung eines neuen Schusses
 */
class Shoot {
    //Die X und Y Pixelposition die der Schuss hat
    xPosition = 0;
    yPosition = 0;

    //Höhe und Breite des Spielers
    width = 40;
    height = 40;

    //Die Geschwindigkeiten die der Schuss hat
    normalSpeed = 300;
    endSpeed = 0;

    //Welcher Schuss grafisch verwendet werden soll
    shootTile = 0;

    //Kontrollvariable die überprüft ob der Schuss einen Gegner oder das Levelende getroffen hat
    shootHit = false;

    //Kontrollvariable ob der Schuss von einem Gegner ist oder nicht
    isFromEnemy = false;

    /**
     * @function Erstellt ein Objekt der Schuss-Klasse und setzt dabei notwendige Variablen
     * @param startX Die Start X Pixelposition des Schusses
     * @param startY Die Start Y Pixelposition des Schusses
     * @param shootWidth Die Breite des Schusses
     * @param shootHeight Die Höhe des Schusses
     * @param shootSpeed Die Geschwindigkeit des Schusses
     * @param shootTile Die Grafik des Schusses
     * @param isFromEnemy Ob der Schuss vom Gegner oder dem Spieler kommt
     */
    constructor(startX = 0, startY = 0, shootWidth = 40, shootHeight = 40,
                shootSpeed = 300, shootTile = 0, isFromEnemy = false) {
        this.xPosition = startX;
        this.yPosition = startY;
        this.width = shootWidth;
        this.height = shootHeight;
        this.normalSpeed = shootSpeed + player.normalSpeed;
        this.shootTile = shootTile;
        this.isFromEnemy = isFromEnemy;

        this.shootHit = false;
    }

    /**
     * @function Aktualisiert den Spieler/Überprüft ob es Änderungen gab
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    update(deltaTime = 0) {
        this.move();
        this.checkCollision();
        if (!player.hitLevelEnd) {
            this.checkEnemyPlayerCollision();
        }
        this.updateVariables(deltaTime);
    }

    /**
     * @function Überprüft den Zustand (Position, usw.) und aktualisiert entsprechend die Variablen
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariables(deltaTime = 0) {
        this.endSpeed = this.normalSpeed * deltaTime;
    }

    /**
     * @function Überprüft ob das Mapende berührt wurde
     */
    checkCollision() {
        if (this.xPosition >= (map.mapCanvas.width - this.width) || this.xPosition <= 0) {
            this.shootHit = true;
        }
    }

    /**
     * @function Berechnet ob der Schuss mit einem Gegner oder Spieler kollidiert
     */
    checkEnemyPlayerCollision() {
        let shootCollisionBox = {
            x0: Math.floor(this.xPosition/collisionTileWidth),
            y0: Math.floor(this.yPosition/collisionTileHeight),
            x1: Math.floor((this.xPosition + this.width - 1)/collisionTileWidth),
            y1: Math.floor((this.yPosition + this.height - 1)/collisionTileHeight)
        };

        if (!this.isFromEnemy) {
            for (const createdEnemy of game.createdEnemys) {
                let enemyCollisionBox = createdEnemy.getCollisionBox();

                if (!createdEnemy.dead) {
                    if (shootCollisionBox.x1 > enemyCollisionBox.x0 && shootCollisionBox.x0 < enemyCollisionBox.x1 &&
                        shootCollisionBox.y0 < enemyCollisionBox.y1 && shootCollisionBox.y1 && shootCollisionBox.y1 > enemyCollisionBox.y0) {
                        --createdEnemy.health;
                        this.shootHit = true;
                    }
                }
            }
        }
        else {
            let playerCollisionBox = player.getCollisionBox();

            if (shootCollisionBox.x1 > playerCollisionBox.x0 && shootCollisionBox.x0 < playerCollisionBox.x1 &&
                shootCollisionBox.y0 < playerCollisionBox.y1 && shootCollisionBox.y1 && shootCollisionBox.y1 > playerCollisionBox.y0) {
                --player.health;
                this.shootHit = true;
            }
        }
    }

    /**
     * @function Regelt die Movementkontrolle für den Schuss
     */
    move() {
        this.xPosition += this.endSpeed;
    }

    /**
     * @function Zeichnet den aktuellen Zustand des Schusses auf das Canvas
     * @param canvasContext Das Canvas auf welchem der Schuss gezeichnet wird
     */
    draw(canvasContext) {
        if (!player.isPlayerSpaceship) {
            if (player.xPosition >= map.mapCanvas.width - canvasContext.canvas.width / 2) {
                canvasContext.drawImage(shootTileset, this.shootTile * this.width, 0,
                    this.width, this.height, this.xPosition - canvasContext.canvas.width / 2 - this.width, this.yPosition, this.width, this.height);
            } else if (player.xPosition <= canvasContext.canvas.width / 2) {
                canvasContext.drawImage(shootTileset, this.shootTile * this.width, 0,
                    this.width, this.height, this.xPosition, this.yPosition, this.width, this.height);
            } else {
                canvasContext.drawImage(shootTileset, this.shootTile * this.width, 0,
                    this.width, this.height, this.xPosition - player.xPosition + canvasContext.canvas.width / 2, this.yPosition, this.width, this.height);
            }
        }
        else {
            if (player.xPosition >= map.mapCanvas.width - canvasContext.canvas.width) {
                canvasContext.drawImage(shootTileset, this.shootTile * this.width, 0,
                    this.width, this.height, this.xPosition - (map.mapCanvas.width - canvasContext.canvas.width) + this.width/4 + this.width, this.yPosition, this.width, this.height);
            }
            else {
                canvasContext.drawImage(shootTileset, this.shootTile * this.width, 0,
                    this.width, this.height, (this.xPosition - player.xPosition) + this.width, this.yPosition, this.width, this.height);
            }
        }
    }


}