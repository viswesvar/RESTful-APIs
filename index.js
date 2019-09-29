const express = require('express');
const app = express();
// PORT
const port = process.env.PORT || 3000;

const education = [
    { id: 1, Degree: 'BTech - Information Technology', universityName: 'AnnaUniversity', yearOfCompletion: '2015' },
    { id: 2, degree: 'MS - Computer Science', universityName: 'University of Leiria', yearOfCompletion: '2017' }
];

app.get('/', (req, res) => {
    res.send('Hello Welcome to Viswesvar DataBase');
});

app.get('/api/education', (req, res) => {
    res.send(education);
});

app.get('/api/education/:id', (req, res) => {
    const edu = education.find(c => c.id === parseInt(req.params.id));
    if (!edu) res.status(404).send(`The education of the given ID is not found`);
    res.send(edu);
});

app.listen(port, () => console.log(`Listening to port ${port}....`));
