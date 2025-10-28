/**
 * @class Controls Die Controls-Klasse dient alle Steuerungselemente wie Tasteneingabe und welche Taste wofür ist in einer Klasse zusammenzufügen
 */
class Controls {
    //Die Standard Tastenbelegung mit denen die Spielfigur bewegt und Interaktionen ausgeführt werden
    controlKey = {
        upKey: 87,
        leftKey: 65,
        downKey: 83,
        rightKey: 68,
        fullScreenKey: 70,
        shoot: 32
    }

    //Die Optionale Tastenbelegung mit denen die Spielfigur bewegt und Interaktionen ausgeführt werden
    //TODO: OPTIONAL COMMENT
    // [diese kann auch vom Spieler umbelegt werden]
    controlOptionalKey = {
        upKey: 38,
        leftKey: 37,
        downKey: 40,
        rightKey: 39,
        shoot: 32
    }

    //Ein Objekt in dem festgehalten wird ob eine der Tasten gedrückt ist oder nicht
    keyIsPressed = {
        up: false,
        left: false,
        down: false,
        right: false,
        shoot: false
    }

    /**
     * @function Steuerung der Tasteneingabe
     * @param event Die Eventparameter des auslösenden Events
     */
    keyControls(event) {
        //Überprüft ob eine Taste gedrückt/losgelassen wurde und aktualisiert die entsprechende Variable
        //Für Fullscreen wird die Funktion goFullScreen in der Game.js aufgerufen
        switch (event.keyCode) {
            case controls.controlKey.upKey:
            case controls.controlOptionalKey.upKey:
                controls.keyIsPressed.up = event.type === "keydown";
                break;
            case controls.controlKey.leftKey:
            case controls.controlOptionalKey.leftKey:
                controls.keyIsPressed.left = event.type === "keydown";
                break;
            case controls.controlKey.downKey:
            case controls.controlOptionalKey.downKey:
                controls.keyIsPressed.down = event.type === "keydown";
                break;
            case controls.controlKey.rightKey:
            case controls.controlOptionalKey.rightKey:
                controls.keyIsPressed.right = event.type === "keydown";
                break;
            case controls.controlKey.fullScreenKey:
                options.changeFullScreen = event.type === "keydown";
                break;
            case controls.controlKey.shoot:
            case controls.controlOptionalKey.shoot:
                controls.keyIsPressed.shoot = event.type === "keydown";
        }
    }
}