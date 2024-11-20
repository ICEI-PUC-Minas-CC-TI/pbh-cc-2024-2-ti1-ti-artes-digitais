// Dados simulados da arte e usuário
const artData = {
  item_id: "ART1001",
  title: "Abstract Landscape",
  artist: "creativePainter",
  price: 50.00,
  currency: "USD"
};

const userData = {
  user_id: "U001",
  username: "artLover123",
  email: "artlover123@example.com"
};

// Elementos DOM
const modal = document.getElementById("transactionModal");
const buyDonateBtn = document.getElementById("buyDonateBtn");
const closeBtn = document.querySelector(".close");
const buyBtn = document.getElementById("buyBtn");
const donateBtn = document.getElementById("donateBtn");
const popupDescription = document.getElementById("popup-description");

// Função para exibir/ocultar descrição da arte
function toggleDescription() {
  const body = document.body;
  if (popupDescription.classList.contains("hidden")) {
      popupDescription.classList.remove("hidden");
      body.classList.add("popup-active");
  } else {
      popupDescription.classList.add("hidden");
      body.classList.remove("popup-active");
  }
}

// Eventos do modal de transação
if (buyDonateBtn) {
  buyDonateBtn.onclick = () => {
      modal.style.display = "block";
  };
}

if (closeBtn) {
  closeBtn.onclick = () => {
      modal.style.display = "none";
  };
}

window.onclick = (event) => {
  if (event.target === modal) {
      modal.style.display = "none";
  }
};

// Lógica de Compra e Doação
if (buyBtn) {
  buyBtn.onclick = () => processTransaction("purchase");
}

if (donateBtn) {
  donateBtn.onclick = () => processTransaction("donation");
}

// Processar transação
function processTransaction(type) {
  let transaction = {
      transaction_id: "TX004",
      type: type,
      user: userData,
      item: artData,
      payment: {
          method: type === "purchase" ? "credit_card" : "paypal",
          status: "completed",
          date: new Date().toISOString()
      }
  };

  if (type === "donation") {
      let amount = parseFloat(prompt("Digite o valor da doação:"));
      if (isNaN(amount) || amount <= 0) {
          alert("Por favor, insira um valor válido.");
          return;
      }
      let message = prompt("Deixe uma mensagem para o artista:");
      transaction.donation = {
          artist: artData.artist,
          amount: amount,
          currency: artData.currency,
          message: message || ""
      };
  }

  console.log("Transação realizada: ", JSON.stringify(transaction, null, 2));
  alert("Transação realizada com sucesso!");
  modal.style.display = "none";
}

// Fechar descrição com "Esc"
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !popupDescription.classList.contains("hidden")) {
      toggleDescription();
  }
});
