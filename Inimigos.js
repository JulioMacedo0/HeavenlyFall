function Inimigos(context) {
    this.context = context
    this.y = 225
    this.velocidade = 4.5
    this.largura = 64
    this.altura = 64
    this.Sprite = 0
    this.obs = []
    this.inimigo = ['imagens/inimigos/inimigo1.png', 'imagens/inimigos/inimigo2.png']
    this.inimigoIndice = 0
    this.tempo = 0
    // this.max = 0
} Inimigos.prototype = {
    animaInimigo: function () {
        if (inimigo.Sprite < 192) {
            inimigo.Sprite += 64
        } else {
            inimigo.Sprite = 0
        }
    },
    andaInimigo: function () {
        if (this.tempo == 0) {
            this.insereInimigo()
        } else {
            this.tempo--
        }
        for (let i = 0, tam = this.obs.length; i < tam; i++) {
            let obs = this.obs[i]
            if (obs.x <= personagem.x + 44 && personagem.y >= inimigo.y - 50 && personagem.x <= obs.x + 20) {
                animacao.gameOver()
                animacao.gameOverTela()
            }
            if (obs.x >= 249 && obs.x <= 250) {
                personagem.PontoPersonagem()
            }
            obs.x -= inimigo.velocidade
            if (obs.x <= -inimigo.largura) {
                this.obs.splice(i, 1)
                tam--
                i--
            }
        }
    },
    resetaInimigo: function () {
        let tam = inimigo.obs.length
        inimigo.obs.splice(0, tam)
    },
    insereInimigo: function () {
    if (chefe.ChefeFraco == false) { // condição que faz os inimigos pararem de spawnar quando o chefe estiver no modo berserk
              this.obs.push({
                  x: 2000
              })
          }
        this.tempo = 35 + Math.floor(41 * Math.random())
    },
    desenhaInimigo: function () {
        for (let i = 0, tam = this.obs.length; i < tam; i++) {
            let obs = this.obs[i]
            let img = new Image()
           img.src = inimigo.inimigo[inimigo.inimigoIndice]
            img.onload = function () {
                context.drawImage(img, inimigo.Sprite, 0, inimigo.largura, inimigo.altura, obs.x, inimigo.y, inimigo.largura, inimigo.altura)
            }
        }
    }
}
function Chefão() {
    this.context = context
    this.ChefeVivo = true
    this.ChefeFraco = false
    this.tempestade = false
    this.tiro = []
    this.SpriteVida = 0
    this.x = canvas.width - 148
    this.y = 100
    this.vidaX = 1382
    this.vidaY = 70
    this.altura = 0
    this.largura = 0
    this.SpriteChefe = 0
    this.SpritePoder = 0
    this.cont = 0
    this.contVida = 0
    this.pontosVida = 8 + Math.floor(Math.random() * 6)
    this.timer = 0
    this.raiox = 0
    this.raioy = 0
    this.tempo = 300
} Chefão.prototype = {
    desenhaChefe: function () {
        let img = new Image()
        img.src = 'imagens/inimigos/Chefe.png'
        img.onload = function () {
            context.drawImage(img, chefe.SpriteChefe, 0, 384, 530, chefe.x, chefe.y, 128, 128)
        }
    },
    desenhaRaio: function () {
        let img = new Image()
        img.src = 'imagens/inimigos/raio.png'
        img.onload = function () {
            context.drawImage(img, 0, 0, 1540, 2091, chefe.raiox, chefe.raioy, 300, 290)
        }
    },
    ativaRaio: function () { // ativa o raio em tempo aleatorio
        chefe.tempo--
        if(chefe.tempo <= 0){
            chefe.tempestade = true
            chefe.tempo =  10 + Math.floor(Math.random() * 350) // 10 = tempo minimo para cair raio, 350 tempo maximo para cair o raio
            chefe.raiox =  Math.floor(Math.random() * 1600)      
        }
    },
    caiRaio: function () {
        this.desenhaRaio()  
        if(chefe.raiox >= 120 && chefe.raiox <= 170){ // condição se o raio cair no personagem
            animacao.gameOver()
            animacao.gameOverTela()
        }
        setTimeout(() => chefe.tempestade = false, 250)  // faz o raio sumir em 250ms     
    },
    desenhaVida: function () {
        let img = new Image()
        img.src = 'imagens/inimigos/chefeVida.png'
        img.onload = function () {
            context.drawImage(img, chefe.SpriteVida, 0, 434, 72, chefe.x - 18, chefe.y - 30, 180, 20)
        }
    },
    desenhaTiro: function () {
        for (let i = 0, tamm = chefe.tiro.length; i < tamm; i++) {
            let tiro = chefe.tiro[i]
            let img = new Image()
            img.src = 'imagens/inimigos/chefPoder.png'
            img.onload = function () {
                context.drawImage(img, chefe.SpritePoder, 0, 350, 335, tiro.x, tiro.y, 128, 128)
            }
        }
    },
    andaTiro: function () {
         if(chefe.timer == 0){
             chefe.Atira()
         }else {
            chefe.timer--
        }
        for (let i = 0, tamanho = chefe.tiro.length; i < tamanho; i++) {
            let tiro = chefe.tiro[i]
            tiro.x -= 8
            if(tiro.x  <= personagem.x + 10 && personagem.y <= tiro.y + 75 && personagem.x  <= tiro.x +60){
            animacao.gameOver()
            animacao.gameOverTela()
            }
            if (tiro.x <= 0) {
               chefe.tiro.splice(i, 1)
                tamanho--
                i--
            } 
        }
    },
    Atira: function () {
        chefe.tiro.push({
            x: 1400,
            y: 100
        })
        chefe.timer = 35 + Math.floor(41 * Math.random())
        som.chefTiro()
    },
    resetaTiro: function () {
        let tam = chefe.tiro.length
        chefe.tiro.splice(0, tam)
    },
    animaTiro: function () {
        if (chefe.SpritePoder < 688 ){
        chefe.SpritePoder += 364
        }else {
            chefe.SpritePoder = 0
        }
    },
    chefeAtira: function () {

    },
    tiraVida: function () {
        if (chefe.SpriteVida < 3512) {
            if (chefe.pontosVida == 0) {
                chefe.pontosVida = 8 + Math.floor(Math.random() * 6)
                chefe.SpriteVida += 439
                som.chefDano()
                if (chefe.ChefeFraco == false) {
                    chefe.animaDor1()
                }
                if (chefe.ChefeFraco == true) {
                    chefe.animaDor2()
                }
            }
        }
    },
    animaDor1: function () {
        if (chefe.SpriteChefe < 396) {
            chefe.SpriteChefe += 396
        }
        if (chefe.SpriteChefe == 396) {
            setTimeout(() => chefe.SpriteChefe = 0, 380)
        }
    },
    animaDor2: function () {
        if (chefe.SpriteChefe <= 792) {
            chefe.SpriteChefe -= 396
        }
        if (chefe.SpriteChefe == 396) {
            setTimeout(() => chefe.SpriteChefe = 792, 380)
        }
    },
    mudaForma: function () {
        if (chefe.ChefeFraco == true) {
            if (chefe.cont == 0) {
                chefe.cont++
                chefe.SpriteVida = 0
                setTimeout(() => chefe.SpriteChefe = 792, 390)
                animacao.IndiceMenu++
                animacao.menu = true
            }
        }
    }
}