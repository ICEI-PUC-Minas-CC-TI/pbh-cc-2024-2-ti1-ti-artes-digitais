const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Middleware para interpretar JSON e permitir CORS
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Rota para salvar dados no arquivo JSON


app.get('/get-all-artes', (req, res) => {
    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao carregar os dados.' });
        }

        const users = JSON.parse(data);

        // Coleta todas as artes de todos os usuários, incluindo o índice
        const todasAsArtes = users.flatMap(user => 
            user.artes.map((arte, index) => ({
                email: user.email,
                indexa: index, // Adiciona o índice de cada arte
                ...arte       // Inclui as propriedades de cada arte
            }))
        );

        res.status(200).json(todasAsArtes); // Retorna todas as artes em um único array
    });
});








// Rota para adicionar um comentário
app.post('/add-comment', (req, res) => {
    const { email, arteIndex, comentario } = req.body;

    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo.');
        }

        let users = JSON.parse(data || '[]');
        const user = users.find(user => user.email === email);
        //console.log(user);
       // console.log(user.artes);
        if (!user || !user.artes[arteIndex]) {
            return res.status(404).send('Usuário ou arte não encontrados.');
        }
       // console.log(user);
        // Adiciona o comentário
        user.artes[arteIndex].comentarios.push(comentario);
       // console.log(user);
        // Salva a atualização no arquivo JSON
        fs.writeFile('aa.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o comentário.');
            }
            res.status(200).json({ message: 'Comentário adicionado com sucesso!' });
        });
    });
});
/*

app.get('/get-messages/:email', (req, res) => {
    const email = req.params.email;
    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo.');
        const users = JSON.parse(data);
        const user = users.find(user => user.email === email);

        if (!user) return res.status(404).send('Usuário não encontrado.');

        // Retorna as mensagens do usuário
        res.status(200).json(user.mensagens || []);
    });
});
 */



// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
