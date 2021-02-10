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
            ModoHistoria.style.display = 'none'
            ModoRecorde.style.display = 'none'
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