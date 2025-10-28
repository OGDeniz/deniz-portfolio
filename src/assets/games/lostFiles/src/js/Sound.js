/**
 * @class Sound Die Sound Klasse dient zum Abspielen eines Sounds
 */
class Sound {
    backgroundMusic = [new Audio()];
    introBackgroundMusic = [];
    startedBackgroundMusicLoop = false;

    shoot = new Audio();

    sounds = [];

    constructor(backgroundMusic = [new Audio], introBackgroundMusic = [], shootSound = new Audio(), ) {
        this.backgroundMusic = backgroundMusic;
        this.introBackgroundMusic = introBackgroundMusic;
        this.shoot = shootSound;

        this.startedBackgroundMusicLoop = false;
    }

    playIntroBackgroundMusic(usedLevel = 1) {
        let level = usedLevel;

        if (level === -1) {
            level = 4;
        }

        if (level > 1) {
            if (this.introBackgroundMusic[level - 2] != null) {
                this.introBackgroundMusic[level - 2].pause();
            }
            if (this.backgroundMusic[level - 2] != null) {
                this.backgroundMusic[level - 2].pause();
            }
            this.startedBackgroundMusicLoop = false;
        }

        if (this.backgroundMusic[level - 1] != null) {
            this.backgroundMusic[level - 1].pause();
            this.startedBackgroundMusicLoop = false;
        }

        if (this.introBackgroundMusic[level - 1] != null) {
            this.introBackgroundMusic[level - 1].pause();
            this.introBackgroundMusic[level - 1].volume = 0.075;
            this.introBackgroundMusic[level - 1].play();
        }
    }

    playBackgroundMusic(usedLevel = 1) {
        let level = usedLevel;

        if (level === -1) {
            level = 4;
        }

        if ((this.introBackgroundMusic[level - 1] === null ||
            this.introBackgroundMusic[level - 1].ended) &&
            !this.startedBackgroundMusicLoop && this.backgroundMusic[level - 1] != null) {
            this.backgroundMusic[level - 1].loop = true;
            this.backgroundMusic[level - 1].volume = 0.075;
            this.backgroundMusic[level - 1].play();
            this.startedBackgroundMusicLoop = true;
        }
    }

    play(sound = "") {
        switch (sound) {
            case "shoot":
                let buffer = new Audio(this.shoot.src);
                this.sounds.push(buffer);
                this.sounds[this.sounds.length - 1].volume = 0.25;
                this.sounds[this.sounds.length - 1].play();
                break;
        }
    }

    updateSounds() {
        for (let i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].ended) {
                this.sounds.splice(i, 1);
            }
        }
    }
}