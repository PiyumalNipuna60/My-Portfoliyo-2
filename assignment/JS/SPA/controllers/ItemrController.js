/*=====================================================Item----------------------------------------------------------------------*/

// var item = [];
$("#btnItemSave").click(function () {

    let itemCode = $("#inputItemCode").val();
    let itemName = $("#inputItemName").val();
    let itemQty = $("#inputItemQts").val();
    let itemPrice = $("#inputItemPrice").val();

    var itemObject = {
        code: itemCode,
        name: itemName,
        qty: itemQty,
        price: itemPrice
    }

    item.push(itemObject);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item has been saved',
        showConfirmButton: false,
        timer: 1500
    })
    getAllItem();
    loadAllItem();
    clearAllItemTexts();
});


/*------------gel All Customer--------------*/
loadAllItem();
function loadAllItem() {
    $("#tblAllItem").empty();

    for (var items of item) {
        var row = `<tr><td>${items.code}</td><td>${items.name}</td><td>${items.qty}</td><td>${items.price}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblAllItem").append(row);
    }
}

function getAllItem() {
    $("#tblItem").empty();

    for (var items of item) {
        var row = `<tr><td>${items.code}</td><td>${items.name}</td><td>${items.qty}</td><td>${items.price}</td></tr>`;

        $("#tblItem").append(row);
    }
}


/*------------Enter key Js--------------*/

$("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice,#inputItemCode2,#inputItemName2,#inputItemQts2,#inputItemPrice2").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#inputItemCode").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemIDRegEx, $("#inputItemCode"))) {
        $("#inputItemName").focus();
    } else {
        focusText($("#inputItemCode"));
    }
});

$("#inputItemName").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameRegEx, $("#inputItemName"))) {
        focusText($("#inputItemQts"));
    }
});

$("#inputItemQts").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQTYRegEx, $("#inputItemQts"))) {
        focusText($("#inputItemPrice"));
    }
});

$("#inputItemPrice").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemPriceRegEx, $("#inputItemPrice"))) {
        $("#btnItemSave").focus();
        let res = confirm("Do you want to add this Item.?");
        if (res) {
            clearAllItemTexts();
        }
    }
});


/*----------------*/

$("#inputItemCode2").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemIDRegEx2, $("#inputItemCode2"))) {
        $("#inputItemName2").focus();
    } else {
        focusText($("#inputItemCode2"));
    }
});

$("#inputItemName2").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameRegEx2, $("#inputItemName2"))) {
        focusText($("#inputItemQts2"));
    }
});

$("#inputItemQts2").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQTYRegEx2, $("#inputItemQts2"))) {
        focusText($("#inputItemPrice2"));
    }
});

$("#inputItemPrice2").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemPriceRegEx2, $("#inputItemPrice2"))) {
        $("#ItemSaveChange").focus();
        let res = confirm("Do you want to add this Item.?");
        if (res) {
            clearAllTexts();
        }
    }
});



/*--------------------------*/


/*----------search (eliye ekata)------------*/

$("#btnSearchItem").on("click",function () {
    SearchItemFunction();
});

$("#inputCode").on('keyup', function (event) {
    if (event.code == "Enter") {
        SearchItemFunction();
    }
});

function SearchItemFunction(){
    let typedId = $("#inputCode").val();
    let Item = searchItem(typedId);
    if (Item != null) {
        setItemTextfieldValues(Item.code, Item.name, Item.qty, Item.price);
    } else {
        alert("There is no Item available for that " + typedId);
        setItemTextfieldValues("", "", "", "");
    }
}

function setItemTextfieldValues(code, name, qty, price) {
    $("#inputCode").val(code);
    $("#inputItemSerName").val(name);
    $("#inputItemSerPrice").val(price);
}

function searchItem(cusID) {
    for (let items of item) {
        if (items.code == cusID) {
            return items;
        }
    }
    return null;
}

/*----------search (in search ekata)------------*/
$("#btnItemSearch").on("click",function () {
    SearchItemFunction2();
});



function SearchItemFunction2(){
    let typedId = $("#inputItemCode2").val();
    let Item = searchItem(typedId);
    if (Item != null) {
        setItemTextfieldValues2(Item.code, Item.name, Item.qty, Item.price);
    } else {
        alert("There is no Item available for that " + typedId);
        setItemTextfieldValues2("", "", "", "");
    }
}


function setItemTextfieldValues2(code, name, qty, price) {
    $("#inputItemCode2").val(code);
    $("#inputItemName2").val(name);
    $("#inputItemQts2").val(qty);
    $("#inputItemPrice2").val(price);
}

/*-----------Delete Customer----------------*/
$("#btnItemDelete").on("click",function () {
    let deleteID = $("#inputItemCode2").val();

    let option = confirm("Do you really want to delete Item id :" + deleteID);
    if (option){
        if (deleteItem(deleteID)) {
            // alert("Item Successfully Deleted..");
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })

            setItemTextfieldValues2("", "", "", "");
        } else {
            alert("No such Item to delete. please check the id");
        }
    }
});

function deleteItem(ItemID) {
    let Item = searchItem(ItemID);
    if (Item != null) {
        let indexNumber = item.indexOf(Item);
        item.splice(indexNumber, 1);
        getAllItem();
        loadAllItem();
        return true;
    } else {
        return false;
    }
}


/*-----------Update Customer----------------*/

$("#ItemSaveChange").on("click",function () {
    let ItemCode = $("#inputItemCode2").val();
    let response = updateItem(ItemCode);
    if (response) {
        // alert("Item Updated Successfully");
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item has been Updates',
            showConfirmButton: false,
            timer: 1500
        })
        setItemTextfieldValues2("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});

function updateItem(ItemId) {
    let Items = searchItem(ItemId);
    if (Items != null) {
        Items.code = $("#inputItemCode2").val();
        Items.name = $("#inputItemName2").val();
        Items.qty = $("#inputItemQts2").val();
        Items.price = $("#inputItemPrice2").val();
        getAllItem();
        loadAllItem();
        return true;
    } else {
        return false;
    }
}

/*=========validation part================*/

$("#inputItemCode").focus();
$("#inputItemCode2").focus();

// customer reguler expressions
const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemQTYRegEx = /^[0-9]{1,4}$/;
const itemPriceRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;

const itemIDRegEx2 = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx2 = /^[A-z ]{3,20}$/;
const itemQTYRegEx2 = /^[0-9]{1,4}$/;
const itemPriceRegEx2 = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;


let itemValidations = [];
itemValidations.push({reg: itemIDRegEx, field: $('#inputItemCode'),error:'Customer ID Pattern is Wrong : I00-001'});
itemValidations.push({reg: itemNameRegEx, field: $('#inputItemName'),error:'Customer Name Pattern is Wrong : Ex : Soya'});
itemValidations.push({reg: itemQTYRegEx, field: $('#inputItemQts'),error:'Customer Address Pattern is Wrong : Ex : 01'});
itemValidations.push({reg: itemPriceRegEx, field: $('#inputItemPrice'),error:'Customer Contact Pattern is Wrong : 2500'});

itemValidations.push({reg: itemIDRegEx2, field: $('#inputItemCode2'),error:'Customer ID Pattern is Wrong : I00-001'});
itemValidations.push({reg: itemNameRegEx2, field: $('#inputItemName2'),error:'Customer Name Pattern is Wrong : Ex : Soya'});
itemValidations.push({reg: itemQTYRegEx2, field: $('#inputItemQts2'),error:'Customer Address Pattern is Wrong : Ex : 01'});
itemValidations.push({reg: itemPriceRegEx2, field: $('#inputItemPrice2'),error:'Customer Contact Pattern is Wrong : 2500'});


$("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice,#inputItemCode2,#inputItemName2,#inputItemQts2,#inputItemPrice2").on('keyup', function (event) {
    checkItemValidity();
});

$("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice,#inputItemCode2,#inputItemName2,#inputItemQts2,#inputItemPrice2").on('blur', function (event) {
    checkItemValidity();
});

function checkItemValidity() {
    let errorCount = 0;
    for (let validation of itemValidations) {
        if (checkItem(validation.reg, validation.field)) {
            textItemSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setItemTextError(validation.field, validation.error);
        }
    }
    setButtonState(errorCount);
}

function checkItem(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setItemTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
        txtField.parent().children('span').css('font-size','10px');
        txtField.parent().children('span').css('color','red');
    }
}

function textItemSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultItemText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function clearAllItemTexts() {
    $("#inputItemCode").focus();
    $("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice").val("");
    checkValidity();
}
