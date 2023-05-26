$(document).ready(function () {
    /* js Display */
    $("#Home").css("display", "block");
    $("#Customer").css("display", "none");
    $("#Item").css("display", "none");
    $("#Order").css("display", "none");

    /* js Add Style */
    $("#aHome").css("color", "red");
    $("#aCustomer").css("color", "white");
    $("#aItem").css("color", "white");
    $("#aOrder").css("color", "white");
});




$("#lstHome").click(function () {
    /* js Display */
    $("#Home").css("display", "block");
    $("#Customer").css("display", "none");
    $("#Item").css("display", "none");
    $("#Order").css("display", "none");

    /* js Add Style */
    $("#aHome").css("color", "red");
    $("#aCustomer").css("color", "white");
    $("#aItem").css("color", "white");
    $("#aOrder").css("color", "white");
});


$("#lstCustomer").click(function () {
    /* js Display */
    $("#Home").css("display", "none");
    $("#Customer").css("display", "block");
    $("#Item").css("display", "none");
    $("#Order").css("display", "none");

    /* js Add Style */
    $("#aHome").css("color", "white");
    $("#aCustomer").css("color", "red");
    $("#aItem").css("color", "white");
    $("#aOrder").css("color", "white");
});


$("#lstItem").click(function () {
    /* js Display */
    $("#Home").css("display", "none");
    $("#Customer").css("display", "none");
    $("#Item").css("display", "block");
    $("#Order").css("display", "none");

    /* js Add Style */
    $("#aHome").css("color", "white");
    $("#aCustomer").css("color", "white");
    $("#aItem").css("color", "red");
    $("#aOrder").css("color", "white");
});


$("#lstOrder").click(function () {
    /* js Display */
    $("#Home").css("display", "none");
    $("#Customer").css("display", "none");
    $("#Item").css("display", "none");
    $("#Order").css("display", "block");

    /* js Add Style */
    $("#aHome").css("color", "white");
    $("#aCustomer").css("color", "white");
    $("#aItem").css("color", "white");
    $("#aOrder").css("color", "red");
});