/**
 * @class Map Die Map-Klasse beinhaltet alles was zum Aufbau der Map und der Kontrolle über die Tiles notwendig ist
 */
class Map {
    //Die Momentan verwendete Map (-> entspricht dem verwendeten Level)
    usedMap = [[]];

    //Die gesamte Map als Canvas
    mapCanvas = document.createElement("canvas");
    mapContext = this.mapCanvas.getContext("2d");

    //Startposition des Charakter
    startPos = {
        x: 0,
        y: 0
    };

    //Alle Gegner im Level
    enemys = [];

    /**
     * @function Erstellt ein Objekt der Map-Klasse und setzt dabei notwendige Variablen
     * @param usedMap Die zu verwendende Map
     */
    constructor(usedMap = [[]]) {
        this.usedMap = usedMap;

        this.mapCanvas = document.createElement("canvas");
        this.mapCanvas.width = tileWidth * this.usedMap[0].length;
        this.mapCanvas.height = tileHeight * this.usedMap.length;
        this.mapContext = this.mapCanvas.getContext("2d");

        this.asteroidPos = [];
        this.enemys = [];

        for (let x = 0; x < this.usedMap[0].length; x++) {
            for (let y = 0; y < this.usedMap.length; y++) {
                let tileIndex = this.usedMap[y][x];
                if (tileIndex === START_TILE) {
                    //Setzt die Startposition für den Spieler
                    this.startPos = {
                        x: x * tileWidth,
                        y: y * tileHeight
                    };
                }
                if (ENEMY_TILE.includes(tileIndex)) {
                    let buffer = {
                        x: x * tileWidth,
                        y: y * tileHeight
                    }

                    switch (tileIndex) {
                        case 39:
                            buffer.width = 80;
                            buffer.height = 40;
                            buffer.enemyID = 2;
                            buffer.movementDirection = "";
                            buffer.health = 1;
                            break;
                        case 40:
                            buffer.width = 120;
                            buffer.height = 120;
                            buffer.enemyID = 3;
                            buffer.movementDirection = "";
                            buffer.health = 1;
                            break;
                        case 41:
                            buffer.width = 160;
                            buffer.height = 160;
                            buffer.enemyID = 4;
                            buffer.movementDirection = "";
                            buffer.health = 1;
                            break;
                        case 42:
                            buffer.width = 80;
                            buffer.height = 80;
                            buffer.enemyID = 5;
                            buffer.movementDirection = "";
                            buffer.health = 2;
                            break;
                        case 43:
                            buffer.width = 80;
                            buffer.height = 80;
                            buffer.enemyID = 6;
                            buffer.movementDirection = "";
                            buffer.health = 2;
                            break;
                        case 45:
                            buffer.width = 80;
                            buffer.height = 160;
                            buffer.enemyID = 1;
                            buffer.movementDirection = "horizontal";
                            buffer.health = 1;
                            break;
                        case 46:
                            buffer.width = 80;
                            buffer.height = 160;
                            buffer.enemyID = 1;
                            buffer.movementDirection = "vertical";
                            buffer.health = 1;
                            break;
                        case 48:
                            buffer.width = 80;
                            buffer.height = 120;
                            buffer.enemyID = 7;
                            buffer.movementDirection = "";
                            buffer.health = 2;
                            break;
                        case 49:
                            buffer.width = 80;
                            buffer.height = 120;
                            buffer.enemyID = 8;
                            buffer.movementDirection = "";
                            buffer.health = 5;
                            break;
                        case 50:
                            buffer.width = 80;
                            buffer.height = 80;
                            buffer.enemyID = 9;
                            buffer.movementDirection = "vertical";
                            buffer.health = 1;
                            break;
                    }

                    this.enemys.push(buffer);
                }
            }
        }
    }


    /**
     * @function Die Funktion updatet die Map bei jedem Durchlauf
     */
    updateMap() {
        if (usedLevel >= 0) {
            this.mapContext.drawImage(backgrounds[usedLevel - 1], 0, 0, this.mapCanvas.width, this.mapCanvas.height,
                0, 0, this.mapCanvas.width, this.mapCanvas.height);
        }
        else {
            map.mapContext.drawImage(endscreen, 0, 0, map.mapCanvas.width, map.mapCanvas.height,
                0, 0, map.mapCanvas.width, map.mapCanvas.height);
        }

        for (let y = 0; y < this.usedMap.length; y++) {
            for (let x = 0; x < this.usedMap[y].length; x++) {
                //Setzt die Defaultwerte für die Position eines Tiles im Tileset
                //Als Defaultwert wurde -1 gewählt da dann auf keinen Fall auf ein existierendes Tile in der Grafik
                // zugegriffen wird wenn das überprüfte Tile nicht im Tileset enthalten ist
                let tilePosX = -1;
                let tilePosY = -1;

                //Geht durch das Array welches das Tileset widerspiegelt
                // und nimmt sich die Position die das Tile im Tileset hat
                //Sollte das Tile nicht im Tileset sein wird das Array komplett durchlaufen
                // ohne das tilePosX und tilePosY geändert werden
                for (let i = 0; i < TILEMAPPING.length; i++) {
                    //Setzt tilePosX auf die Tilebasierte X Position im Tileset
                    tilePosX = TILEMAPPING[i].indexOf(this.usedMap[y][x]);

                    if (tilePosX > -1) {
                        //Sofern die X Position für ein Tile gefunden wurde wird auch die Tilebasierte Y Position gesetzt
                        // und danach die Schleife abgebrochen
                        tilePosY = i;
                        break;
                    }
                }

                //Sofern für das Tile eine Grafik im Tileset gefunden wurde wird diese auf das Canvas gezeichnet
                if (tilePosX >= 0 && tilePosY >= 0) {
                    //Berechnet den Pixeltileabstand für das entsprechende Tile
                    let tilePixelGapX = ((tileGapWidth * 2) * tilePosX) + tileGapWidth;
                    let tilePixelGapY = ((tileGapHeight * 2) * tilePosY) + tileGapHeight

                    //Berechnet die genaue Pixelposition des Tiles indem die Tilebasierte Position mit der Tilegröße
                    // multipliziert und mit den berechneten Pixeltileabstand addiert wird
                    let tilePixelPosX = tilePosX * tileWidth + tilePixelGapX;
                    let tilePixelPosY = tilePosY * tileHeight + tilePixelGapY;

                    //Zeichnet das entsprechende Tile aus dem Tileset and die entsprechende Position in der Map
                    this.mapContext.drawImage(tileset, tilePixelPosX, tilePixelPosY, tileWidth, tileHeight,
                        x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
            }
        }
    }

    /**
     * @function Die Funktion zeichnet die Map entsprechend der Spielerposition
     * @param canvasContext Das Canvas auf welchem die Map gezeichnet wird
     */
    draw(canvasContext = this.mapCanvas.getContext("2d")) {
        //Zeichnet den benötigten Map Abschnitt auf das Canvas im Browser
        if (!player.isPlayerSpaceship) {
            if (player.xPosition >= this.mapCanvas.width - canvasContext.canvas.width / 2) {
                canvasContext.drawImage(this.mapCanvas, canvasContext.canvas.width - this.mapCanvas.width, 0);
            }
            else if (player.xPosition <= canvasContext.canvas.width / 2) {
                canvasContext.drawImage(this.mapCanvas, 0, 0);
            }
            else {
                canvasContext.drawImage(this.mapCanvas, -player.xPosition + canvasContext.canvas.width / 2, 0);
            }
        }
        else {
            if (player.xPosition >= this.mapCanvas.width - canvasContext.canvas.width) {
                canvasContext.drawImage(this.mapCanvas, canvasContext.canvas.width - this.mapCanvas.width, 0);
            }
            else {
                canvasContext.drawImage(this.mapCanvas, -player.xPosition, 0);
            }
        }
    }

    /**
     * @function Gibt die Tiles aus die im Umkreis eines Objektes sind
     * @param tilePixelPosX Die X Pixelposition des Objekts dessen Umkreis überprüft wird
     * @param tilePixelPosY Die Y Pixelposition des Objekts dessen Umkreis überprüft wird
     * @param width Die Breite des Objekts dessen Umkreis überprüft wird
     * @param height Die Höhe des Objekts dessen Umkreis überprüft wird
     * @return result Ein Array mit allen Tilehits des Objekts
     */
    checkIfTileHit(tilePixelPosX = 0, tilePixelPosY = 0, width = 0, height = 0) {
        let checkPosX = Math.floor(tilePixelPosX);
        let checkPosY = Math.floor(tilePixelPosY);
        let checkWidth = Math.floor(width);
        let checkHeight = Math.floor(height);

        let result = [];

        for (let x = 0; x <= checkWidth; x+=collisionTileWidth) {
            for (let y = 0; y <= checkHeight; y+=collisionTileHeight) {
                if ((checkPosX + x) >= 0 && (checkPosY + y) >= 0 &&
                    (checkPosX + x) < (this.usedMap[0].length * tileWidth) &&
                    (checkPosY + y) < (this.usedMap.length * tileHeight)) {

                    let hitLeftMid = false;
                    let hitTopLeft = false;
                    let hitTopMid = false;
                    let hitTopRight = false;
                    let hitRightMid = false;
                    let hitBotRight = false;
                    let hitBotMid = false;
                    let hitBotLeft = false;

                    if (x === 0 && y > 0 && y < checkHeight) {
                        hitLeftMid = true;
                    }
                    if (x === 0 && y === 0) {
                        hitTopLeft = true;
                    }
                    if (x > 0 && x < checkWidth && y === 0) {
                        hitTopMid = true;
                    }
                    if (x === checkWidth && y === 0) {
                        hitTopRight = true;
                    }
                    if (x === checkWidth && y > 0 && y < checkHeight) {
                        hitRightMid = true;
                    }
                    if (x === checkWidth && y === checkHeight) {
                        hitBotRight = true;
                    }
                    if (x > 0 && x < checkWidth && y === checkHeight) {
                        hitBotMid = true;
                    }
                    if (x === 0 && y === checkHeight) {
                        hitBotLeft = true;
                    }

                    let bufferHit = {
                        x: checkPosX + x,
                        y: checkPosY + y,
                        leftMid: hitLeftMid,
                        topLeft: hitTopLeft,
                        topMid: hitTopMid,
                        topRight: hitTopRight,
                        rightMid: hitRightMid,
                        botRight: hitBotRight,
                        botMid: hitBotMid,
                        botLeft: hitBotLeft,
                        tileIndex: this.usedMap[Math.floor((checkPosY + y)/tileHeight)][Math.floor((checkPosX + x)/tileWidth)]
                    };

                    result.push(bufferHit);
                }
            }
        }

        return result;
    }
}