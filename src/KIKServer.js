const express = require('express');
const cors = require('cors');
const app = express();
const port = 3214;
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://Aaroophan:AaroophanKIK@keep-it-klear.abhyyeg.mongodb.net/Keep-It-Klear', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(' ************************************************************* Current database:', mongoose.connection.db.databaseName);
})
.catch(err => console.log(err));

let User = mongoose.model('KeepItKlearUser', new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String
}, { collection: 'KIK-User' }));

let Personal = mongoose.model('KeepItKlearPersonal', new mongoose.Schema({
    IntID: Number,
    Username: String,
    IntDate: String,
    IntTime: String,
    Date: String,
    Time: String,
    Action: Boolean,
    Reason: String,
    Amount: Number,
    Balance: Number
}, { collection: 'KIK-Personal' }));

let Shared = mongoose.model('KeepItKlearShared', new mongoose.Schema({
    InteractionID: String,
    AllowedUsers: [String],
    Amount: Number,
    Balance: Number
}, { collection: 'KIK-Shared' }));

app.post('/Server/User/Create', async (req, res) => {
    let newUser = new User(req.body);

    console.log(newUser);

    newUser.save()
    .then(savedUser => {
        console.log("User saved to collection:", savedUser);
        res.status(200).json(savedUser);
    })
    .catch(err => {
        console.error(err);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA "+err);
        res.status(500).json({ error: err.toString() });
    });
});

app.get('/Server/User/Read/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    console.log(CurrentUserName);
    User.findOne({ "Username": CurrentUserName })
    .then(user => {
        if (user) {
            console.log(user);
            console.log("HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHAHAHA USER IS  FOUND");
            res.json(user);
        } else {
            console.log("######################################################### USER NOT FOUND");
            res.json(user);
        }
    })
    .catch(err => {
        let DUMMY = {
            Username: "DUMMY",
            Password: "DUMMY",
            Email: "DUMMY@gmail.com"
        };
        res.json(DUMMY);
        console.log(err);
    });
});

app.put('/Server/UpdateGameProgress/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    let newGameProgress = req.body.GameProgress;
    console.log(newGameProgress);
    User.findOneAndUpdate({ "Username": CurrentUserName }, { GameProgress: newGameProgress }, { new: true })
    .then(user => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! INTERACTION UPDATED");
    })
    .catch(err => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
        console.log(err);
    });
});

app.put('/Server/User/Update/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    let newUsername = req.body.Username;
    let newPassword = req.body.Password;
    let newEmail = req.body.Email;
    console.log(newUsername);
    console.log(newPassword);
    console.log(newEmail);
    User.findOneAndUpdate({ "Username": CurrentUserName }, { Username: newUsername, Password: newPassword, Email: newEmail }, { new: true })
    .then(user => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PROFILE UPDATED");
    })
    .catch(err => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
        console.log(err);
    });
});

app.delete('/Server/User/Delete/:CurrentUserName', async (req, res) => {
    let Name = req.params.CurrentUserName;
    User.findOneAndDelete({ "Username": Name })
        .then(user => {
            if(user) {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! user DELETED");
                res.json({ message: 'user deleted' });
            } else {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            console.log("Error:", err);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
            res.status(500).json({ error: err.toString() });
        });
});

app.post('/Server/Personal/Create', async (req, res) => {
    let newInter = new Personal(req.body);

    console.log(newInter);

    newInter.save()
    .then(savedInter => {
        console.log("Interaction saved to collection:", savedInter);
        res.status(200).json(savedInter);
    })
    .catch(err => {
        console.error(err);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA "+err);
        res.status(500).json({ error: err.toString() });
    });
});

app.get('/Server/Personal/Read/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    console.log(CurrentUserName);
    Personal.find({ "Username": CurrentUserName })
    .then(docs => {
        if (docs) {
            console.log(docs);
            console.log("HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHAHAHA docs IS  FOUND");
            res.json(docs);
        } else {
            console.log("######################################################### docs NOT FOUND");
            res.json(docs);
        }
    })
    .catch(err => {
        console.log(err);
    });
});

app.get('/Test', async (req, res) => {
    res.json({Test:"Test"});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
