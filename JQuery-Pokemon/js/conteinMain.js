$(document).ready(function () {
    myfunction();
});

function myfunction() {
    $("#alertMsj").click(function () {
        $("#tableMiembros").slideToggle();
    });
}