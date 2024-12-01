let currentUser = '';




let emailstodos="aaa";
const email = localStorage.getItem("users");
const users = JSON.parse(email);
console.log(users[0].email);
let emaillogado=users[0].email;
let emailteste=users[0].email;



//let emaillogado='arturf123ss@gmail.com';
//let emailteste='arturf123ss@gmail.com';


// Chama a função após carregar a página



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
        
        actions.innerHTML = `
           
            <span class="photo-action" onclick="toggleComments(${index})">💬 Comentar</span>
           
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



function toggleComments(index) {
    console.log("aaa"+index);
    const commentsSection = document.getElementById(`comments-section-${index}`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    updateLocalStorage(email); 
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







loadallArtes();