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
        users.push(newUser);
        res.status(201).send("Ok");
    }
});

app.post('/tweets', (req, res) => {
    const { tweet } = req.body;
    const userExists = users.some(user => user.username === username);

    if(!username || !tweet)
        return res.status(400).send('Preencha os dados corretamente!');

    if (!userExists) {
        return res.status(401).send('Não autorizado!');
    }

    tweets.push(tweet);
    res.status(200).send('Ok');
})

app.get('/tweets', (req, res) => {
    
})

app.listen(PORT);