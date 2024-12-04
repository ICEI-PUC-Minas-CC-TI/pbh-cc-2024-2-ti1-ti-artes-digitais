let currentUser = '';




let emailstodos="aaa";
const email = localStorage.getItem("users");
const users = JSON.parse(email);
//console.log(users[0].email);
//let emaillogado=users[0].email;
//let emailteste=users[0].email;




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




loadallArtes();