import express from 'express';
import cors from 'cors';

const PORT = 5000;

const app = express(); 
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send('Preencha os dados corretamente!');
    } else {
        res.status(201).send("Ok");
    }
    users.push({ username, avatar});
    console.log(users);
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const userExists = users.find(user => user.username === username);

    if (!userExists)
        return res.send('UNAUTHORIZED');

    tweets.push({ username, tweet });
    res.status(200).send('Ok');
})

app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`));