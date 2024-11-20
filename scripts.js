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
  
   // Função de exibição do popup de descrição
   function toggleDescription()
   {
    const popup = document.getElementById('popup-description');
    const body = document.body;

    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        body.classList.add('popup-active');
    } else {
        popup.classList.add('hidden');
        body.classList.remove('popup-active');
    } 
  }