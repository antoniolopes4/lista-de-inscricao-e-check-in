
let participantes = [
  {
    nome: "António",
    email: "antonio@gmail.com",
    dataInscricao: new Date(2024, 0, 24, 19, 1),
    dataCheckIn: new Date(2024, 3, 2, 21, 0)
  },
  {
    nome: "Ana",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 1, 12, 10, 0),
    dataCheckIn: new Date(2024, 3, 1, 19, 31)
  },
  {
    nome: "Carlos",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Beatriz",
    email: "beatriz@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 17, 0),
    dataCheckIn: new Date(2024, 1, 20, 11, 15)
  },
  {
    nome: "Daniel",
    email: "daniel@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 9, 45),
    dataCheckIn: null
  },
  {
    nome: "Eva",
    email: "eva@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 20, 10),
    dataCheckIn: null
  },
  {
    nome: "Filipe",
    email: "filipe@gmail.com",
    dataInscricao: new Date(2023, 10, 25, 11, 20),
    dataCheckIn: new Date(2023, 11, 10, 18, 55)
  },
  {
    nome: "Gustavo",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 1, 1, 8, 0),
    dataCheckIn: new Date(2024, 1, 16, 14, 40)
  },
  {
    nome: "Helena",
    email: "helena@gmail.com",
    dataInscricao: new Date(2023, 11, 30, 13, 30),
    dataCheckIn: null
  },
  {
    nome: "Igor",
    email: "igor@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 22, 15),
    dataCheckIn: new Date(2024, 3, 4, 7, 25)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  //condional
  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-In
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  //loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação HTML
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) =>{
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //Verificar se o particpante já existe
  const participanteExite = participantes.find((p) =>p.email == participante.email
  )

  if(participanteExite){
    alert("Participante já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //Limpar a lista
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //Confirmar se realmente quer o check-in
  const mensagemConfirmacao = "Tem certeza que quer fazr o check-in?"

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  //Encontrar participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email ==event.target.dataset.email
  })

  //Atualizar Check-In do participante
  participante.dataCheckIn = new Date()

  //Atualizar lista de participantes
  atualizarLista(participantes)
}