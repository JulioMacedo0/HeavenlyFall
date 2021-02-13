async function SavePoints() {
    let body = {
        user: usuario.name,
        points: personagem.pontos
    }
    await fetch('http://localhost:3000/user/save', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then((response) => console.log(response))
}

function Animacao(context) {
    this.context = context
    this.HistoryMode = true
    this.ligado = true
    this.Final = false
    this.jogando = false
    this.GameOver = false
    this.chefeFraco = false
    this.menu = true
    this.Menu = ['imagens/menus/Fase1.png', 'imagens/menus/Fase2.png', 'imagens/menus/Fase3.png', 'imagens/menus/Fase4.png', 'imagens/menus/avisoPoder.png', 'imagens/menus/avisoChefe.png']
    this.IndiceMenu = 0
    this.tamanhoMenu = 1665
    this.alturaMenu = 279
    this.tamanhoX = 150
    this.tamanhoY = 50
    this.localX = 750
    this.localY = 30
    this.proxFase = 2 // dificuldade inicial
    this.cont = 0
    this.contt = 0
} Animacao.prototype = {
    Atualizar: function () {
        animacao.ChefeFraco() // Função que verifica se o chefe está fraco 
        animacao.ChefeMorto() // Função que verifica se o chefe está morto
        chefe.mudaForma()  // Função que muda a forma do chefe para o modo berserk
        if (animacao.Final == true && montanha.IndiceMontanha == 4) { //Condição para corrigir os menus nas fases finais
            animacao.tamanhoX = 720
            animacao.tamanhoY = 200
            animacao.localX = 600
            animacao.localY = 0
        }
        else if (personagem.pontos >= animacao.proxFase && animacao.HistoryMode == true) { // Condição para mudar as fases
            if (montanha.IndiceMontanha < 4) {
                inimigo.resetaInimigo()
                animacao.mudaCenario()
                animacao.IndiceMenu++
                animacao.proxFase += 2   // dificuldade no decorrer das fases
                animacao.menu = true
            }

        } else if (personagem.pontos >= animacao.proxFase && animacao.HistoryMode == false) {
            if (montanha.IndiceMontanha < 3) {
                animacao.mudaCenario()
                animacao.proxFase += 2
            }
            if (personagem.pontos >= animacao.proxFase && montanha.IndiceMontanha == 3) {
                animacao.proxFase += 2
                montanha.IndiceMontanha = 0
                chao.IndiceChao = 0
                nuvem.IndiceNuvem = 0
            }
        } if (this.jogando == false) { // Tela inical do jogo
            animacao.desenhaTelaInicial()
        } if (this.GameOver == false) {
            montanha.desenhaMontanha()
            chao.desenhaChao()
            nuvem.desenhaNuvem()
            inimigo.desenhaInimigo()
            personagem.desenhaPoder()
            if (animacao.HistoryMode == false) {
                animacao.QuantPontos()
            }
        } if (montanha.IndiceMontanha == 4 && animacao.GameOver == false && animacao.HistoryMode == true) { //Condição que deixa explicito para outras funções que o jogo está na fase final
            animacao.Final = true // deixa expicito para o resto do código que o usuario está na fase final 
            som.TrilhaPrincipalPause()
            animacao.mudaInimigo()
            som.MusicaFinal()
            if (chefe.ChefeVivo == true) { //condição que desenha o chefão enquanto ele estiver vivo
                if (chefe.ChefeFraco == true && chefe.ChefeVivo == true) { // condição que faz o chefe atirar e jogar raios no jogador enquanto estiver fraco
                    chefe.andaTiro()
                    chefe.ativaRaio()
                }
                chefe.desenhaChefe()
                chefe.desenhaVida()
                chefe.desenhaTiro()
            }
            if (chefe.ChefeVivo == false) { // tela de vitória que irá subir após a morte do chefão
                animacao.telaWin()
            }
        } if (this.ligado = true && this.jogando == true && this.GameOver == false) {
            montanha.animaMontanha()
            if (animacao.HistoryMode == false) {
                animacao.QuantPontos()
            }
            chao.animaChao()
            personagem.Gravidade()
            nuvem.animaNuvem()
            personagem.andaTiro()
            personagem.desenhaPersonagem()
            inimigo.andaInimigo()
            if (animacao.menu == true && animacao.HistoryMode == true) {
                animacao.desenhaMenu()
            }
            if (chefe.tempestade == true) {
                chefe.caiRaio()
            }
        }
        else {
            if (animacao.HistoryMode == false) {
                animacao.QuantPontos()
            }
        }
    },
    pause: function () { // Imagem de pause
        let img = new Image()
        img.src = 'imagens/menus/pause.png'
        img.onload = function () {
            context.drawImage(img, 550, 75)
        }
        animacao.desligar()
    },
    ligar: function () { // função que liga o jogo
        this.ligado = true
        this.Lop()
    },
    desligar: function () { // função que desliga ojogo
        this.ligado = false
    },
    Lop: function () { //lop onde o jogo inteiro roda
        if (this.ligado == true) {
            this.Atualizar()
            const animacao = this
            requestAnimationFrame(function () {
                animacao.Lop();
            })
        }
    },
    mudaInimigo: function () { // função para mudar os  inimigos
        if (inimigo.inimigoIndice < 1) {
            inimigo.inimigoIndice = 1
            console.log("Os inimigos ficara mais fortes !")
        }
    },
    mudaCenario: function () { // função para mudar o cenário
        montanha.IndiceMontanha++
        chao.IndiceChao++
        nuvem.IndiceNuvem++
    },
    gameOver: function () {
        som.GameOver()
        som.MusicaFinalPause()
        animacao.GameOver = true
        JogarNovamente.style.display = 'block'
        ModoHistoria.style.display = 'block'
        ModoRecorde.style.display = 'block'
        if (animacao.HistoryMode == false) {
            SavePoints()
        }
    },
    gameOverTela: function () {
        console.log('Você perdeu!')
        let img = new Image()
        img.src = 'imagens/menus/gameOver.png'
        img.onload = function () {
            context.drawImage(img, 660, 5)
        }
    },
    QuantPontos: function () {
        context.fillStyle = '#00FF00'
        context.font = "italic 22px Arial"
        context.fillText(`Quantidade de pontos: ${personagem.pontos}`, 30, 30)
    },
    JogarNovamente: function () {
        if (usuario.name == "") {
            usuario.name = usuario.saveName
        }
        if (usuario.name != "") {
            usuario.BackupUser()
        }
        animacao.ResetaJogo()
    },
    Jogar: function () { // função que permite que o lop execute 
        animacao.jogando = true
        animacao.ligado = true
    },
    ResetaJogo() { // função que reseta as variaveis do jogo
        animacao.proxFase = 10
        personagem.pontos = 0
        animacao.IndiceMenu = 0
        montanha.IndiceMontanha = 0
        chao.IndiceChao = 0
        nuvem.IndiceNuvem = 0
        inimigo.inimigoIndice = 0
        chefe.SpriteChefe = 0
        chefe.SpriteVida = 0
        chefe.cont = 0
        animacao.cont = 0
        chefe.contVida = 0
        som.SomFinal = 0
        som.somCont = 0
        animacao.tamanhoMenu = 1665
        animacao.alturaMenu = 279
        animacao.tamanhoX = 150
        animacao.tamanhoY = 50
        animacao.localX = 750
        animacao.localY = 30
        personagem.y = 225
        chefe.ChefeFraco = false
        animacao.GameOver = false
        animacao.Final = false
        personagem.resetaTiro()
        chefe.resetaTiro()
        inimigo.resetaInimigo()
        animacao.Jogar()
        animacao.Lop()
        som.TrilhaPrincipal()
        JogarNovamente.style.display = 'none'
        NewUser.style.display = 'none'
        animacao.menu = true
    },
    desenhaTelaInicial: function () {
        let img = new Image()
        img.src = 'imagens/menus/Inicial.png'
        img.onload = function () {
            context.drawImage(img, 0, 0, 1949, 1086, 450, 0, 800, 300)
        }
    },
    ChefeFraco: function () { // limpa os inimigos quando o chefão ficar fraco
        if (chefe.SpriteVida == 3512) {
            if (animacao.cont < 1) {
                animacao.cont++
                chefe.ChefeFraco = true
                inimigo.resetaInimigo()
                console.log('O Chefão está fraco !')
            }
        }
    },
    ChefeMorto: function () { // função verifica se o chefe está morto e o retira da tela
        if (chefe.SpriteVida == 3512 && chefe.SpriteChefe == 792) {
            if (animacao.contt < 1) {
                animacao.contt++
                som.chefMorte()
                setTimeout(() => chefe.ChefeVivo = false, 400)
            }
        }
    },
    telaWin: function () {
        let img = new Image()
        img.src = 'imagens/menus/win.png'
        img.onload = function () {
            context.drawImage(img, 0, 0, 3122, 2231, 450, 0, 800, 300)
        }
    },
    desenhaMenu: function () {
        let img = new Image()
        img.src = animacao.Menu[animacao.IndiceMenu]
        img.onload = function () {
            context.drawImage(img, 0, 0, animacao.tamanhoMenu, animacao.alturaMenu, animacao.localX, animacao.localY, animacao.tamanhoX, animacao.tamanhoY)
        }
        setTimeout(() => animacao.menu = false, 2450)
    }
}