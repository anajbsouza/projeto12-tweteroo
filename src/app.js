import express from 'express';
import cors from 'cors';

const PORT = 5002;

const app = express(); 
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar || typeof username !== 'string' || typeof avatar !== 'string') {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    res.status(201).send("Ok");
    users.push({ username, avatar});
});

app.post('/tweets', (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;

    
    if (!tweet || typeof tweet !== 'string' || !user || typeof user !== 'string')
        return res.status(400).send('Todos os campos são obrigatórios!');
        
    const userExists = users.find((u) => u.username === user);

    if (!userExists) return res.status(401).send('UNAUTHORIZED');
        
    tweets.push({ username: user, tweet });
    res.status(201).send('Ok');
});

// app.get('/tweets', (req, res) => {
//     const completeInfo = tweets.map((tweet) => {
//         const user = users.find((u) => u.username === tweet.username);
//         if (user) {
//             return {
//                 username: tweet.username,
//                 tweet: tweet.tweet,
//                 avatar: user.avatar
//             }
//         }
//     });
//     if (completeInfo.length > 10) {
//         res.send(completeInfo.slice(-10));
//     }
//     res.send(completeInfo);
// });

//minha versão, abaixo está a da prof mais enxuta

app.get("/tweets", (req, res) => {
    const page = Number(req.query.page);

    if(req.query.page && (isNaN(page) || page < 1)) {
        return res.status(400).send('Informe uma página válida');
    }

    const completeTweets = tweets.map((tweet) => {
        const user = users.find((user) => user.username === tweet.username)
        return { ...tweet, avatar: user.avatar }
    })

    if(page) {
        const limit = 10;
        const start = (page -1) * limit;
        const end = page * limit;

        return res.send(completeTweets.slice(start, end));
    }

    res.send(completeTweets.slice(-10))
})

app.get('/tweets/:username', (req, res) => {
    const { username } = req.params;

    const filteredTweets = tweets
        .filter((tweet) => tweet.username === username)
        .map((tweet) => {
            const user = users.find((user) => user.username === tweet.username)
            return { ...tweet, avatar: user.avatar }
        })
    res.send(filteredTweets);
});

app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`));