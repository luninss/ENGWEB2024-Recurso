### Tratar dataset
Em principio foi adicionado uma \] para fechar o json array.

Depois foi criado um ficheiro python, treat.py, que pega no dataset original e transforma no que foi utilizado, as transformações que o ficheiro python faz são as seguintes:
-No campo author, cada author é seperado por virgulas, logo criamos uma lista de Strings para armanezar todos os autores de um livro, e remove-se o que está entre parenteses, como (illustrator);
-Todos os campos que estão a ser represetandos como string em vez de uma lista de strings são corrigidos.

Apesar de o bookId ser um número concatenado com o titulo do livro, como:
 -"bookId": "2767052-the-hunger-games",
Não achei a necessidade, de alterar isto ao tratar os dados para ser só o numero, uma vez que verifiquei se havia repetições de bookId's no mongodb, e não havia.
Comando utilizado:
``
db.livros.aggregate([
  { $group: { _id: "$bookId", count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
])
``
### ID para livros e autores
Na rota GET /books/:id da API de dados, o id utilizado é o campo bookId fornecido no json.
O ID utilizado para os autores foi o próprio nome.

### Tratar Dados
python3 treat.py

### Importar dados
mongoimport --db livros --collection livros --type json --file dataset_tratado.json --jsonArray

### Executar API
cd ex1
npm i
npm install

### Executar Front End
cd ex2
npm i
npm install
