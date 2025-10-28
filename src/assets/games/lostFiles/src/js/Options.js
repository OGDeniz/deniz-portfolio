/**
 * @class Options Die Klasse beinhaltet Kontrollvariablen die allgemeine Einstellungen steuern
 */
class Options {
    //Kontrollvariable ob der Vollbildmodus gewechselt werden soll
    changeFullScreen = false;

    //Kontrollvariable ob Vollbild aktiv ist
    isFullScreen = false;

    constructor() {
        this.changeFullScreen = false;
        this.isFullScreen = false;
    }
}