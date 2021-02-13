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