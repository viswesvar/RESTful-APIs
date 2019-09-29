const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

// PORT
const port = process.env.PORT || 3000;

const education = [
    { id: 1, degree: 'BTech - Information Technology', universityName: 'AnnaUniversity', yearOfCompletion: '2015' },
    { id: 2, degree: 'MS - Computer Science', universityName: 'University of Leiria', yearOfCompletion: '2017' }
];

app.get('/', (req, res) => {
    res.send('Hello Welcome to Viswesvar DataBase');
});

app.get('/api/education', (req, res) => {
    res.send(education);
});

app.get('/api/dob', (req, res) => {
    res.send('Birth date: 11th september 1993');
});

app.get('/api/education/:id', (req, res) => {
    const edu = education.find(c => c.id === parseInt(req.params.id));
    if (!edu) res.status(404).send(`The education of the given ID is not found`);
    res.send(edu);
});

app.post('api/education', (req, res) => {
    const schema = {
        degree: Joi.string()
            .min(3)
            .required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    const edu = {
        id: education.length + 1,
        degree: req.body.degree,
        universityName: req.body.universityName
    };
    education.push(edu);
    res.send(edu);
});

app.listen(port, () => console.log(`Listening to port ${port}....`));
