let currentUser = '';

// Função para carregar o perfil do usuário
// let emaillogado='arturf123ss@gmail.com';


//let emaillogado='artur70152@gmail.com';
// let emailteste='artur70152@gmail.com';

//emeillogado=pessoa visitando perfil
//let emaillogado='arturf123ss@gmail.com';

//emailteste=perfil sendo visitado
//let emailteste='artur70152@gmail.com';

//let emaillogado='artur70152@gmail.com';
//let emailteste='arturf123ss@gmail.com';


let emailstodos="aaa";
const email = localStorage.getItem("users");
const users = JSON.parse(email);
console.log(users[0].email);
let emaillogado=users[0].email;
let emailteste=users[0].email;



//let emaillogado='arturf123ss@gmail.com';
//let emailteste='arturf123ss@gmail.com';

function loadSendMessageButton() {
    const container = document.getElementById('sendMessageButtonContainer');
    
    const button = document.createElement('button');
    button.className = 'sendmessagebutton';
    button.textContent = 'Alterar Tema';

    // Cores iniciais
    let coratual = '#f0f2f5'; // Cor clara
    let proximacor = '#323538'; // Cor escura

    button.onclick = () => mudarCorDeFundo(coratual, proximacor);

    container.appendChild(button);
}

function mudarCorDeFundo(cor1, cor2) {
    //profileName
    let nam=document.getElementById('profileName');
   // nam.style.color = 'white'; 
    const backgroundColor = getComputedStyle(document.body).backgroundColor;

    // Converter cores hexadecimais para RGB
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    };

    const cor1Rgb = hexToRgb(cor1);
    const cor2Rgb = hexToRgb(cor2);

    if (backgroundColor === cor1Rgb) {
        document.body.style.backgroundColor = cor2;
        nam.style.color = 'white'; 
    } else if (backgroundColor === cor2Rgb) {
        nam.style.color = 'black'; 
        document.body.style.backgroundColor = cor1;
    } else {
        // Define uma cor padrão caso o fundo não esteja configurado
        document.body.style.backgroundColor = cor1;
    }
}
// Chama a função após carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadSendMessageButton();
});


function performSearch() {
const query = document.getElementById('searchInput').value;

// Verifica se o campo não está vazio
if (!query.trim()) {
alert('Por favor, insira algo para pesquisar.');
return;
}

document.getElementById('searchInput').value = "";

// Procura o email correspondente
const matchedEmail = emailstodos.find(emailObj => emailObj.email === query);

if (matchedEmail) {
setTimeout(() => {
   // window.location.href = `index.html?email=${encodeURIComponent(email)}&background=${encodeURIComponent(backgroundColor)}`;
    window.location.href = `index.html?email=${encodeURIComponent(query)}`;
}, 1000);
} else {
alert('Email não encontrado!');
}
}



function loadProfile(email) {

fetch(`http://localhost:3000/get-profile/${email}`)
.then(response => response.json())
.then(user => {
    const profileButton = document.getElementById('profileButton');
    const profileName = document.getElementById('profileName');

    // Atualiza a imagem e adiciona evento de clique
    profileButton.innerHTML = `<img src="http://localhost:3000${user.foto}" alt="Foto do perfil" id="profileImage">`;
    profileName.textContent = user.name;

    const profileImage = document.getElementById('profileImage');
    if (emaillogado === emailteste) {
        profileImage.onclick = () => updateProfilePhoto(email);
    } else {
        profileImage.onclick = null; // Remove qualquer evento existente
    }
})
.catch(error => console.error('Erro ao carregar perfil:', error));



}
function loadUserToLocalStorage(email) {

}

document.addEventListener('DOMContentLoaded', () => {
const userEmail = emailteste; // Substitua pelo email do usuário desejado
loadUserToLocalStorage(userEmail);
});

function updateLocalStorage(email) {

}


function updateProfilePhoto(emaillogado) {


    setTimeout(() => {
        //window.location.href = `index.html?email=${encodeURIComponent(email)}&background=${encodeURIComponent(backgroundColor)}`;
window.location.href = `index.html?email=${encodeURIComponent(emaillogado)}`;
}, 1000);
updateLocalStorage(email);  // Abre o seletor de arquivos
}





function loadallArtes() {
  // mudarCorDeFundo();
    let oo=0;
fetch(`http://localhost:3000/get-all-artes`)
.then(response => response.json())
.then(artes => {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Limpa o feed antes de carregar

    // Ordena as artes pela ordem inversa
    artes.reverse();
    emailstodos=artes;
    console.log("Artes carregadas:", emailstodos);
    // Itera sobre todas as artes para criar os elementos do feed
    artes.forEach((arte, index) => {
      
        if (!arte.arte || arte.arte.trim() === '') {
            
            oo=oo+1;
            return; // Pula para a próxima iteração
        }
       
const originalIndex = artes.length - 1 - index; 
index=index-oo;
let index22=arte.indexa;
console.log("original", originalIndex);
console.log("index", index);
        // Contêiner para a arte
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');

        // Imagem da arte
        const img = document.createElement('img');
        img.src = `http://localhost:3000${arte.arte}`;
        img.classList.add('photo');
        img.alt = `Arte do usuário ${arte.email}`;

        // Ações (curtir e comentar)
        const actions = document.createElement('div');
        actions.classList.add('photo-actions');
        let result = extractBetweenHyphenAndDot(arte.arte);
                console.log(result.length);
if (result.length===0) {

result=arte.arte;
}
        actions.innerHTML = `
            <span class="photo-action" onclick="likePhoto(${originalIndex}, '${arte.email}', '${arte.email}','${index}','${index22}')">
                👍 Curtir <span id="likes-count-${originalIndex}">${arte.curtidas}</span>
            </span>
            <span class="photo-action" onclick="toggleComments(${index})">💬 Comentar</span>
            <span class="aa" value='${arte.name}'>nome:${result}</span>
           <button class="aa" value="${arte.name}" onclick="gotoemail('${arte.email}')">${arte.email}</button>

            <button class="aac"' onclick="doarpara('${arte.email}')">$$</span>
        `;

        // Comentários
        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments-section');
        commentsSection.style.display = 'none';
        commentsSection.id = `comments-section-${index}`;

        // Adiciona os comentários existentes
        arte.comentarios.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <span class="comment-user">${comment.usuario}:</span>
                <span class="comment-text">${comment.texto}</span>
            `;
            commentsSection.appendChild(commentDiv);
        });

        // Campo para novo comentário
        const newCommentDiv = document.createElement('div');
        newCommentDiv.classList.add('new-comment');
        newCommentDiv.innerHTML = `
            <input type="text" id="new-comment-input-${index}" placeholder="Escreva um comentário...">
            <button onclick="addComment(${index}, '${arte.email}', '${originalIndex}', '${index22}')">Enviar</button>
        `;
        commentsSection.appendChild(newCommentDiv);

        // Adiciona tudo ao contêiner principal
        photoContainer.appendChild(img);
        photoContainer.appendChild(actions);
        photoContainer.appendChild(commentsSection);
        feed.appendChild(photoContainer);
    });
})
.catch(error => console.error('Erro ao carregar artes:', error));
}

function gotoemail(email){
setTimeout(() => {
    //window.location.href = `index.html?email=${encodeURIComponent(email)}&background=${encodeURIComponent(backgroundColor)}`;
    window.location.href = `index.html?email=${encodeURIComponent(email)}`;
}, 1000);

}
function doarpara(email) {
const donationValue = prompt("Digite o valor da doação:");

// Valida o valor da doação
if (!donationValue || isNaN(donationValue) || parseFloat(donationValue) <= 0) {
alert('Por favor, insira um valor de doação válido.');
return;
}

// Envia a requisição para o backend
fetch(`http://localhost:3000/doar/${email}`, {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ donationValue: parseFloat(donationValue) })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao processar a doação.');
    }
    return response.json();
})
.then(data => {
    // Exibe a mensagem de sucesso ou erro
    alert(data.message);
    console.log('Resposta do servidor:', data);
})
.catch(error => {
    console.error('Erro ao realizar a doação:', error);
    alert('Erro ao realizar a doação. Tente novamente.');
});
}


function extractBetweenHyphenAndDot(inputString) {
// Encontra a posição do último '-' na string
const hyphenIndex = inputString.lastIndexOf('-');
// Encontra a posição do primeiro '.' após o '-'
const dotIndex = inputString.indexOf('.', hyphenIndex);

// Se ambos os índices forem válidos, extrai a substring
if (hyphenIndex !== -1 && dotIndex !== -1) {
return inputString.substring(hyphenIndex + 1, dotIndex);
}

// Retorna uma string vazia se não encontrar o padrão esperado
return '';
}
function toggleComments(index) {
    console.log("aaa"+index);
    const commentsSection = document.getElementById(`comments-section-${index}`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    updateLocalStorage(email); 
}
function sendmessagebutton(email) {
// Obtenha o usuário atual do localStorage
//const currentUserData = JSON.parse(localStorage.getItem('currentUser'));

// if (!currentUserData) {
//  alert("Erro: Usuário atual não encontrado no localStorage.");
//  return;
// }
if (emaillogado === emailteste) {
       return;
    } 
const currentUserEmail = emaillogado;

fetch('http://localhost:3000/add-message', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    usuario: emailteste, // Email do destinatário
    texto: '.', // Conteúdo da mensagem
    remetente: emaillogado // Email do remetente
})
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro ao enviar mensagem: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    alert("Mensagem enviada com sucesso!");
    console.log("Resposta do servidor:", data);
})
.catch(error => {
    console.error("Erro ao enviar mensagem:", error);
    alert("Erro ao enviar mensagem.");
});
}
function removePhoto(index, email) {
if (!confirm("Você tem certeza de que deseja remover esta arte?")) return;

fetch('http://localhost:3000/remove-arte', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
    email: email,
    arteIndex: index,
}),
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro ao remover arte: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    alert(data.message || "Arte removida com sucesso!");
    loadArtes(email); // Recarregar as artes após a remoção
})
.catch(error => console.error('Erro ao remover arte:', error));
updateLocalStorage(email); 
}

function likePhoto(index, email, usuario,index2, index22) {
    console.log("indexoriginal"+index);
    console.log("index"+index2);
    console.log("email"+email);
    console.log("usuario"+usuario);
fetch('http://localhost:3000/update-curtidas', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
    email: email,
    arteIndex: index22,
    usuario: usuario, // Email do usuário atual
}),
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro ao registrar curtida: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Atualiza o número de curtidas na interface
    const likesCount = document.getElementById(`likes-count-${index}`);
    likesCount.textContent = data.curtidas;
})
.catch(error => {
    alert(`Erro: ${error.message}`);
    console.error('Erro ao registrar curtida:', error);
});

updateLocalStorage(email); 
}





function toggleMessageList() {
  //  if (emaillogado !== emailteste) {
   //    return;
  //  } 
    const messageList = document.getElementById("messageList");
    messageList.style.display = messageList.style.display === "none" ? "block" : "none";
    loadConversations();
  //  updateLocalStorage(email); 
}

function loadConversations() {
    let email=emaillogado;
 //   if (emaillogado !== emailteste) {
     //  return;
  //  } 
    fetch(`http://localhost:3000/get-messages/${email}`)
    
        .then(response => response.json())
        .then(conversations => {
            
            const conversationList = document.getElementById('conversationList');
            conversationList.innerHTML = '';

            conversations.forEach(convo => {
               // console.log(convo);
                const convoDiv = document.createElement('div');
                convoDiv.classList.add('message-user');
               
                convoDiv.innerHTML = `
                    <img src="http://localhost:3000${convo.foto}" alt="Foto de ${convo.nome}" class="conversation-photo">
                    <span>${convo.nome || "Usuário Anônimo"}</span>
                `;
                
                convoDiv.onclick = () => {
                    currentUser = convo.usuario;
                    
                    loadMessages(convo.mensagens);
                };
                conversationList.appendChild(convoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar conversas:', error));
        updateLocalStorage(email); 
}

function loadMessages(messages) {
 //   if (emaillogado !== emailteste) {
    //  return;
   // } 
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.textContent = msg;
        messagesDiv.appendChild(msgDiv);
    });
 //  updateLocalStorage(email); 
}

function sendMessage() {
  //  if (emaillogado !== emailteste) {
     //  return;
   // } 
const input = document.getElementById("newMessageInput");
const messageText = input.value.trim(); // Texto da mensagem

const currentUserEmail = emaillogado; // Email do remetente

const usuario = currentUser; // Email do destinatário

if (!messageText || !currentUserEmail || !usuario) {
alert("Erro: Texto da mensagem, remetente ou destinatário estão ausentes.");
return;
}

fetch('http://localhost:3000/add-message', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
    usuario: usuario,
    texto: messageText,
    remetente: currentUserEmail
})
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro ao enviar mensagem: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    console.log("Mensagem enviada:", data);
    input.value = ''; // Limpa o campo de entrada após o envio

    const messagesDiv = document.getElementById('messages');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.textContent = `Você: ${messageText}`;
    messagesDiv.appendChild(msgDiv);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Rola para a última mensagem
})
.catch(error => console.error('Erro ao enviar mensagem:', error));
}


function addComment(index, email,originalIndex,index22) {
    const input = document.getElementById(`new-comment-input-${index}`);
    const commentText = input.value.trim();
    console.log("aaaa");
console.log(originalIndex);
console.log(index);
    if (commentText === '') {
        alert("O comentário não pode estar vazio!");
        return;
    }

    const commentsSection = document.getElementById(`comments-section-${index}`);
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <span class="comment-user">Você:</span>
        <span class="comment-text">${commentText}</span>
    `;
    commentsSection.insertBefore(commentDiv, commentsSection.lastChild);

    input.value = '';

    fetch(`http://localhost:3000/add-comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            arteIndex: index22,
            comentario: {
                usuario: "Você",
                texto: commentText
            }
        })
    })
    .then(response => response.json())
    .then(data => console.log("Comentário adicionado:", data))
    .catch(error => console.error('Erro ao adicionar comentário:', error));
    
   // updateLocalStorage(email); 
    
}

function editProfile() {
    let email=emailteste;
    if (emaillogado !== emailteste) {
       return;
    } 
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';

input.onchange = function () {
const file = input.files[0];
if (file) {
    const formData = new FormData();
    formData.append('file', file);

    // Opcional: Salvar no servidor local ou usar Base64 diretamente
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            // Enviar o caminho da nova arte para o backend
            const novaArte = data.filePath; // URL ou caminho do arquivo retornado
            fetch('http://localhost:3000/add-arte', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, arte: novaArte }),
            })
                .then(response => response.json())
                .then(result => {
                    alert(result.message);
                    loadArtes(email); // Recarrega as artes para mostrar a nova arte
                })
                .catch(error => console.error('Erro ao adicionar arte:', error));
        })
        .catch(error => console.error('Erro ao fazer upload da imagem:', error));
}
};

input.click();
updateLocalStorage(email); 
}

function openSettings() {
window.location.href = 'login.html';
localStorage.clear();
// Substitua pelo caminho da sua página
}


loadProfile(emailteste);
loadallArtes();