let currentUser = '';




let emailstodos="aaa";
const email = localStorage.getItem("users");
const users = JSON.parse(email);
console.log(users[0].email);
let emaillogado=users[0].email;
let emailteste=users[0].email;










function loadProfile(email) {

fetch(`http://localhost:3000/get-profile/${email}`)
.then(response => response.json())
.then(user => {
    const profileButton = document.getElementById('profileButton');
    const profileName = document.getElementById('profileName');

    // Atualiza a imagem e adiciona evento de clique
    profileButton.innerHTML = `<img src="http://localhost:3000${user.foto}" alt="Foto do perfil" id="profileImage">`;
    profileName.textContent = user.name;

    
})
.catch(error => console.error('Erro ao carregar perfil:', error));



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
            
            <span class="aa" value='${arte.name}'>nome:${result}</span>
          
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




loadProfile(emailteste);
loadallArtes();