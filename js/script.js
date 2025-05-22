const questions = [
  {
    question: "Quem é o brasileiro mais seguido no TikTok em 2025?",
    answers: ["Virginia Fonseca", "Whindersson Nunes", "Lucas Rangel", "Camila Loures"],
  },
  {
    question: "Qual música viralizou no TikTok e ficou em 1º lugar no Brasil?",
    answers: ["Batom de Cereja", "Esquema Preferido", "Aquele 1%", "Tá Rocheda"],
  },
  {
    question: "Qual desses é um challenge famoso no TikTok brasileiro?",
    answers: ["Desafio do Tapa", "Desafio do Dança do Quadrado", "Desafio do Balde de Gelo", "Desafio do Emoji"],
  },
  {
    question: "Quem é conhecido como 'Rei do TikTok Brasil'?",
    answers: ["Luara Fonseca", "Dennis DJ", "Jade Picon", "Gabriel Sampaio"],
  },
  {
    question: "Qual a função principal do TikTok?",
    answers: ["Vídeos curtos", "Fotos", "Mensagens", "Stories"],
  },
  {
    question: "Qual o nome do recurso que permite colocar músicas nos vídeos do TikTok?",
    answers: ["Sounds", "Filters", "Duets", "Stickers"],
  },
  {
    question: "Qual dessas é uma trend recente no TikTok Brasil?",
    answers: ["Trend da Lagoa Azul", "Trend do Passinho", "Trend do Skate", "Trend do Vôlei"],
  },
  {
    question: "Qual é o principal público do TikTok no Brasil?",
    answers: ["Jovens de 16-24 anos", "Adultos 35-44 anos", "Crianças", "Idosos"],
  },
  {
    question: "Quem foi a cantora brasileira que viralizou com a música 'Modo Turbo'?",
    answers: ["Luísa Sonza", "Anitta", "Pabllo Vittar", "Iza"],
  },
  {
    question: "Qual o limite máximo de duração para um vídeo no TikTok?",
    answers: ["10 minutos", "1 minuto", "30 segundos", "5 minutos"],
  },
  {
    question: "Qual desses criadores brasileiros ganhou destaque no TikTok por vídeos de humor?",
    answers: ["Carlinhos Maia", "Felipe Neto", "Whindersson Nunes", "Tatá Werneck"],
  },
  {
    question: "Qual a rede social concorrente do TikTok no Brasil?",
    answers: ["Instagram Reels", "Facebook", "Twitter", "Snapchat"],
  },
  {
    question: "Qual o nome do recurso onde você pode fazer duetos com outros usuários?",
    answers: ["Duets", "Reels", "Stories", "Live"],
  },
  {
    question: "Qual aplicativo é usado para editar vídeos antes de postar no TikTok?",
    answers: ["InShot", "Spotify", "WhatsApp", "Netflix"],
  },
  {
    question: "Qual desses não é permitido no TikTok segundo as regras da plataforma?",
    answers: ["Conteúdo violento", "Dança", "Comédia", "Desafios criativos"],
  },
];

// Variáveis para controle
let currentQuestionIndex = 0;
let totalReward = 0;
const minReward = 17;
const maxReward = 40;
const minTotal = 430;
const maxTotal = 600;
const totalQuestions = questions.length;

// Função para gerar valor aleatório entre minReward e maxReward
function generateReward() {
  return +(Math.random() * (maxReward - minReward) + minReward).toFixed(2);
}

// Função para arredondar saldo total e ajustar no fim (se quiser pode melhorar lógica)
function formatCurrency(value) {
  return "R$ " + value.toFixed(2).replace('.', ',');
}

// DOM Elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");
const progressEl = document.getElementById("progress");
const walletEl = document.getElementById("wallet");
const popup = document.getElementById("popup");
const valorGanhoEl = document.getElementById("valorGanho");
const continuarPopupBtn = document.getElementById("continuarPopup");
const bonusPopup = document.getElementById("bonusPopup");
const bonusValorEl = document.getElementById("bonusValor");
const sacarBonusBtn = document.getElementById("sacarBonusBtn");

let selectedReward = 0;

function loadQuestion() {
  nextButton.disabled = true;
  const currentQ = questions[currentQuestionIndex];
  questionEl.textContent = currentQ.question;
  answersEl.innerHTML = "";

  currentQ.answers.forEach((answerText, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-button";
    btn.textContent = answerText;
    btn.addEventListener("click", () => selectAnswer(btn));
    answersEl.appendChild(btn);
  });

  updateProgress();
}

function selectAnswer(button) {
  // Remove seleção anterior
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  // Marca o selecionado
  button.classList.add("selected");
  nextButton.disabled = false;

  // Gera recompensa para a pergunta
  selectedReward = generateReward();
}

function updateProgress() {
  const progressPercent = ((currentQuestionIndex) / totalQuestions) * 100;
  progressEl.style.width = progressPercent + "%";
}

function updateWallet(amount) {
  totalReward += amount;
  walletEl.textContent = "Saldo: " + formatCurrency(totalReward);
}

function showPopup(reward) {
  valorGanhoEl.textContent = "+" + formatCurrency(reward);
  popup.style.display = "flex";
}

function hidePopup() {
  popup.style.display = "none";
}

function showBonusPopup() {
  bonusValorEl.textContent = formatCurrency(totalReward);
  bonusPopup.style.display = "flex";
}

function hideBonusPopup() {
  bonusPopup.style.display = "none";
}

// Evento botão Continuar (próxima pergunta ou popup final)
nextButton.addEventListener("click", () => {
  if (selectedReward === 0) return; // segurança

  // Atualiza saldo
  updateWallet(selectedReward);

  // Exibe popup recompensa
  showPopup(selectedReward);

  // Desabilita botão para evitar cliques duplos
  nextButton.disabled = true;

  // Quando popup continuar for clicado, fecha popup e avança a pergunta
  continuarPopupBtn.onclick = () => {
    hidePopup();

    currentQuestionIndex++;

    if (currentQuestionIndex >= totalQuestions) {
      // Perguntas finalizadas - mostrar popup bônus final
      showBonusPopup();
      localStorage.setItem('saldoFinal', totalReward.toFixed(2));
      nextButton.style.display = "none";
    } else {
      loadQuestion();
    }
  };
});

// Evento saque bônus
sacarBonusBtn.addEventListener("click", () => {
  window.location.href = "last-page.html"; // substitua pelo caminho da sua página de saque
});

// Inicializa o quiz
loadQuestion();
walletEl.textContent = "Saldo: R$ 0,00";
