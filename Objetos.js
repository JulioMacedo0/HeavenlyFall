document.addEventListener("keydown", function (evento) {
    //Função de pulo. Keycode = ESPACE
    if (evento.keyCode == 32 && animacao.jogando == true && animacao.GameOver == false) {
        personagem.pular()
        if (personagem.y == 225) {
            som.Pulo()
        }
    } else if (evento.keyCode == 13) {
        //Função de Pause do game. Keycode = ENTER
        if (animacao.ligado == true) {
            som.TrilhaPrincipalPause()
            animacao.pause()
        } else {
            animacao.ligar()
            som.TrilhaPrincipal()
        }
    }
    else if (evento.keyCode == 70 && animacao.jogando == false) {
        //Função que inicia o game. Keycode = F
        if (usuario.name != undefined && usuario.name != "") {
            usuario.BackupUser()
            Logar.style.display = 'none'
            som.TrilhaPrincipal()
            animacao.Jogar()
            animacao.Lop()
        } else {
            alert('Por favor, faça login com seu nome para iniciar o jogo')
        }
    } if (evento.keyCode == 69 && animacao.jogando == true) {
        //Função do tiro fraco do personagem. Keycode == E
        if (animacao.GameOver == false && animacao.Final == true) {
            personagem.Atirar()
            som.Tiro()
        }
    }
})

function Animacao(context) {
    this.context = context
    this.HistoryMode= true
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
        if(animacao.Final == true && montanha.IndiceMontanha == 4){ //Condição para corrigir os menus nas fases finais
            console.log("If 1")
            animacao.tamanhoX = 720
            animacao.tamanhoY = 200
            animacao.localX = 600
            animacao.localY = 0
        }
        else if (personagem.pontos >= animacao.proxFase && animacao.HistoryMode == true) { // Condição para mudar as fases
            console.log("If modo historia")
            if (montanha.IndiceMontanha < 4) {
                inimigo.resetaInimigo()
                animacao.mudaCenario()
                animacao.IndiceMenu ++
                animacao.proxFase += animacao.proxFase * 1.5    // dificuldade no decorrer das fases
                animacao.menu = true           
            }
    
        }else if (personagem.pontos >= animacao.proxFase && animacao.HistoryMode == false){
            if (montanha.IndiceMontanha < 3) {
                console.log("Muda cenário")
                animacao.mudaCenario()
                animacao.proxFase += 2
           }
           if (personagem.pontos >= animacao.proxFase && montanha.IndiceMontanha == 3) {
               console.log('reseta fase')
            animacao.proxFase += 2
            montanha.IndiceMontanha = 0
            chao.IndiceChao = 0
            nuvem.IndiceNuvem = 0
            }   
        }if (this.jogando == false) { // Tela inical do jogo
            animacao.desenhaTelaInicial()
        } if (this.GameOver == false) {
            montanha.desenhaMontanha()
            chao.desenhaChao()
            nuvem.desenhaNuvem()
            inimigo.desenhaInimigo()
            personagem.desenhaPoder()      
            animacao.QuantPontos()              
        } if (montanha.IndiceMontanha == 4 && animacao.GameOver == false && animacao.HistoryMode == true) { //Condição que deixa explicito para outras funções que o jogo está na fase final
            animacao.Final = true // deixa expicito para o resto do código que o usuario está na fase final 
            som.TrilhaPrincipalPause()
            animacao.mudaInimigo()
            som.MusicaFinal()
            if (chefe.ChefeVivo == true) { //condição que desenha o chefão enquanto ele estiver vivo
                if(chefe.ChefeFraco == true && chefe.ChefeVivo == true){ // condição que faz o chefe atirar e jogar raios no jogador enquanto estiver fraco
                chefe.andaTiro()
                chefe.ativaRaio()
                }
                chefe.desenhaChefe()
                chefe.desenhaVida()
                chefe.desenhaTiro()
            }
            if(chefe.ChefeVivo == false){ // tela de vitória que irá subir após a morte do chefão
                animacao.telaWin()    
            }
        } if (this.ligado = true && this.jogando == true && this.GameOver == false) {
            montanha.animaMontanha()
            animacao.QuantPontos()
            chao.animaChao()
            personagem.Gravidade()
            nuvem.animaNuvem()
            personagem.andaTiro()      
            personagem.desenhaPersonagem()
            inimigo.andaInimigo()
            if (animacao.menu == true){
            animacao.desenhaMenu()
            }
            if(chefe.tempestade == true){
                chefe.caiRaio()
            }
        }  
        else {
            animacao.QuantPontos()
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
         SavePoints()    
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
        if (chefe.SpriteVida == 3512 && chefe.SpriteChefe == 792){
            if(animacao.contt < 1){
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
        setTimeout( ()=> animacao.menu = false, 2450)
    }
}
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
function User() { 
    this.context = context
    this.name
    this.saveName
} User.prototype = {
    UserName: function () {
        usuario.name = prompt("Please enter your name");
    },
    SaveUser: function () {
        pontos = window.localStorage.getItem(usuario.name)
        if (pontos <= personagem.pontos) {
            window.localStorage.setItem(usuario.name, personagem.pontos)
        }
    },
    BackupUser: function () {
        console.log("Nome de usuario salvo!.")
        usuario.saveName = usuario.name
    },
    ModoRecorde: function () {
        animacao.HistoryMode = false
    },
    ModoHistoria: function () {
        animacao.HistoryMode = true
    },
}

function Chefão() {
    this.context = context
    this.ChefeVivo = true
    this.ChefeFraco = false
    this.tempestade = false
    this.tiro = []
    this.SpriteVida = 0
    this.x = 1400
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
