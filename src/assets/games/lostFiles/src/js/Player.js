/**
 * @class Player Die Player Klasse dient zur Erstellung und Steuerung eines Spielers
 */
class Player {
    //Die X und Y Pixelposition die der Spieler hat
    xPosition = 0;
    yPosition = 0;

    //Höhe und Breite des Spielers
    width = 40;
    height = 40;

    //Kontrollvariable ob der Spieler das Levelende erreicht hat
    hitLevelEnd = false;

    //Die Geschwindigkeiten die der Spieler hat
    normalSpeed = 200;
    endSpeed = 0;

    //Die Gravitation die auf den Spieler wirkt
    gravitation = 300;
    endGravitation = 0;

    //Die Sprungkraft/Wie weit nach oben der Spieler springen kann
    jumpSpeed = 300;

    //Die Fallgeschwindigkeit
    // Eine negative Fallgeschwindigkeit bewegt den Spieler nach oben und umgekehrt
    fallSpeed = 0;

    //Das Spritesheet für den Spieler
    spritesheet = document.createElement("img");

    //Die Animationsparameter um die einzelnen Frames aus dem Spritesheet korrekt zu animieren
    frame = 0;
    animation = 0;
    interval = 0;
    maxFrames = 1;
    intervalTime = 1/20;

    //Kontrollvariablen die dazu dienen zu erkennen ob das Spritesheet nur einmal durchlaufen werden soll
    // und ob es bereits einmal durchlaufen/angezeigt wurde
    animatedOnce = false;
    animateOnce = false;
    executedOnce = false;

    //Kontrollvariable zur Überprüfung ob der Spieler das Raumschiff steuert
    isPlayerSpaceship = false;

    //Kontrollvariable zur Überprüfung ob die Raumschiffsgeschwindigkeit gesetzt wurde nachdem der Spieler dieses bewegt hat
    setSpaceshipInitialSpeed = false;

    //Kontrollvariable zur Überprüfung ob der Spieler den Boden berührt
    // Dies ist nur für die Jump n' Run Level wichtig
    playerOnFloor = false;

    //Die Position des Boden mit dem kollidiert wurde
    posFloor = {
        x: 0,
        y: 0
    };

    //Objekt für eine generelle Kollisionserkennung
    collisions = [];

    //Objekt in dem Plattformen, Böden, Wände, etc. gespeichert werden mit denen der Charakter kollidierte
    collidedObjects = [];

    //Richtung in der der Spieler kollidiert ist
    collisionDirection = {
        left: false,
        top: false,
        right: false,
        bottom: false
    };

    //Richtung in der der Spieler zuletzt gegangen ist
    lastDirection = "right";

    //Kontrollvariable ob der Spieler gestorben ist
    dead = false;

    //Kontrollvariable ob der Spieler schießen darf
    // Wird verwendet um Abstände zwischen den Schüssen zu schaffen
    shootEnabled = false;

    //Variable die alle Schüsse enthält die vom Spieler abgegeben wurden
    shoots = [];

    //Variable die abspeichert wann das letzte mal geschossen wurde
    timeLastShot = 0;

    //Stats des Spielers
    health = 3;


    /**
     * @function Erstellt ein Objekt der Spieler-Klasse und setzt dabei notwendige Variablen
     * @param startX Die Start X Pixelposition des Spielers
     * @param startY Die Start Y Pixelposition des Spielers
     * @param playerSpritesheet Das Spritesheet des Spielers
     * @param playerWidth Die Breite des Spielers
     * @param playerHeight Die Höhe des Spielers
     * @param isPlayerSpaceship Ob der Spieler als Raumschiff spielt
     */
    constructor(startX = 0, startY = 0, playerSpritesheet = document.createElement("img"),
                playerWidth = 40, playerHeight = 40, isPlayerSpaceship = false) {
        //Übernahme der übergebenen Parameter
        this.xPosition = startX;
        this.yPosition = startY;
        this.spritesheet = playerSpritesheet;
        this.width = playerWidth;
        this.height = playerHeight;
        this.isPlayerSpaceship = isPlayerSpaceship;

        //Setzt die Defaultwerte der Variablen
        this.setSpaceshipInitialSpeed = false;
        this.hitLevelEnd = false;
        this.playerOnFloor = false;
        this.animatedOnce = false;
        this.animateOnce = false;
        this.animation = 0;
        this.interval = 0;
        this.intervalTime = 1/20;
        if (this.isPlayerSpaceship) {
            this.maxFrames = 5;
            this.gravitation = 0;
        }
        else if (usedPlayerGraphic < 2) {
            this.intervalTime = 1/10;
            this.maxFrames = 4;
            this.gravitation = 500;
        }
        else {
            this.intervalTime = 1/10;
            this.maxFrames = 6;
            this.gravitation = 500;
        }

        this.collisions = [];
        this.collidedObjects = [];
        this.collisionDirection = {
            left: false,
            top: false,
            right: false,
            bottom: false
        };

        this.posFloor = {
            x: 0,
            y: 0
        };

        this.health = 3;
        this.dead = false;
        this.shootEnabled = false;
        this.shoots = [];
        this.lastDirection = "right";
        this.timeLastShot = Date.now();
    }

    /**
     * @function Aktualisiert den Spieler/Überprüft ob es Änderungen gab
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    update(deltaTime = 0) {
        this.animate(deltaTime);
        this.move(deltaTime);
        this.checkTileCollided();
        if (!this.hitLevelEnd) {
            this.checkEnemyCollision();
        }
        this.updateShoots();
        this.updateVariables(deltaTime);
    }

    /**
     * @function Überprüft den Zustand (Position, welcher Charakter, usw.) und aktualisiert entsprechend die Variablen
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    updateVariables(deltaTime = 0) {
        //Überprüfe ob der Spieler das Raumschiff ist und eine der Bewegungstasten gedrückt hat um das Level zu starten
        if (this.isPlayerSpaceship && !this.setSpaceshipInitialSpeed &&
            (controls.keyIsPressed.up || controls.keyIsPressed.down)) {
            this.gravitation = 180;
            this.setSpaceshipInitialSpeed = true;
            this.shootEnabled = true;
        }

        //Überprüft ob der Spieler das Levelende erreicht hat und setzt dann die Geschwindigkeit und Gravitation auf 0
        // damit sich der Spieler am Levelende nicht mehr bewegen kann
        if (this.hitLevelEnd) {
            //Wenn der Spieler das Raumschiff spielt "warpt" er am Levelende weg
            //Hierzu werden die Frame Parameter für die Animation entsprechend aktualisiert
            if (this.isPlayerSpaceship && !this.executedOnce) {
                this.maxFrames = 7;
                this.frame = 7;
                this.animation = 1;
                this.animateOnce = true;
                this.executedOnce = true;
                this.intervalTime = 1/15;
            }
            //Spielt der Spieler nicht das Raumschiff wird die laufende Animation beendet damit das nächste Level
            if (!this.isPlayerSpaceship && !this.executedOnce) {
                this.animateOnce = true;
                this.executedOnce = true;
            }

            this.endSpeed = 0;
            this.endGravitation = 0;
        }
        else {
            //Solange das Levelende nicht erreicht wurde werden die Gravitation und Spielergeschwindigkeit aktualisiert
            this.endSpeed = this.normalSpeed * deltaTime;
            this.endGravitation = this.gravitation * deltaTime;
        }

        //Wenn der Spieler stirbt wird dieser an seine Startposition zurückgesetzt
        if (this.dead) {
            this.endSpeed = 0;
            this.endGravitation = 0;

            if (!this.executedOnce && this.isPlayerSpaceship) {
                this.maxFrames = 8;
                this.frame = 8;
                this.animation = 2;
                this.animateOnce = true;
                this.executedOnce = true;
                this.intervalTime = 1/10;
            }
            else if (!this.executedOnce && !this.isPlayerSpaceship) {
                this.animateOnce = true;
                this.executedOnce = true;
                this.animatedOnce = true;
            }
            if (this.animatedOnce) {
                game.startLevelNew();
                this.dead = false;
            }
        }

        //Überprüft ob gerade ein Schuss abgefeuert wurde und startet eine Abklingzeit bis der nächste Schuss abgefeuert werden kann
        if (!this.shootEnabled) {
            if ((this.isPlayerSpaceship && !this.setSpaceshipInitialSpeed) || game.end || this.dead || this.hitLevelEnd) {
                this.shootEnabled = false;
            }
            else {
                let buffer = Date.now() - this.timeLastShot;
                if (!this.isPlayerSpaceship  && buffer >= 500) {
                    this.shootEnabled = true;
                }
                else if (this.isPlayerSpaceship && buffer >= 250) {
                    this.shootEnabled = true;
                }
            }
        }

        //Überprüft ob der Spieler weniger als 1 Leben hat und setzt dann die dead Variable auf true
        if (this.health <= 0) {
            this.dead = true;
        }
    }

    /**
     * @function Überprüft welche Art von Tiles der Spieler berührt
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
            //Überprüfe ob das Levelende erreicht wurde
            if (FINISH_TILE === collision.tileIndex) {
                this.hitLevelEnd = true;
            }
            //Überprüfe ob es eine Kollision mit einem kollidierbaren Element gab
            if (COLLIDABLE_TILES.includes(collision.tileIndex)) {
                this.collidedObjects.push(collision);
            }
            //Überprüfe ob es eine Kollision mit einem "tödlichen" Tile gab
            if (DEADLY_TILES.includes(collision.tileIndex)) {
                this.dead = true;
                this.lastDirection = "right";
            }
        }

        for (const collidedObject of this.collidedObjects) {
            //Überprüft ob es eine Kollision auf der linken Seite gabe
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

                this.playerOnFloor = true;

                this.posFloor = {
                    x: collidedObject.x,
                    y: collidedObject.y
                }
            }
        }
    }

    /**
     * @function Berechnet ob der Spieler mit einem Gegner kollidiert
     */
    checkEnemyCollision() {
        let playerCollisionBox = this.getCollisionBox();

        for (const createdEnemy of game.createdEnemys) {
            let enemyCollisionBox = createdEnemy.getCollisionBox();
            if (!createdEnemy.dead) {
                if (playerCollisionBox.x1 > enemyCollisionBox.x0 && playerCollisionBox.x0 < enemyCollisionBox.x1 &&
                    playerCollisionBox.y0 < enemyCollisionBox.y1 && playerCollisionBox.y1 && playerCollisionBox.y1 > enemyCollisionBox.y0) {
                    this.dead = true;
                    createdEnemy.dead = true;
                    this.lastDirection = "right";
                }
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
     * @function Erzeugt einen neuen Schuss in die Blickrichtung des Spielers
     */
    shoot() {
        let buffer = -1;
        let shootTile = 0;
        if (player.isPlayerSpaceship) {
            shootTile = 0;
        }
        else {
            shootTile = 2;
        }

        if (this.lastDirection === "right") {
            buffer = new Shoot(this.xPosition + this.width, this.yPosition + 10, 40, 40, this.normalSpeed, shootTile, false);
            sound.play("shoot");
        }
        else if (this.lastDirection === "left") {
            buffer = new Shoot(this.xPosition - 40, this.yPosition + 10, 40, 40, -this.normalSpeed * 3, shootTile, false);
            sound.play("shoot");
        }
        if (buffer !== -1) {
            this.shoots.push(buffer);
            this.shootEnabled = false;
            this.timeLastShot = Date.now();
        }
    }

    /**
     * @function Überprüft ob von allen bisher abgegebenen Schüssen einer das Levelende oder einen Gegner getroffen hat
     * und löscht diesen daraufhin
     */
    updateShoots() {
        if (this.dead && this.animatedOnce) {
            this.shoots = [];
        }
        for (let i = 0; i < this.shoots.length; i++) {
            if (this.shoots[i].shootHit) {
                this.shoots.splice(i, 1);
            }
        }
    }

    /**
     * @function Ist für die Steuerung der Tasteneingaben (vor allem für Bewegung) zuständig
     */
    move(deltaTime = 0) {
        //Zurücksetzen des Spielers falls dieser aus dem Spielfeldrand geht
        //Dies ist notwendig da ansonsten der Spieler aus dem Spielfeldrand glitchen kann
        if (this.xPosition < 0) {
            this.xPosition = 0;
        }
        else if (this.xPosition > map.mapCanvas.width - this.width) {
            this.xPosition = map.mapCanvas.width - this.width;
        }
        if (this.yPosition < 0) {
            this.yPosition = 0;
        }
        else if (this.yPosition > map.mapCanvas.height - this.height) {
            this.yPosition = map.mapCanvas.height - this.height;
        }

        //Spaceship nach oben steuern
        if (this.isPlayerSpaceship) {
            if (controls.keyIsPressed.up && this.yPosition > 0 && !this.collisionDirection.top) {
                this.yPosition -= this.endSpeed;
            }
        }
        else {

            if (this.playerOnFloor) {
                if (this.lastDirection === "right") {
                    if (usedPlayerGraphic < 2) {
                        this.animation = 1;
                        this.maxFrames = 4;
                    }
                    else {
                        this.animation = 1;
                        this.maxFrames = 6;
                    }
                }
                else if (this.lastDirection === "left") {
                    if (usedPlayerGraphic < 2) {
                        this.animation = 0;
                        this.maxFrames = 4;
                    }
                    else {
                        this.animation = 0;
                        this.maxFrames = 6;
                    }
                }

                //Fallgeschwindigkeit aktualisieren je nach dem ob der Charakter den Boden berührt oder nicht
                //Nach oben springen
                if (controls.keyIsPressed.up && this.yPosition > 0 && !this.collisionDirection.top) {
                    this.fallSpeed = -this.jumpSpeed;
                    this.yPosition -= this.endSpeed;
                    this.playerOnFloor = false;
                }
                if (!this.collisionDirection.bottom) {
                    this.fallSpeed = this.endGravitation;
                    this.playerOnFloor = false;
                }
            }
            else {
                if (this.lastDirection === "right") {
                    if (usedPlayerGraphic < 2) {
                        this.animation = 2;
                        this.maxFrames = 4;
                    }
                    else {
                        this.animation = 2;
                        this.maxFrames = 4;
                    }
                }
                else if (this.lastDirection === "left") {
                    if (usedPlayerGraphic < 2) {
                        this.animation = 3;
                        this.maxFrames = 4;
                    }
                    else {
                        this.animation = 3;
                        this.maxFrames = 4;
                    }
                }
                if (this.collisionDirection.top && !this.collisionDirection.bottom && this.fallSpeed < 0) {
                    this.fallSpeed = 0;
                }
                if (this.collisionDirection.bottom) {
                    this.yPosition = this.posFloor.y - this.height;
                    this.playerOnFloor = true;
                } else {
                    this.fallSpeed += this.endGravitation;
                    this.yPosition += this.fallSpeed * deltaTime;
                }
            }
        }

        //Nach links steuern
        if (controls.keyIsPressed.left && this.xPosition > 0 && !this.isPlayerSpaceship &&
            !this.collisionDirection.left) {
            this.xPosition -= this.endSpeed;
            if (this.playerOnFloor) {
                if (usedPlayerGraphic < 2) {
                    this.animation = 5;
                    this.maxFrames = 16;
                }
                else {
                    this.animation = 5;
                    this.maxFrames = 8;
                }
            }
            this.lastDirection = "left";
        }

        //Nach rechts steuern
        if (controls.keyIsPressed.right && (this.xPosition <= map.mapCanvas.width - this.width)
            && !this.collisionDirection.right && !this.isPlayerSpaceship) {
            this.xPosition += this.endSpeed;
            if (this.playerOnFloor) {
                if (usedPlayerGraphic < 2) {
                    this.animation = 4;
                    this.maxFrames = 16;
                }
                else {
                    this.animation = 4;
                    this.maxFrames = 8;
                }
            }
            this.lastDirection = "right";
        }

        //Nach unten steuern
        if (controls.keyIsPressed.down && this.yPosition <= map.mapCanvas.height - this.height &&
            !this.collisionDirection.bottom && this.isPlayerSpaceship) {
            this.yPosition += this.endSpeed;
        }

        if (this.isPlayerSpaceship) {
            this.xPosition += this.endGravitation;
        }

        //Schuss abfeuern
        if (usedPlayerGraphic >= 1 && controls.keyIsPressed.shoot && this.shootEnabled) {
            this.shoot();
        }

        //X und Y Position des Charakters "glätten"
        this.xPosition = Math.floor(this.xPosition);
        this.yPosition = Math.floor(this.yPosition);
    }

    /**
     * @function Wechselt durch die Frames im Spritesheet um eine Animation des Spielers zu ermöglichen
     * @param deltaTime Die Zeit zwischen dem letzten und diesem Frame
     */
    animate(deltaTime = 0) {
        this.interval += deltaTime;
        if (this.interval > this.intervalTime) {
            this.interval = 0;
            this.frame = ++this.frame % this.maxFrames;

            //Überprüft ob der letzte Frame im Spritesheet erreicht wurde falls dieses nur einmal durchlaufen werden soll
            if (this.animateOnce && this.frame % this.maxFrames === this.maxFrames - 1) {
                this.animatedOnce = true;
            }
            //Wenn das Spritesheet einmal durchlaufen wurde und es auch nicht wiederholt werden soll wird
            // der frame Parameter auf -1 gesetzt damit keine Grafik gezeichnet wird
            // Dies wird genutzt um das Raumschiff nach dem Warp "verschwinden" zu lassen
            if (this.animatedOnce) {
                this.frame = -1;
            }
        }
    }

    /**
     * @function Zeichnet den aktuellen Zustand des Spielers auf das Canvas
     * @param canvasContext Das Canvas auf welchem der Spieler gezeichnet wird
     */
    draw(canvasContext) {
        //Zeichnet den Spieler mit der entsprechenden Grafik and die entsprechende Position in das im Browser angezeigte Canvas
        if (!this.isPlayerSpaceship) {
            if (this.xPosition <= canvasContext.canvas.width / 2) {
                canvasContext.drawImage(this.spritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition, this.yPosition, this.width, this.height);
            }
            else if (this.xPosition >= map.mapCanvas.width - canvasContext.canvas.width / 2) {
                canvasContext.drawImage(this.spritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition - (map.mapCanvas.width - canvasContext.canvas.width), this.yPosition, this.width, this.height);
            }
            else {
                canvasContext.drawImage(this.spritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, canvasContext.canvas.width / 2, this.yPosition, this.width, this.height);
            }
        }
        else {
            if (this.xPosition >= map.mapCanvas.width - canvasContext.canvas.width) {
                canvasContext.drawImage(this.spritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, this.xPosition - (map.mapCanvas.width - canvasContext.canvas.width) + this.width/4, this.yPosition, this.width, this.height);
            }
            else {
                canvasContext.drawImage(this.spritesheet, this.frame * this.width, this.animation * this.height,
                    this.width, this.height, map.startPos.x, this.yPosition, this.width, this.height);
            }
        }
    }
}
