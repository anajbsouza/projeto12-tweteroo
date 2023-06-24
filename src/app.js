import express from 'express';
import cors from 'cors';

const PORT = 5005;

const app = express(); 
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const newUser = req.body;

    if (!newUser.username || !newUser.avatar) {
        res.status(400).send('Preencha os dados corretamente!');
    } else {
        users.push(newUser);
        res.status(200).send("Ok");
    }
});

app.post('/tweets', (req, res) => {
    const newTweet = req.body;
    
    if(!newTweet.username || !newTweet.tweet)
        return res.status(400).send('Preencha os dados corretamente!');

    const userExists = users.some(user => user.username === newTweet.username);

    if (!userExists) {
        return res.status(401).send('Não autorizado!');
    }

    tweets.push(newTweet);
    res.status(200).send('Ok');
})


app.listen(PORT);