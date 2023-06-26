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

    if (!username || !avatar || typeof username !== 'string' || typeof avatar !== 'string') {
        return res.status(400).send('Preencha os dados corretamente!');
    }
    
    res.status(201).send("Ok");
    users.push({ username, avatar});
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const userExists = users.find(user => user.username === username);

    if (!userExists) {
        if (typeof tweet !== 'string')
            return res.send('UNAUTHORIZED');
    }
    tweets.push({ username, tweet });
    res.status(201).send('Ok');
});

app.get('/tweets', (req, res) => {
    const completeInfo = tweets.map((tweet) => {
        const user = users.find((u) => u.username === tweet.username);
        if (user) {
            return {
                username: tweet.username,
                tweet: tweet.tweet,
                avatar: user.avatar
            }
        }
    });
    if (completeInfo.length > 10) {
        res.send(completeInfo.slice(-10));
    }
    res.send(completeInfo);
});

app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`));