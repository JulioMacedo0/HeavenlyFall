async function SavePoints() {
    let body = {
      user: usuario.name,
      points: personagem.pontos
    }
    console.log(body)
   await fetch ('http://localhost:3000/user/save', {
        method: 'POST',
        body:  JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
    .then((response) => console.log(response))
} 