//Warten bis alles geladen wurde dann init Funktion aufrufen
window.addEventListener('load', init);

/**
 * @function In der init Funktion werden globale Parameter gesetzt und beim Start benötigte Objekte (aus den Klassen) erstellt.
 */
function init () {
    //Erstellt ein neues Objekt für die Spielgrundfunktionen/die Spielschleife
    game = new Game();

    //Lädt das Spielfeld aus der HTML in eine Variable
    gameField = document.getElementById("GameField");

    //Lädt die Hintergründe aus der HTML in einzelne Variablen
    backgrounds = [];
    for (let i = 0; i < 3; i++) {
        let buffer = document.getElementById("BackgroundLvl" + (i + 1).toString());
        backgrounds.push(buffer);
    }

    //Lädt den Endscreen aus der HTML in eine Variable
    endscreen = document.getElementById("Endscreen");

    //Lädt das Tileset aus der HTML in eine Variable
    tileset = document.getElementById("Tileset");

    //Lädt das Tileset für die Schüsse aus der HTML in eine Variable
    shootTileset = document.getElementById("ShootTileset");

    //Lädt die Spieler-Spritesheets aus der HTML in einzelne Variablen
    for (let i = 0; i < 4; i++) {
        let buffer = document.getElementById("playerSpritesheet" + (i + 1).toString());
        playerDrawInfo[i].playerSpritesheet = buffer;
    }

    //Lädt das Gegner-Spritesheet aus der HTML in eine einzelne Variable
    enemy1Spritesheet = document.getElementById("enemy1Spritesheet");
    enemy2Spritesheet = document.getElementById("enemy2Spritesheet");
    enemy3Spritesheet = document.getElementById("enemy3Spritesheet");
    asteroidSpritesheet1 = document.getElementById("asteroidSpritesheet1");
    asteroidSpritesheet2 = document.getElementById("asteroidSpritesheet2");
    asteroidSpritesheet3 = document.getElementById("asteroidSpritesheet3");
    ufoSpritesheet = document.getElementById("ufoSpritesheet");
    endBossRomero = document.getElementById("endBossRomeroSpritesheet");

    //Lädt die Tiles mit Spritesheet in einzelne Variablen
    spritesheetBlitz = document.getElementById("SpritesheetBlitz");

    //Setzt die Kontrollvariable für das Level in welchem man sich befindet auf 1
    usedLevel = 1;

    //Setzt die Kontrollvariable für den Charakter der verwendet wird auf den Start Charakter
    usedPlayerGraphic = 0;

    //Erstellt ein neues Objekt für die Optionen dies enthält auch Kontrollvariablen die nicht direkt
    // in Optionen einstellbar sind
    options = new Options();

    //Erstellt ein neues Objekt für die Steuerung
    controls = new Controls();

    //Liest die Sounddateien und speichert diese in Variablen um sie dem Sound-Objekt zu übergeben
    let backgroundMusic = [new Audio("./media/audio/backgroundMusicLvl1.mp3"),
                           new Audio("./media/audio/backgroundMusicLvl2.mp3"),
                           null,
                           null];

    let introBackgroundMusic = [null,
                                new Audio("./media/audio/introBackgroundMusicLvl2.mp3"),
                                null,
                                null];

    let shootSound = new Audio("./media/audio/shoot.mp3");

    //Erstellt ein neues Objekt für den Sound
    sound = new Sound(backgroundMusic, introBackgroundMusic, shootSound);

    //Fügt neue Event-Listener hinzu damit das Drücken und Loslassen von Tasten registriert werden kann
    window.addEventListener("keydown", controls.keyControls);
    window.addEventListener("keyup", controls.keyControls);

    //Erstellt ein neues Map-Objekt
    map = new Map(testLevels["level" + usedLevel]);

    //Erstellt einen neuen Spieler als Objekt
    player = new Player(map.startPos.x, map.startPos.y, playerDrawInfo[usedPlayerGraphic].playerSpritesheet,
        playerDrawInfo[usedPlayerGraphic].width, playerDrawInfo[usedPlayerGraphic].height,
        playerDrawInfo[usedPlayerGraphic].isSpaceship);

    //Initialisiert alle Objekte die nach der Erstellung der Map oder des Spielers einmalig erstellt werden müssen
    game.initialize();

    //Setzt eine neue Zeit für die lastTime Variable dies wird zur Delta Time Berechnung verwendet
    //Die Delta Time wird benötigt damit die Geschwindigkeit der Abläufe in der Spielschleife hardwareunabhängig ist
    lastTime = Date.now();

    //Setzt die gewünschten FPS
    let fps = 60;
    frameInterval = 1000/fps;

    //Aufrufen der Spielschleife
    requestAnimationFrame(gameLoop);
}

/**
 * @function Die gameLoop Funktion ist die Spielschleife und wird immer wieder [mit 60FPS] aufgerufen
 */
function gameLoop() {
    requestAnimationFrame(gameLoop);

    //Delta Time Berechnung
    nowTime = Date.now();
    deltaTime = nowTime - lastTime;

    //Überprüft ob genug Zeit vergangen ist seit dem letzten Frame damit die gewünschten FPS erreicht werden
    if (deltaTime > frameInterval) {
        lastTime = nowTime - (deltaTime % frameInterval);
        if (options.changeFullScreen) {
            game.changeFullScreen();
        }

        //Mit der game update Funktion werden alle notwendigen Variablen geupdatet
        game.update(deltaTime/1000);

        //Mit der game draw Funktion werden anhand der entsprechenden Variablen die Map
        // mitsamt der Objekte entsprechend gezeichnet
        game.draw();
    }
}
