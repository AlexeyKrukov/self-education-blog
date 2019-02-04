const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');

router.post('/register', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if (!login || !password || !passwordConfirm) {
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены',
            fields: ['login', 'password', 'passwordConfirm']
        });
    } else if (login.length < 3 || login.length > 16) {
        res.json({
            ok: false,
            error: 'Длина логина от 3 до 16 символов!',
            fields: ['login']
        });
    } else if (password !== passwordConfirm) {
        res.json({
            ok: false,
            error: 'Пароли не совпадают',
            fields: ['password', 'passwordConfirm']
        })
    } else {
        models.User.findOne({
            login
        }).then(user => {
            if(user) {
                res.json({
                    ok: false,
                    error: 'Имя занято',
                    fields: ['login']
                })
            }
        });
        bcrypt.hash(password, null, null, (err, hash) => {
            models.User.create({
                login,
                password: hash
            }).then(user => {
                console.log(user);
                res.json({
                    ok: true
                })
            })
        });
    }
});

module.exports = router;