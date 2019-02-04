$(function () {
    var flag = true;
    $('.switch-button').on('click', function (e) {
        e.preventDefault();

        $('input').val('');
        $('p.error').remove();
        $('input').removeClass('error');

        if(flag) {
            flag = false;
            $('.registration').show('slow');
            $('.login').hide();
        } else {
            flag = true;
            $('.registration').hide();
            $('.login').show('slow');
        }
    });
    $('input').on('focus', function () {
        $('p.error').remove();
        $('input').removeClass('error');
        $('p.success').remove();
        $('input').removeClass('success');
    });
    $('.register-button').on('click', function (e) {
        e.preventDefault();
        $('p.error').remove();
        $('input').removeClass('error');

        var data = {
            login: $('#register-login').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val(),
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'api/auth/register'
        }).done(function(data) {
            if (!data.ok) {
                $('.registration h2').after('<p class="error">'.concat(data.error).concat('</p>'))
            }
            if (data.fields) {
                data.fields.forEach(function (item) {
                    $('input[name='.concat(item).concat(']')).addClass('error');
                })
            } else {
                $('.registration h2').after('<p class="success">Отлично!</p>');
            }
        })
    });
    $('.login-button').on('click', function (e) {
        e.preventDefault();
        $('p.error').remove();
        $('input').removeClass('error');

        var data = {
            login: $('#login-login').val(),
            password: $('#login-password').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'api/auth/login'
        }).done(function(data) {
            if (!data.ok) {
                $('.login h2').after('<p class="error">'.concat(data.error).concat('</p>'))
            }
            if (data.fields) {
                data.fields.forEach(function (item) {
                    $('input[name='.concat(item).concat(']')).addClass('error');
                })
            } else {
               // $('.login  h2').after('<p class="success">Отлично!</p>');
                location.reload();
            }
        })

    });
});
