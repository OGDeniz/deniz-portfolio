/**
 * @class Enemy Die Enemy Klasse dient zur Erstellung und Steuerung eines neuen Gegners
 */
class Enemy {
    //Die X und Y Position des Gegners
    xPosition = 0;
    yPosition = 0;

    //Breite und Höhe des Gegners
    width = 40;
    height = 40;

    //Parameter welcher Gegner es ist
    enemyID = 1;

    //Die Animationsparameter um die einzelnen Frames aus dem Spritesheet korrekt zu animieren
    interval = 0;
    intervalTime = 1/13;
    maxFrames = 3;
    frame = 0;
    animation = 0;

    //Bewegungsgeschwindigkeit des Gegners
    moveSpeed = 250;
    endSpeed = 0;
    gravitationSpeed = 200;
    endGravitation = 0;
    fallSpeed = 0;
    endFallSpeed = 0;

    //Kontrollvariable um festzustellen ob Gegner auf dem Boden ist sofern dieser von Gravitation beeinflusst wird
    enemyOnFloor = false;

    //Die Position des Boden mit dem kollidiert wurde
    posFloor = {
        x: 0,
        y: 0
    };

    //Kontrollvariable um festzustellen ob der Gegner gerade "gespawnt" wurde um danach seine Bewegung zu starten
    startMovement = true;

    //Legt fest auf welcher Achse sich ein Gegner sich bewegt (Gilt nur für manche Gegner)
    movementDirection = "";

    //Legt fest in welche Richtung sich der Gegner bewegt (Gilt nur für manche Gegner)
    directionNow = "";

    //Objekt für eine generelle Kollisionserkennung
    collisions = [];

    //Objekt in dem Plattformen, Böden, Wände, etc. gespeichert werden mit denen der Charakter kollidierte
    collidedObjects = [];

    //Richtung in der der Gegner kollidiert ist
    collisionDirection = {
        left: false,
        top: false,
        right: false,
        bottom: false
    };

    //Verwendetes Spritesheet
    usedSpritesheet = document.createElement("img");

    //Kontrollvariable ob der Gegner schießt
    shootEnabled = false;

    //Variable die alle Schüsse enthält die vom Spieler abgegeben wurden
    shoots = [];

    //Variable die abspeichert wann das letzte mal geschossen wurde
    timeLastShot = 0;

    //Variable die bestimmt wie schnell der Gegner schießt
    shootingSpeed = 1000/4;

    //Kontrollvariable ob der Gegner noch am "Leben" ist
    dead = false;

    //Kontrollvariable wie viel Leben ein Gegner hat
    health = 1;

    /**
     * Erstellt einen Gegner und Positioniert diesen im Level
     * @param xPosition Die Start X Pixelposition des Gegners
     * @param yPosition Die Start Y Pixelposition des Gegners
     * @param enemyWidth Die Breite des Gegners
     * @param enemyHeight Die Höhe des Gegners
     * @param enemyID Die ID des Gegners (legt fest welcher Gegner es ist/was dieser macht)
     * @param movementDirection Legt fest ob sich ein Gegner vertikal oder horizontal ("vertical"/"horizontal") bewegt
     * (Gilt nur für manche Gegner nicht für alle)
     * @param enemyHealth Legt die Leben fest die ein Gegner hat
     */
    constructor(xPosition = 0, yPosition = 0, enemyWidth = 40, enemyHeight = 40,
                enemyID = 1, movementDirection = "", enemyHealth = 1) {
        //Übernahme der übergebenen Parameter
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = enemyWidth;
        this.height = enemyHeight;
        this.enemyID = enemyID;
        this.movementDirection = movementDirection;
        this.health = enemyHealth;

        //Setzt die Defaultwerte der Variablen
        this.startMovement = true;
        this.interval = 0;
        this.frame = 0;
        this.timeLastShot = Date.now();
        this.shoots = [];
        this.posFloor = {
            x: 0,
            y: 0
        };
        switch (enemyID) {
            case 1:
                this.maxFrames = 3;
                this.animation = 0;
                this.intervalTime = 1/13;
                this.moveSpeed = 250;
                this.usedSpritesheet = enemy1Spritesheet;
                this.shootEnabled = false;
                break;
            case 2:
                this.maxFrames = 10;
                this.animation = 0;
                this.intervalTime = 1/10;
                this.moveSpeed = 100;
                this.usedSpritesheet = asteroidSpritesheet1;
                this.shootEnabled = false;
                break;
            case 3:
                this.maxFrames = 10;
                this.animation = 0;
                this.intervalTime = 1/10;
                this.moveSpeed = 80;
                this.usedSpritesheet = asteroidSpritesheet2;
                this.shootEnabled = false;
                break;
            case 4:
                this.maxFrames = 10;
                this.animation = 0;
                this.intervalTime = 1/10;
                this.moveSpeed = 60;
                this.usedSpritesheet = asteroidSpritesheet3;
                this.shootEnabled = false;
                break;
            case 5:
            case 6:
                this.maxFrames = 1;
                this.animation = 0;
                this.intervalTime = 1/20;
                this.moveSpeed = 300;
                this.usedSpritesheet = ufoSpritesheet;
                this.shootEnabled = true;
                this.shootingSpeed = 1000;
                this.health = 10;
                break;
            case 7:
                this.maxFrames = 4;
                this.animation = 0;
                this.intervalTime = 1/10;
                this.moveSpeed = 0;
                this.usedSpritesheet = enemy2Spritesheet;
                this.shootEnabled = false;
                this.enemyOnFloor = false;
                break;
            case 8:
                this.maxFrames = 1;
                this.animation = 0;
                this.intervalTime = 1/20;
                this.moveSpeed = 0;
                this.usedSpritesheet = endBossRomero;
                this.shootEnabled = true;
                this.shootingSpeed = 5250;
                this.enemyOnFloor = false;
                this. health = 10;
                break;
            case 9:
                this.maxFrames = 1;
                this.animation = 0;
                this.intervalTime = 1/20;
                this.moveSpeed = 150;
                this.usedSpritesheet = enemy3Spritesheet;
                this.shootEnabled = false;
                break;
        }
        this.dead = false;
    }

    /**
     * @function Aktualisiert den Spieler/Überprüft ob es Änderungen gab
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    update(deltaTime = 0) {
        this.animate(deltaTime);
        this.move();
        this.checkTileCollided();
        this.updateVariables(deltaTime);
        this.updateShoots();
    }

    /**
     * Allgemeine Zustandskontrolle
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariables(deltaTime = 0) {
        if (this.health <= 0) {
            this.dead = true;
        }

        if (this.shootEnabled && !this.dead) {
            let buffer = Date.now() - this.timeLastShot;
            if (buffer >= this.shootingSpeed) {
                if (player.isPlayerSpaceship) {
                    this.shoot(3);
                }
                else {
                    this.shoot(1);
                }
            }
        }

        switch (this.enemyID) {
            case 1:
            case 9:
                this.updateVariablesEnemy1_9(deltaTime);
                break;
            case 2:
            case 3:
            case 4:
                this.updateVariablesEnemy2_3_4(deltaTime);
                break;
            case 5:
            case 6:
                this.updateVariablesEnemy5_6(deltaTime);
                break;
            case 7:
            case 8:
                this.updateVariablesEnemy7_8(deltaTime);
                break;
        }
    }

    /**
     * Überprüft den Zustand (Position, usw.) und aktualisiert entsprechend die Variablen vom Gegner mit der ID 1 und 9
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariablesEnemy1_9(deltaTime = 0) {
        if (this.startMovement) {
            this.endSpeed = -this.moveSpeed * deltaTime;
            this.startMovement = false;
        }

        if (this.movementDirection === "horizontal") {
            if (this.collisionDirection.top || this.yPosition <= 0) {
                this.endSpeed = this.moveSpeed * deltaTime;
                this.directionNow = "down";
            }

            if (this.collisionDirection.bottom || this.yPosition >= game.gameCanvas.height - this.height) {
                this.endSpeed = -this.moveSpeed * deltaTime;
                this.directionNow = "up";
            }
        }
        if (this.movementDirection === "vertical") {
            if (this.collisionDirection.left || this.xPosition <= 0) {
                this.endSpeed = this.moveSpeed * deltaTime;
                this.directionNow = "right";
            }

            if (this.collisionDirection.right || this.xPosition >= map.mapCanvas.width - this.width) {
                this.endSpeed = -this.moveSpeed * deltaTime;
                this.directionNow = "left";
            }
        }

        if (this.directionNow === "down" || this.directionNow === "right") {
            this.endSpeed = this.moveSpeed * deltaTime;
        }
        if (this.directionNow === "up" || this.directionNow === "left") {
            this.endSpeed = -this.moveSpeed * deltaTime;
        }
    }

    /**
     * @function Überprüft den Zustand (Position, usw.) und aktualisiert entsprechend die Variablen vom Gegner mit der ID 2,3 und 4
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariablesEnemy2_3_4(deltaTime) {
        if (this.startMovement) {
            this.endSpeed = -this.moveSpeed * deltaTime;
            this.startMovement = false;
        }

        this.endSpeed = -this.moveSpeed * deltaTime;
    }

    /**
     * @function Überprüft den Zustand (Position, usw.) und aktualisiert entsprechend die Variablen vom Gegner mit der ID 5 und 6
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariablesEnemy5_6(deltaTime) {
        if (this.startMovement) {
            this.endSpeed = -this.moveSpeed * deltaTime;
            this.startMovement = false;
        }

        if (this.collisionDirection.top || this.yPosition <= 0) {
            this.endSpeed = this.moveSpeed * deltaTime;
            this.directionNow = "down";
        }

        if (this.collisionDirection.bottom || this.yPosition >= game.gameCanvas.height - this.height) {
            this.endSpeed = -this.moveSpeed * deltaTime;
            this.directionNow = "up";
        }

        if (this.directionNow === "down") {
            this.endSpeed = this.moveSpeed * deltaTime;
        }
        if (this.directionNow === "up") {
            this.endSpeed = -this.moveSpeed * deltaTime;
        }

        if (this.enemyID === 6) {
            if (player.yPosition  > this.yPosition) {
                this.endSpeed = this.moveSpeed * deltaTime;
            }
            else if (player.yPosition < this.yPosition) {
                this.endSpeed = -this.moveSpeed * deltaTime;
            }
            else {
                this.endSpeed = 0;
            }
        }
    }

    /**
     * Überprüft den Zustand (Position, usw.) und aktualisiert entsprechend die Variablen vom Gegner mit der ID 7
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariablesEnemy7_8(deltaTime = 0) {
        if (this.startMovement) {
            this.endSpeed = -this.moveSpeed * deltaTime;
            this.endGravitation = this.gravitationSpeed * deltaTime;
            this.startMovement = false;
        }

        this.endFallSpeed = this.fallSpeed * deltaTime;
    }

    /**
     * @function Erzeugt einen neuen Schuss
     */
    shoot(shootTile = 3) {
        let buffer = null;
        if (this.enemyID !== 8) {
            buffer = new Shoot(this.xPosition - this.width/2, this.yPosition, 40, 40, -player.normalSpeed * 3, shootTile, true);
        }
        else {
            let randomShootHeight = Math.floor(Math.round(Math.random() * 122)/2);
            buffer = new Shoot(this.xPosition - this.width, this.yPosition + randomShootHeight, 40, 40, -player.normalSpeed * 3, shootTile, true);
        }

        if (buffer !== null) {
            this.shoots.push(buffer);
        }
        this.timeLastShot = Date.now();
    }

    /**
     * @function Überprüft ob von allen bisher abgegebenen Schüssen einer das Levelende oder den Spieler getroffen hat
     * und löscht diesen daraufhin
     */
    updateShoots() {
        if (this.dead) {
            this.shoots = [];
        }
        for (let i = 0; i < this.shoots.length; i++) {
            if (this.shoots[i].shootHit) {
                this.shoots.splice(i, 1);
            }
        }
    }

    /**
     * @function Überprüft welche Art von Tiles der Gegner berührt
     */
    checkTileCollided() {
        //Überprüft ob der Spieler ein als Kollision markiertes Tile berührt
        this.collisions = map.checkIfTileHit(this.xPosition, this.yPosition, this.width, this.height);
        this.collidedObjects = [];
        this.collisionDirection = {
            left: false,
            top: false,
            right: false,
            bottom: false
        };

        for (const collision of this.collisions) {
            //Überprüfe ob es eine Kollision mit einem kollidierbaren Element gab
            if (COLLIDABLE_TILES.includes(collision.tileIndex)) {
                this.collidedObjects.push(collision);
            }
        }

        for (const collidedObject of this.collidedObjects) {
            //Überprüft ob es eine Kollision auf der linken Seite gab
            if (collidedObject.botLeft && collidedObject.leftMid ||
                collidedObject.leftMid && collidedObject.topLeft ||
                collidedObject.botLeft && collidedObject.topLeft ||
                collidedObject.leftMid) {
                this.collisionDirection.left = true;
            }
            //Überprüft ob es eine Kollision auf der oberen Seite gab
            if (collidedObject.topLeft && collidedObject.topMid ||
                collidedObject.topMid && collidedObject.topRight ||
                collidedObject.topLeft && collidedObject.topRight ||
                collidedObject.topMid) {
                this.collisionDirection.top = true;
            }
            //Überprüft ob es eine Kollision auf der rechten Seite gab
            if (collidedObject.botRight && collidedObject.rightMid ||
                collidedObject.rightMid && collidedObject.topRight ||
                collidedObject.botRight && collidedObject.topRight ||
                collidedObject.rightMid) {
                this.collisionDirection.right = true;
            }
            //Überprüft ob es eine Kollision auf der unteren Seite gab
            if (collidedObject.botLeft && collidedObject.botMid ||
                collidedObject.botMid && collidedObject.botRight ||
                collidedObject.botLeft && collidedObject.botRight ||
                collidedObject.botMid) {
                this.collisionDirection.bottom = true;
                this.enemyOnFloor = true;
                this.posFloor = {
                    x: collidedObject.x,
                    y: collidedObject.y
                };
            }
        }
    }

    /**
     * @function Gibt die Ecken des Gegners als Objekt zurück
     * @returns {{y0: number, x0: number, y1: number, x1: number}} Objekt mit den vier Ecken des Gegners.
     * Die Ecken werden hierbei nicht als Tileposition sondern mit der Kollisionstileposition angegeben,
     * da dies eine genauere Kollisionserkennung ermöglicht
     */
    getCollisionBox() {
        return {
            x0: Math.floor(this.xPosition/collisionTileWidth),
            y0: Math.floor(this.yPosition/collisionTileHeight),
            x1: Math.floor((this.xPosition + this.width - 1)/collisionTileWidth),
            y1: Math.floor((this.yPosition + this.height - 1)/collisionTileHeight)
        };
    }

    /**
     * @function Regelt die allgemeine Movementkontrolle für alle Gegner
     */
    move() {
        switch (this.enemyID) {
            case 1:
            case 9:
                this.moveEnemy1_9();
                break;
            case 2:
            case 3:
            case 4:
                this.moveEnemy2_3_4();
                break;
            case 5:
            case 6:
                this.moveEnemy5_6();
                break;
            case 7:
            case 8:
                this.moveEnemy7_8();
                break;
        }

        this.xPosition = Math.floor(this.xPosition);
        this.yPosition = Math.floor(this.yPosition);
    }

    /**
     * @function Die spezille Movementkontrolle für den Gegner mit der ID 1
     */
    moveEnemy1_9() {
        if (this.movementDirection === "horizontal") {
            this.yPosition += this.endSpeed;
        }
        if (this.movementDirection === "vertical") {
            this.xPosition += this.endSpeed;
        }
    }

    /**
     * @function Die spezille Movementkontrolle für den Gegner mit der ID 2,3 und 4
     */
    moveEnemy2_3_4() {
        this.xPosition += this.endSpeed;
    }

    /**
     * @function Die spezille Movementkontrolle für den Gegner mit der ID 5 und 6
     */
    moveEnemy5_6() {
        this.yPosition += this.endSpeed;
    }

    /**
     * @function Die spezille Movementkontrolle für den Gegner mit der ID 7 und 8
     */
    moveEnemy7_8() {
        if (this.collisionDirection.bottom) {
            this.yPosition = this.posFloor.y - this.height;
            this.enemyOnFloor = true;
        }
        else {
            this.fallSpeed += this.endGravitation;
            this.yPosition += this.endFallSpeed;
        }
    }

    /**
     * @function Wechselt durch die Frames im Spritesheet um eine Animation des Gegners zu ermöglichen
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    animate(deltaTime = 0) {
        this.interval += deltaTime;

        if (this.interval > this.intervalTime) {
            this.interval = 0;
            this.frame = ++this.frame % this.maxFrames;
        }
    }

    /**
     * @function Zeichnet den aktuellen Zustand des Gegners auf das Canvas
     * @param canvasContext Das Canvas auf welchem der Gegner gezeichnet wird
     */
    draw(canvasContext) {
        if (!player.isPlayerSpaceship) {
            if (player.xPosition >= map.mapCanvas.width - canvasContext.canvas.width / 2) {
                canvasContext.drawImage(this.usedSpritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition - canvasContext.canvas.width / 2 - this.width, this.yPosition, this.width, this.height);
            } else if (player.xPosition <= canvasContext.canvas.width / 2) {
                canvasContext.drawImage(this.usedSpritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition, this.yPosition, this.width, this.height);
            } else {
                canvasContext.drawImage(this.usedSpritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition - player.xPosition + canvasContext.canvas.width / 2, this.yPosition, this.width, this.height);
            }
        }
        else {
            if (player.xPosition >= map.mapCanvas.width - canvasContext.canvas.width) {
                canvasContext.drawImage(this.usedSpritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition - (map.mapCanvas.width - canvasContext.canvas.width) + this.width/4 + this.width/2, this.yPosition, this.width, this.height);
            } else {
                canvasContext.drawImage(this.usedSpritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, (this.xPosition - player.xPosition) + this.width/2, this.yPosition, this.width, this.height);
            }
        }
    }
}
