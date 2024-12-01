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

app.get('/get-user/:email', (req, res) => {
    const email = req.params.email;

    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao carregar os dados.' });
        }

        const users = JSON.parse(data || '[]');
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user);
    });
});


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






app.get('/get-profile/:email', (req, res) => {
    const email = req.params.email;
    
    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo.');
        }
        
        const users = JSON.parse(data);
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Retorna apenas as informações de perfil (nome e foto)
        const profile = {
            name: user.name,
            foto: user.foto
        };
        
        res.status(200).json(profile);
    });
});


// Rota para obter artes de um usuário específico por e-mail
app.get('/get-artes/:email', (req, res) => {
    const email = req.params.email;

    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo.');
        }

        let users = JSON.parse(data || '[]');
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.status(200).json(user.artes);
    });
});




// Rota para adicionar um comentário

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



app.post('/add-arte', (req, res) => {
    const { email, arte } = req.body; // Certifique-se de que o corpo da requisição contém esses campos

    fs.readFile('aa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler o arquivo.' });
        }

        let users = JSON.parse(data || '[]');
        
        const user = users.find(user => user.email === email);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        
        // Adiciona a nova arte ao campo 'artes'
        user.artes.push({
            arte: arte,
            name:extractBetweenHyphenAndDot(arte),
            curtidas:0,
            usuariosQueCurtiram:[],
            comentarios: []
        });

        // Salva as mudanças no JSON
        fs.writeFile('aa.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar a arte.' });
            }
            res.status(200).json({ message: 'Arte adicionada com sucesso!' });
        });
    });
});

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
const multer = require('multer');

// Configuração do multer para salvar imagens na pasta "public/images"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    // Retorna o caminho da imagem salva
    res.status(200).json({ filePath: `/images/${req.file.filename}` });
});


// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
