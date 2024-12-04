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









// Rota para obter artes de um usuário específico por e-mail


app.post('/doar/:email', (req, res) => {
    const email = req.params.email;
    const { donationValue } = req.body; // Valor enviado do frontend

    // Validação do valor da doação
    if (!donationValue || isNaN(donationValue) || donationValue <= 0) {
        return res.status(400).json({ message: 'Valor de doação inválido.' });
    }

    // Ler o arquivo JSON
    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ message: 'Erro ao acessar os dados.' });
        }

        let users = JSON.parse(data || '[]'); // Converte os dados para objeto

        // Encontra o usuário correspondente ao email
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Atualiza o valor da doação
        user.doacoes = (user.doacoes || 0) + parseFloat(donationValue);

        // Escreve as alterações de volta no arquivo JSON
        fs.writeFile('aa.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                return res.status(500).json({ message: 'Erro ao salvar os dados.' });
            }

            res.status(200).json({ message: 'Doação registrada com sucesso.', user });
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



// Rota para adicionar uma nova mensagem






// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
