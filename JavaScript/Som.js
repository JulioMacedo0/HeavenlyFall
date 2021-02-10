function Som() {
    this.SomFinal = 0 
    this.somCont = 0
//Iniciando os sons do jogo
    window.onload = function () {
        TrilhaPrincipal = document.getElementById('audio')
        Pulo = document.getElementById('Pulo')
        GameOver = document.getElementById('GameOver')
        MusicaFinal = document.getElementById('MusicaFinal')
        Tiro = document.getElementById('pew')
        chefSpawn = document.getElementById('chefSpawn')
        chefDano1 = document.getElementById('chefdano1')
        chefDano2 = document.getElementById('chefdano2')
        chefDano3 = document.getElementById('chefdano3')
        chefDano4 = document.getElementById('chefdano4')
        chefeMorte = document.getElementById('chefeMorte')
        chefTiro = document.getElementById('chefeTiro')
    }
} Som.prototype = {
    TrilhaPrincipal: function () {
        TrilhaPrincipal.volume = 0.8
        TrilhaPrincipal.currentTime = 1
        TrilhaPrincipal.play()
    },
    TrilhaPrincipalPause: function () {
        TrilhaPrincipal.pause()
    },
    Pulo: function () {
        Pulo.volume = 0.4
        Pulo.currentTime = 0
        Pulo.play()
    },
    PuloPause: function () {
        Pulo.pause()
    },
    Tiro: function () {
        Tiro.volume = 0.4
        Tiro.currentTime = 1
        Tiro.play()
    },
    GameOver: function () {
        GameOver.play()
        som.PuloPause()
        som.TrilhaPrincipalPause()
        som.MusicaFinalPause()
        usuario.SaveUser()
        NewUser.style.display = 'block'
    },
    MusicaFinal: function () {
        setTimeout(() => som.SomFinal++, 3000)
        if (som.SomFinal > 0) {
            if(som.somCont < 1){
                som.somCont++
            som.TrilhaPrincipalPause()
            MusicaFinal.volume = 0.5
            MusicaFinal.currentTime = 0
            MusicaFinal.play()
            }
        }
    },
    MusicaFinalPause: function () {
        MusicaFinal.pause()
    },
    chefSpawn: function () {
        if (som.SomSpawn < 1) {
            som.SomSpawn++
            chefSpawn.play()
        }
    },
    chefDano: function () {
        som.somSorte = Math.floor(Math.random() * 3) //Sorteira um som de dor pra cada vez que perder vida
        if (som.somSorte == 0) {
            chefDano1.play()
        } if (som.somSorte == 1) {
            chefDano2.play()
        } if (som.somSorte == 2) {
            chefDano3.play()
        } if (som.somSorte == 3) {
            chefDano4.play()
        }
    },
    chefMorte: function () {
        chefMorte.play()
    },
    chefTiro: function () {
        chefTiro.currentTime = 0
        chefTiro.play()
    }
}



