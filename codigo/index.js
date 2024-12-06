let currentUser = '';
let user1 = {
    name: "bruna",
    normal: true,
    doacoes: 0,
    email: "arturf123@gmail.com",
    senha: "ASD",
    foto: "/images/fff.jpg",
    artes: [
      {
        arte: "/images/fff.jpg",
        name: "xzz",
        curtidas: 1,
      },
      {
        arte: "/images/Anime1.jpg",
        name: "xzz",
        curtidas: 1,
      }
    ]
};

// Função para salvar no localStorage
function saveUserToLocalStorage(user) {
    // Obtém a lista de usuários existente no localStorage ou inicializa como um array vazio
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Adiciona o novo usuário à lista
    users.push(user);
    
    // Salva a lista atualizada no localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log('Usuário salvo com sucesso!');
}

saveUserToLocalStorage(user1);

const email = localStorage.getItem("users");
const users = JSON.parse(email);
console.log(users[0].email);


let emaillogado=users[0].email;

const params = new URLSearchParams(window.location.search);

// Extrair os valores

const email2 = params.get("email");


let emailteste='arturf123ss@gmail.com';





// Chama a função após carregar a página




function loadProfile(email) {

fetch(`http://localhost:3000/get-profile/${emailteste}`)
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
const nomeemail = document.getElementById('nomedeperfil');
nomeemail.innerText=email;

}




function updateLocalStorage(email) {
/*
fetch(`http://localhost:3000/get-user/${email}`)
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro ao atualizar LocalStorage: ${response.statusText}`);
    }
    return response.json();
})
.then(userData => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    console.log('LocalStorage atualizado:', userData);
})
.catch(error => console.error('Erro ao sincronizar LocalStorage:', error));
*/

}



function loadArtes(email) {
    fetch(`http://localhost:3000/get-artes/${emailteste}`)
        .then(response => response.json())
        .then(artes => {
            const feed = document.getElementById('feed');
            feed.innerHTML = '';


            artes.reverse();
            artes.forEach((arte, index) => {
                const originalIndex = artes.length - 1 - index;
                const photoContainer = document.createElement('div');
                photoContainer.classList.add('photo-container');

                const img = document.createElement('img');
                img.src = `http://localhost:3000${arte.arte}`;
                img.classList.add('photo');
                img.alt = "Arte do usuário";

                const actions = document.createElement('div');
                actions.classList.add('photo-actions');
                console.log('Artes carregadas:', arte.curtidas);

                let result = extractBetweenHyphenAndDot(arte.arte);
                console.log(result.length);
if (result.length===0) {

result=arte.arte;
}
if (arte.curtidas===undefined) {
arte.curtidas=0;
}
                actions.innerHTML = `






<span class="aa" value='${arte.name}'>nome: ${result}</span>


`;
                
            


                const commentsSection = document.createElement('div');
                commentsSection.classList.add('comments-section');
                commentsSection.style.display = 'none';
                commentsSection.id = `comments-section-${index}`;

                arte.comentarios.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.innerHTML = `
                        <span class="comment-user">${comment.usuario}:</span>
                        <span class="comment-text">${comment.texto}</span>
                    `;
                    commentsSection.appendChild(commentDiv);
                });

                const newCommentDiv = document.createElement('div');
                newCommentDiv.classList.add('new-comment');
                
                commentsSection.appendChild(newCommentDiv);

                photoContainer.appendChild(img);
                photoContainer.appendChild(actions);
                photoContainer.appendChild(commentsSection);
                feed.appendChild(photoContainer);
            });
        })
        .catch(error => console.error('Erro ao carregar artes:', error));
        updateLocalStorage(email); 
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


















function editProfile() {

    let email=emailteste;
    if (emaillogado !== emailteste) {
      // return;
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
                body: JSON.stringify({ email: email, arte: novaArte, name:"",curtidas:0,usuariosQueCurtiram:[] }),
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
window.location.href = 'pp.html'; // Substitua pelo caminho da sua página
}


loadProfile(emailteste);
loadArtes(emailteste);