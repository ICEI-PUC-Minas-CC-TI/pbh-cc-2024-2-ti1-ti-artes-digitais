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
  
  // Exibir o modal de transação
  const modal = document.getElementById("transactionModal");
  const buyDonateBtn = document.getElementById("buyDonateBtn");
  const span = document.getElementsByClassName("close")[0];
  
  buyDonateBtn.onclick = function() {
    modal.style.display = "block";
  }
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  
  // Lógica de Compra
  document.getElementById("buyBtn").onclick = function() {
    processTransaction('purchase');
  }
  
  // Lógica de Doação
  document.getElementById("donateBtn").onclick = function() {
    processTransaction('donation');
  }
  
  // Função de processamento de transação
  function processTransaction(type) {
    let transaction = {
      transaction_id: "TX004",
      type: type,
      user: userData,
      item: artData,
      payment: {
        method: type === 'purchase' ? 'credit_card' : 'paypal',
        status: 'completed',
        date: new Date().toISOString()
      }
    };
  
    if (type === 'donation') {
      transaction.donation = {
        artist: artData.artist,
        amount: prompt("Digite o valor da doação:"),
        currency: artData.currency,
        message: prompt("Deixe uma mensagem para o artista:")
      };
    }
  
    console.log("Transação realizada: ", JSON.stringify(transaction, null, 2));
    alert("Transação realizada com sucesso!");
    modal.style.display = "none";
  }

  // Abrir e fechar o modal de descrição
const moreButton = document.querySelector('.icon-button.more');
const descriptionModal = document.getElementById('descriptionModal');
const closeDescription = document.querySelector('.modal .close');

moreButton.onclick = function() {
    descriptionModal.style.display = "block";
};

closeDescription.onclick = function() {
    descriptionModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === descriptionModal) {
        descriptionModal.style.display = "none";
    }
};

// Abrir e fechar o modal de configurações
const settingsButton = document.querySelector('.settings-button');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.querySelector('.close-settings');

settingsButton.onclick = function() {
    settingsModal.style.display = "block";
};

closeSettings.onclick = function() {
    settingsModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
};

// Alternar entre modo escuro e claro
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

toggleThemeBtn.onclick = function() {
    document.body.classList.toggle('dark-mode');
};

// Estilo para modo escuro
if (document.body.classList.contains('dark-mode')) {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = 'white';
} else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
}

// Função para abrir o modal
function openDescriptionModal() {
  document.getElementById("descriptionModal").style.display = "block";
}

// Função para fechar o modal
function closeDescriptionModal() {
  document.getElementById("descriptionModal").style.display = "none";
}

// Fechar o modal ao clicar fora da área de conteúdo
window.onclick = function(event) {
  const modal = document.getElementById("descriptionModal");
  if (event.target === modal) {
      modal.style.display = "none";
  }
}

