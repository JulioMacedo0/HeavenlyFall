function Personagem(context) {
    this.context = context
    this.x = 250
    this.y = 0
    this.alturaPulo = 15
    this.gravidade = 0.8
    this.velocidade = 0
    this.QtPulos = 0
    this.Sprite = 0
    this.largura = 64
    this.altura = 64
    this.pontos = 0
    this.recorde = 0
    this.py = 0
    this.poderVelocidade = 12
    this.poderes = []
} Personagem.prototype = {
    Gravidade: function () {
        if (personagem.velocidade <= 20) {
            this.velocidade += this.gravidade
            personagem.y += this.velocidade
        }
        if (personagem.y >= 226) {
            personagem.y = 225
            this.QtPulos = 0
        }
    },
    pular: function () {
        if (this.QtPulos < 1) {
            this.velocidade = -this.alturaPulo
            this.QtPulos++
        }
    },
    desenhaPersonagem: function () {
        let img = new Image()
        img.src = 'imagens/personagem/personagem.png'
        img.onload = function () {
            context.drawImage(img, personagem.Sprite, 0, personagem.largura, personagem.altura, personagem.x, personagem.y, personagem.largura, personagem.altura)
        }
    },
    AnimaPersonagem: function () {
        if (personagem.Sprite < 192) {
            personagem.Sprite += 64
        } else {
            personagem.Sprite = 0
        }
    },
    PontoPersonagem: function () {
        personagem.pontos += 1
    },
    desenhaPoder: function () {
        for (let i = 0, tamanho = personagem.poderes.length; i < tamanho; i++) {
            let poderes = personagem.poderes[i]
            let img = new Image()
            img.src = 'imagens/personagem/poder.png'
            img.onload = function () {
                context.drawImage(img, 0, 0, 67, 64, poderes.xp, poderes.xy, 22, 22)
            }
        }
    },
    andaTiro: function () {
        for (let i = 0, tamanho = personagem.poderes.length; i < tamanho; i++) {
            let poderes = personagem.poderes[i]
            poderes.xp += personagem.poderVelocidade
            if (poderes.xp >= 1600) {
                personagem.poderes.splice(i, 1)
                tamanho--
                i--
            } if (poderes.xp >= chefe.x && poderes.xy <= 228) {
                chefe.tiraVida()
                personagem.poderes.splice(i, 1)
                tamanho--
                i--
                chefe.pontosVida--
            }
        }
    },
    Atirar: function () {
        personagem.poderes.push({
            xp: 314,
            xy: personagem.y + 25
        })
    },
    resetaTiro: function () {
        let tam = personagem.poderes.length
        personagem.poderes.splice(0, tam)
    }
}