// import { initializeApp, credential as _credential } from "firebase-admin";
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import express, { json } from 'express';

// import serviceAccount from "path/to/serviceAccountKey.json";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());


app.use(cors({
    origin:"*",
}));

app.use(cors({
   methods:["GET","POST","PUT","DELETE","UPDATE","PATCH"],
}));


app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://attendance-go-default-rtdb.firebaseio.com"
});



app.post("/send", function (req, res) {
    const receivedToken = req.body.fcmToken;
    const message = {
        notification: {
            title: "Notification",
            body: "This is a notification"
        },
        token: "ejW6Y1ECT0qcq5wmOKVCpz:APA91bEIszdL-ho1PybyAYTZvYwCvLKRi_sO-kD7XsIVBeIbo14IemB0ARzhP4nS9sHdLY87e8B6CmeMhh4ZET39f4SE8EEjuQYqNCThU8hYdp7DUueEPn7AuicQmxdbp8KPGY2dv1-y"
    }
    getMessaging().send(message).then((response) => {
        res.status(200).json({
            message: "Successfully sent message",
            token: receivedToken
        });
        console.log(`Successfully message sent ${response}`);

    }).catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error: " + error);
    })
});

app.listen(3000, function () {
    console.log("Server is listening on 3000");
});