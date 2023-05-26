/*=====================================================Order----------------------------------------------------------------------*/

// var order = [];
$("#btnOrderAddItem").click(function () {
    let OId=$("#OederOID").val();
    let date=$("#OrderDate").val();

    let customerID = $("#OrderCusID").val();
    let customerName = $("#OrderCusName").val();
    let customerAddress = $("#OrderCusAddress").val();
    let customerSalary = $("#OrderCusSalary").val();

    let orderICode = $("#OrderICode").val();
    let orderName = $("#OrderIName").val();
    let orderQty = $("#OrderIQty").val();
    let orderPrice = $("#OrderIPrice").val();
    let orderOnQty = $("#OrderIOQty").val();

    var orderObject = {

        Oid:OId,
        date:date,

        id: customerID,
        cus_name: customerName,
        address: customerAddress,
        contact: customerSalary,

        ItemCode: orderICode,
        Item_name: orderName,
        qty: orderQty,
        price: orderPrice,
        orderQty: orderOnQty,
        total: (orderPrice * orderOnQty)
    }

    order.push(orderObject);
    console.log(order)
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order has been saved',
        showConfirmButton: false,
        timer: 1500
    })
    getLoadOrder();
    clearAllOrderTexts();
});


/*------------gel All Order--------------*/

function getLoadOrder() {
    $("#orderTable").empty();
    for (var orders of order) {
        console.log(order);

        var row = `<tr><td>${orders.Oid}</td><td>${orders.id}</td><td>${orders.date}</td><td>${orders.ItemCode}</td><td>${orders.Item_name}</td><td>${orders.price}</td><td>${orders.orderQty}</td><td>${orders.total}</td></tr>`;
        $("#orderTable").append(row);
    }
}

/*--------------------------*/



$("#OederOID,#OrderCustomer,#OrderCusName,#OrderDate,#OrderCusID,#OrderCusSalary,#OrderCusAddress").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#OederOID").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderOIDIDRegEx, $("#OederOID"))) {
        $("#OrderCusName").focus();
    } else {
        focusText($("#OederOID"));
    }
});

$("#OrderCusName").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderCusNameRegEx, $("#OrderCusName"))) {
        focusText($("#OrderDate"));
    }
});

$("#OrderDate").on('keydown', function (event) {
    if (event.key == "Enter") {
        focusText($("#OrderCusID"));
    }
});

$("#OrderCusID").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderCusIDRegEx, $("#OrderCusID"))) {
        focusText($("#OrderCusSalary"));
    }
});

$("#OrderCusSalary").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderCusContactRegEx, $("#OrderCusSalary"))) {
        focusText($("#OrderCusAddress"));
    }
});

/* -----------*/

$("#OrderItem,#OrderICode,#OrderIName,#OrderIPrice,#OrderIQty,#OrderIOQty,#btnAddOrder").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#OrderItem").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#OrderICode").focus();
    }
});

$("#OrderICode").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderItemCodeRegEx, $("#OrderICode"))) {
        focusText($("#OrderIName"));
    }
});

$("#OrderIName").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderItemNameRegEx, $("#OrderIName"))) {
        focusText($("#OrderIPrice"));
    }
});

$("#OrderIPrice").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderIPriceRegEx, $("#OrderIPrice"))) {
        focusText($("#OrderIQty"));
    }
});

$("#OrderIQty").on('keydown', function (event) {
    if (event.key == "Enter" && check(orderIQTYRegEx, $("#OrderIQty"))) {
        focusText($("#OrderIOQty"));
    }
});

// $("#OrderIOQty").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderIOQTYRegEx, $("#OrderIOQty"))) {
//         // focusText($("#btnOrderAddItem"));
//     }
// });


$("#OrderIOQty").on('keydown', function (event) {
    let OQty = $("#OrderIOQty").val();
    let OPrice = $("#OrderIPrice").val();
    let OTotal=(OQty*OPrice);

    $('#OrderTotal').val(OTotal);
});


/*----------search ()------------*/
$("#btnSerOrder").on("click",function () {
    SearchOrderFunction2();
});

function SearchOrderFunction2(){
    let typedId = $("#OederOID").val();
    let order = searchOrder(typedId);
    if (order != null) {
        setTextfieldValuesOrder(order.Oid, order.date, order.id, order.cus_name,order.address,order.contact,order.ItemCode,order.Item_name,order.qty,order.price,order.orderQty,order.total);
    } else {
        alert("There is no Order available for that " + typedId);
        setTextfieldValuesOrder("", "", "", "");
    }
}

function setTextfieldValuesOrder(Oid, date, id, cus_name,address,contact,ItemCode,Item_name,qty,price,orderQty,total) {
    $("#OederOID").val(Oid);
    $("#OrderDate").val(date);
    $("#OrderCusID").val(id);
    $("#OrderCusName").val(cus_name);
    $("#OrderCusAddress").val(address);
    $("#OrderCusSalary").val(contact);
    $("#OrderICode").val(ItemCode);
    $("#OrderIName").val(Item_name);
    $("#OrderIQty").val(qty);
    $("#OrderIPrice").val(price);
    $("#OrderIOQty").val(orderQty);
    $("#OrderTotal").val(total);
}


function searchOrder(cusID) {
    for (let orders of order) {
        if (orders.Oid == cusID) {
            return orders;
        }
    }
    return null;
}

/*---------------------*/
function clearAllOrderTexts() {
    $("#OederOID").focus();
    $("#OederOID,#OrderDate,#OrderCusID,#OrderCusName,#OrderCusAddress,#OrderCusSalary,#OrderICode,#OrderIName,#OrderIQty,#OrderIPrice,#OrderIOQty,#OrderTotal,#OrderTotal,#OrderSubTotal,#OrderCash,#OrderDiscount,#OrderBalance").val("");
    checkValidity();
}

/*-----------Delete Order----------------*/
$("#btnPurchase").on("click", function () {
    let deleteID = $("#OederOID").val();

    let option = confirm("Do you really want to delete Order id :" + deleteID);
    if (option) {
        if (deleteOrder(deleteID)) {
            // alert("Order Successfully Deleted..");
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
            setTextfieldValuesOrder("", "", "", "");
        } else {
            alert("No such Order to delete. please check the id");
        }
    }
    console.log("hy")
});

function deleteOrder(OrderID) {
    let orders = searchOrder(OrderID);
    if (orders != null) {
        let indexNumber = order.indexOf(orders);
        order.splice(indexNumber, 1);
        getLoadOrder();
        clearAllOrderTexts();
        return true;
    } else {
        return false;
    }
}


/*=========validation part================*/

$("#OederOID").focus();

// customer reguler expressions
const orderOIDIDRegEx = /^(O00-)[0-9]{1,3}$/;

const orderCusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const orderCusNameRegEx = /^[A-z ]{3,20}$/;
const orderCusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const orderCusContactRegEx = /^[0-9]{10}[.]?[0-9]{1,2}$/;

const orderItemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
const orderItemNameRegEx = /^[A-z ]{3,20}$/;
const orderIQTYRegEx = /^[0-9]{1,4}$/;
const orderIPriceRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
const orderIOQTYRegEx = /^[0-9]{1,4}$/;
const orderTotalRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;

const orderSubTotalRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
const orderCashRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
const orderDiscountRegEx = /^[0-9]{1,2}$/;
const orderBalanceRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;



let orderValidations = [];
orderValidations.push({reg: orderOIDIDRegEx, field: $('#OederOID'),error:'Order ID Pattern is Wrong : O00-001'});
orderValidations.push({reg: orderCusIDRegEx, field: $('#OrderCusID'),error:'Customer ID Pattern is Wrong : C00-001'});
orderValidations.push({reg: orderCusNameRegEx, field: $('#OrderCusName'),error:'Customer Name Pattern is Wrong : Ex : Nipuna'});
orderValidations.push({reg: orderCusAddressRegEx, field: $('#OrderCusAddress'),error:'Customer Address Pattern is Wrong : Ex : Galle 01'});
orderValidations.push({reg: orderCusContactRegEx, field: $('#OrderCusSalary'),error:'Customer Contact Pattern is Wrong : 0782545156'});
orderValidations.push({reg: orderItemCodeRegEx, field: $('#OrderICode'),error:'Order ItemCode Pattern is Wrong : I00-001'});
orderValidations.push({reg: orderItemNameRegEx, field: $('#OrderIName'),error:'Order Item Name  is Wrong : Ex : Soya'});
orderValidations.push({reg: orderIQTYRegEx, field: $('#OrderIQty'),error:'Order Item Qty is Wrong : Ex : 01'});
orderValidations.push({reg: orderIPriceRegEx, field: $('#OrderIPrice'),error:'Order Item Price is Wrong : Ex : 1000'});
orderValidations.push({reg: orderIOQTYRegEx, field: $('#OrderIOQty'),error:'Order Item Qty is Wrong : Ex : 01'});
orderValidations.push({reg: orderTotalRegEx, field: $('#OrderTotal'),error:'Order Item Price is Wrong : Ex : 1000'});
orderValidations.push({reg: orderSubTotalRegEx, field: $('#OrderSubTotal'),error:'Order Item Price is Wrong : Ex : 1000'});

orderValidations.push({reg: orderCashRegEx, field: $('#OrderCash'),error:'Order Item Price is Wrong : Ex : 1000'});
orderValidations.push({reg: orderDiscountRegEx, field: $('#OrderDiscount'),error:'Order Item Price is Wrong : Ex : 1000'});
orderValidations.push({reg: orderBalanceRegEx, field: $('#OrderBalance'),error:'Order Item Price is Wrong : Ex : 1000'});




$("#OederOID,#OrderDate,#OrderCusID,#OrderCusName,#OrderCusAddress,#OrderCusSalary,#OrderICode,#OrderIName,#OrderIQty,#OrderIPrice,#OrderIOQty,#OrderTotal,#OrderTotal,#OrderSubTotal,#OrderCash,#OrderDiscount,#OrderBalance").on('keyup', function (event) {
    checkOrderValidity();
});

$("#OederOID,#OrderDate,#OrderCusID,#OrderCusName,#OrderCusAddress,#OrderCusSalary,#OrderICode,#OrderIName,#OrderIQty,#OrderIPrice,#OrderIOQty,#OrderTotal,#OrderTotal,#OrderSubTotal,#OrderCash,#OrderDiscount,#OrderBalance").on('blur', function (event) {
    checkOrderValidity();
});

function checkOrderValidity() {
    let errorCount = 0;
    for (let validation of orderValidations) {
        if (checkOrder(validation.reg, validation.field)) {
            textOrderSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setOrderTextError(validation.field, validation.error);
        }
    }
}

function checkOrder(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setOrderTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultOrderText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
        txtField.parent().children('span').css('font-size', '10px');
        txtField.parent().children('span').css('color', 'red');
    }
}

function textOrderSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultOrderText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultOrderText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

$("#btnCalculate").on("click", function () {
    let total = $("#OrderTotal").val();
    let discount = $("#OrderDiscount").val();
    let cash=$("#OrderCash").val();
    let subTotal=total-((total/100)*discount);
    let balance=(cash-subTotal);
    $('#OrderSubTotal').val(subTotal);
    $('#OrderBalance').val(balance);
});
