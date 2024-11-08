const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Rota de teste
router.get('/test', (req, res) => {
    res.send('Deu certo');
});

// form da rota de envio

// detaçhe da vaga
router.get('/view/:id', (req, res) => { // Abertura da chave após a definição da função
    Job.findOne({
        where: { id: req.params.id }
    })
    .then(job => {
        res.render('view', {
            job
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// Rota para renderizar o formulário de adição de job
router.get('/add', (req, res) => {
    res.render('add'); // Renderiza a visualização 'add.handlebars'
});

// Rota para adicionar um job via POST
router.post('/add', (req, res) => {
    let { title, salary, company, description, email, new_job } = req.body;

    // Inserir no banco de dados
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => {
        console.log(err);
        res.status(500).send('Ocorreu um erro ao adicionar o trabalho.');
    });
});

// Exemplo de rota GET para listar jobs
router.get('/', (req, res) => {
    Job.findAll()
        .then(jobs => {
            res.render('jobs', { jobs });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Ocorreu um erro ao recuperar os trabalhos.');
        });
});

module.exports = router;