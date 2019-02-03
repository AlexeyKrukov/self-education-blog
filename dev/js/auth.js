$(function () {
    var flag = true;
    $('.switch-button').on('click', function (e) {
        e.preventDefault();

        if(flag) {
            flag = false;
            $('.registration').show('slow');
            $('.login').hide();
        } else {
            flag = true;
            $('.registration').hide();
            $('.login').show('slow');
        }
    })
});
