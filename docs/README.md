 Introdução

Informações básicas do projeto.

* **Projeto:** [BuyArt]
* **Repositório GitHub:** [https://github.com/ICEI-PUC-Minas-CC-TI/pbh-cc-2024-2-ti1-ti-artes-digitais.git]
* **Membros da equipe:**

  * [Raphael Grossi](https://github.com/HGonroy)
  * [Miguel Pessoa](https://github.com/MiguelPessoaLF)
  * [Gabriel Anderson](https://github.com/cicrano)
  * [Artur Fernandes](https://github.com/cicrano)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/ti_documentacao.pdf)

 Contexto

Visibilidade da arte na internet, uma vez que artistas e pessoas que gostam de arte não possuem um local adequado na internet para isso.

 Problema

O problema que o BuyArt busca resolver é a visibilidade dos artistas e a valorização do seu trabalho na internet

 Objetivos

> O BuyArt consegue unir a comunidade de diferentes maneiras sejam elas usuários das redes sociais, artistas que não conseguem visualização nas redes sociais, assim como entusiastas por arte que querem um trabalho personalizado mas não tem alcance aos artistas uma vez que os mesmo não possuem visibilidade na internet.

 Justificativa

> Escolhemos fazer este projeto pois sentimos a necessidade de poder ajudar pessoas que tem talento e muita dedicação a poderem exercer sua profissão de artista, por meio do melhor de canal de comunicação que existe, a internet.

 Público-Alvo

> Artistas, usuários interesados em artes, empresas de jogos, etc.

 Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

 Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...`Artista` | QUERO/PRECISO ...`desenhar e postar`        | PARA ...`lucrar com isso`               |
| --------------------- | ------------------------------------------ | -------------------------------------- |
| Usuário do sistema   | Postas suas próprias artes e fomentar a comunidade |ser reconhecido e lucrar com isso|
| Administrador         | Gerenciar e moderar a rede social BuyArt | manter a ordem e harmonia no site |

> Imagine, um jovem de 25 anos que desenha a anos e possui capacidade para trabalhar em qualquer empresa que precise
de um artista assim como empresa de jogos e etc. Agora com nosso site ele pode se mostrar ao mundo e ser capaz de
mostrar seu trabalho e ser reconhecido.

 Proposta para Persona Adalberto Soares

(images/persona1.png)

 Requisitos

(images/requisitos.png)

 Requisitos Funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | Permitir que o usuário acesse a rede social e navegue livremente em sua prórpia conta. | ALTA       |
| RF-002 | Conseguir mandar mensagens para amigos pela pela plataforma assim como comentar nas artes. | MÉDIA     |

 Requisitos não Funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA     |
| RNF-002 | Deve processar requisições do usuário em no máximo 3s | BAIXA      |

 Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

 Protótipo Interativo

(https://www.figma.com/design/tIAitWKmroZEe3cb07LlNm/Raphael-Grossi's-team-library?node-id=0-1&t=9A7MVMKtCaBAggpd-1)

 Metodologia

Todos trabalharam construindo seus próprios artefatos e conseguiram harmonizar isso para que o site funcionasse perfeitamente.

 Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| --------------------------- | ---------- | -------------------------------------------------- |
| Processo de Design Thinking | Miro       | https://miro.com/app/board/uXjVKkYSgi4=/ |
| Repositório de código     | GitHub     | https://github.com/ICEI-PUC-Minas-CC-TI/pbh-cc-2024-2-ti1-ti-artes-digitais.git |
| Protótipo Interativo       | MarvelApp  | https://www.figma.com/design/tIAitWKmroZEe3cb07LlNm/Raphael-Grossi's-team-library?node-id=0-1&node-type=canvas&t=acsXNjZqIfqHriAk-0 |
|                             |            |                                                    |


 Vídeo do Projeto

[![Vídeo do projeto](images/video.mp4)](https://youtu.be/QY9w4Jug6VM)

 Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

 Estrutura de Dados - Login/Cadastro

Login/Cadastro

```json
  {
  "usuarios": [
    {
      "id": 1,
      "login": "ceo",
      "senha": "Uryu1973",
      "nome": "uryu",
      "email": "hutao@gmail.com"
    },
    {
      "id": 2,
      "login": "ichigo",
      "senha": "ichigo928",
      "nome": "User Ichigo",
      "email": "bleach@gmail.com"
    },
    {
      "login": "kenpachi",
      "senha": "katana",
      "nome": "Zaraki",
      "email": "konpaku@gmail.com",
      "id": 3
    }
  ]
}
```
