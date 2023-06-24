import express from 'express';

const PORT = 5005;

const app = express(); 
app.use(express.json());

const users = {};
const tweets = [];

app.post('/sign-up', (req, res) => {
    const newUser = req.body;

    if (!newUser.username && !newUser.avatar) {
        console.log('Preencha os dados corretamente!');
    } else {
        res.send("Ok");
    }

    users.push(newUser);
    res.status(200).send(newUser);
});

app.post('/tweets', (req, res) => {
    const newTweet = req.body;
    if(!newTweet.username)
        res.status(400).send("Não autorizado!");
    else {
        if (!newTweet.username && !newTweet.avatar) {
            console.log('Preencha os dados corretamente!');
        } else {
            tweets.push(newTweet);
            res.send("Ok");
        }
    }
})


app.listen(PORT);