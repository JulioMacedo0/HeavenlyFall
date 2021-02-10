function Montanha(context) {
    this.context = context
    this.x = 0
    this.y = 0
    this.velocidade = 2
    this.altura = 250
    this.largura = 1600
    this.imagemMontanha = ['imagens/montanhas/Montanha1.png', 'imagens/montanhas/Montanha2.png', 'imagens/montanhas/Montanha3.png', 'imagens/montanhas/Montanha4.png', 'imagens/montanhas/Montanha5.png']
    this.IndiceMontanha = 0
} Montanha.prototype = {
    desenhaMontanha: function () {
        let img = new Image()
        img.src = montanha.imagemMontanha[montanha.IndiceMontanha]
        img.onload = function () {
            context.drawImage(img, montanha.x, montanha.y, montanha.largura, montanha.altura)
            context.drawImage(img, montanha.x + montanha.largura, montanha.y, montanha.largura, montanha.altura)
        }
    },
    animaMontanha: function () {
        if (this.x >= -montanha.largura) {
            montanha.x -= montanha.velocidade
        } else {
            this.x = 0
        }
    }
}
function Chao(context) {
    this.context = context
    this.x = 0
    this.y = 250
    this.velocidade = 3
    this.altura = 50
    this.largura = 1600
    this.imagemChao = ['imagens/chao/chao1.png', 'imagens/chao/chao2.png', 'imagens/chao/chao3.png', 'imagens/chao/chao4.png', 'imagens/chao/chao5.png']
    this.IndiceChao = 0
} Chao.prototype = {
    desenhaChao: function () {
        let img = new Image()
        img.src = chao.imagemChao[chao.IndiceChao]
        img.onload = function () {
            context.drawImage(img, chao.x, chao.y, chao.largura, chao.altura)
            context.drawImage(img, chao.x + chao.largura, chao.y, chao.largura, chao.altura)
        }
    },
    animaChao: function () {
        if (this.x >= -chao.largura) {
            chao.x -= chao.velocidade
        } else {
            this.x = 0
        }
    }
}
function Nuvem(context) {
    this.context = context
    this.x = 0
    this.y = 20
    this.velocidade = 2.3
    this.ImagemNuvem = ['imagens/nuvens/nuvem1.png', 'imagens/nuvens/nuvem2.png', 'imagens/nuvens/nuvem3.png', 'imagens/nuvens/nuvem4.png', 'imagens/nuvens/nuvem5.png']
    this.IndiceNuvem = 0
    this.largura = 1600
    this.altura = 125
} Nuvem.prototype = {
    desenhaNuvem: function () {
        let img = new Image()
        img.src = nuvem.ImagemNuvem[nuvem.IndiceNuvem]
        img.onload = function () {
            context.drawImage(img, nuvem.x, nuvem.y, nuvem.largura, nuvem.altura)
            context.drawImage(img, nuvem.x + nuvem.largura, nuvem.y, nuvem.largura, nuvem.altura)
        }
    },
    animaNuvem: function () {
        if (this.x >= -nuvem.largura) {
            nuvem.x -= nuvem.velocidade
        } else {
            this.x = 0
        }
    }
}