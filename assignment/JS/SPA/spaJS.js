// /*=============customer---------------*/
//
// var customer = [];
// $("#btnSave").click(function () {
//
//
//     let customerID = $("#inputCusId").val();
//     let customerName = $("#inputCusName").val();
//     let customerAddress = $("#inputCusAddress").val();
//     let customerContact = $("#inputCusContact").val();
//
//     var customerObject = {
//         id: customerID,
//         name: customerName,
//         address: customerAddress,
//         contact: customerContact
//     }
//     customer.push(customerObject);
//     console.log(customer);
//     getAllCustomer();
//     loadAllCustomers();
//     clearAllTexts();
// });
//
// /*    getPreviousCustomersFromTable();
//     function getPreviousCustomersFromTable() {
//         // tabel customer
//
//         var customerObject2 = {
//
//             id: $(this).children(":eq(0)").text(),
//             name: $(this).children(":eq(1)").text(),
//             address: $(this).children(":eq(2)").text(),
//             contact: $(this).children(":eq(3)").text()
//         }
//
//         console.log(customerObject2)
//         customer.push()
//     }*/
//
// /*------------gel All Customer--------------*/
// loadAllCustomers();
// function loadAllCustomers() {
//     $("#tblAllCustomer2").empty();
//
//     for (var customers of customer) {
//         var row = `<tr><td>${customers.id}</td><td>${customers.name}</td><td>${customers.address}</td><td>${customers.contact}</td></tr>`;
//
//         //then add it to the table body of customer table
//         $("#tblAllCustomer2").append(row);
//     }
// }
//
// function getAllCustomer() {
//     $("#tblCustomer").empty();
//
//     for (var customers of customer) {
//         console.log(customers);
//
//         var row = `<tr><td>${customers.id}</td><td>${customers.name}</td><td>${customers.address}</td><td>${customers.contact}</td></tr>`;
//
//         $("#tblCustomer").append(row);
//     }
// }
// /*--------------------------*/
//
//
// $("#inputCusId,#inputCusName,#inputCusAddress,#inputCusContact,#inputCusId2,#inputCusName2,#inputCusAddress2,#inputCusContact2").on('keydown', function (event) {
//     if (event.key == "Tab") {
//         event.preventDefault();
//     }
// });
//
//
// $("#inputCusId").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusIDRegEx, $("#inputCusId"))) {
//         $("#inputCusName").focus();
//     } else {
//         focusText($("#inputCusId"));
//     }
// });
//
//
// $("#inputCusName").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusNameRegEx, $("#inputCusName"))) {
//         focusText($("#inputCusAddress"));
//     }
// });
//
//
// $("#inputCusAddress").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusAddressRegEx, $("#inputCusAddress"))) {
//         focusText($("#inputCusContact"));
//     }
// });
//
//
// $("#inputCusContact").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusSalaryRegEx, $("#inputCusContact"))) {
//         $("#btnSave").focus();
//         let res = confirm("Do you want to add this customer.?");
//         if (res) {
//             clearAllTexts();
//         }
//     }
// });
//
// /*--------------------*/
//
// $("#inputCusId2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusIDRegEx, $("#inputCusId2"))) {
//         $("#inputCusName2").focus();
//     } else {
//         focusText($("#inputCusId2"));
//     }
// });
//
//
// $("#inputCusName2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusNameRegEx, $("#inputCusName2"))) {
//         focusText($("#inputCusAddress2"));
//     }
// });
//
//
// $("#inputCusAddress2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusAddressRegEx, $("#inputCusAddress"))) {
//         focusText($("#inputCusContact"));
//     }
// });
//
//
// $("#inputCusContact2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusSalaryRegEx, $("#inputCusContact2"))) {
//         $("#btnSave2").focus();
//         let res = confirm("Do you want to add this customer.?");
//         if (res) {
//             clearAllTexts();
//         }
//     }
// });
//
//
//
// /*----------search (eliye ekata)------------*/
//
// $("#btnSearchCus").on("click",function () {
//     SearchCusFunction();
// });
//
// $("#inputSerIdCus").on('keyup', function (event) {
//     if (event.code == "Enter") {
//         SearchCusFunction();
//     }
// });
//
//
// function SearchCusFunction(){
//     let typedId = $("#inputSerIdCus").val();
//     let customer = searchCustomer(typedId);
//     if (customer != null) {
//         setTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
//     } else {
//         alert("There is no cusotmer available for that " + typedId);
//         setTextfieldValues("", "", "", "");
//     }
// }
//
// function setTextfieldValues(id, name, address, contact) {
//     $("#inputSerIdCus").val(id);
//     $("#inputSerNameCus").val(name);
//     $("#inputSerContactCus").val(contact);
// }
//
//
// /*----------search (in search ekata)------------*/
// $("#btnSearch2").on("click",function () {
//     SearchCusFunction2();
// });
//
//
//
// function SearchCusFunction2(){
//     let typedId = $("#inputCusId2").val();
//     let customer = searchCustomer(typedId);
//     if (customer != null) {
//         setTextfieldValues2(customer.id, customer.name, customer.address, customer.contact);
//     } else {
//         alert("There is no cusotmer available for that " + typedId);
//         setTextfieldValues2("", "", "", "");
//     }
// }
//
//
// function setTextfieldValues2(id, name, address, contact) {
//     $("#inputCusId2").val(id);
//     $("#inputCusName2").val(name);
//     $("#inputCusAddress2").val(address);
//     $("#inputCusContact2").val(contact);
// }
//
//
// function searchCustomer(cusID) {
//     for (let customers of customer) {
//         if (customers.id == cusID) {
//             return customers;
//         }
//     }
//     return null;
// }
//
//
// /*-----------Delete Customer----------------*/
// $("#btnDelete2").on("click",function () {
//     let deleteID = $("#inputCusId2").val();
//
//     let option = confirm("Do you really want to delete customer id :" + deleteID);
//     if (option){
//         if (deleteCustomer(deleteID)) {
//             alert("Customer Successfully Deleted..");
//             setTextfieldValues2("", "", "", "");
//         } else {
//             alert("No such customer to delete. please check the id");
//         }
//     }
// });
//
// function deleteCustomer(customerID) {
//     let customers = searchCustomer(customerID);
//     if (customers != null) {
//         let indexNumber = customer.indexOf(customers);
//         customer.splice(indexNumber, 1);
//         getAllCustomer();
//         loadAllCustomers();
//         return true;
//     } else {
//         return false;
//     }
// }
//
// $("#btnModify2").on("click",function () {
//     let customerID = $("#inputCusId2").val();
//     let response = updateCustomer(customerID);
//     if (response) {
//         alert("Customer Updated Successfully");
//         setTextfieldValues2("", "", "", "");
//     } else {
//         alert("Update Failed..!");
//
//     }
// });
//
// function updateCustomer(customerID) {
//     let customer = searchCustomer(customerID);
//     if (customer != null) {
//         customer.id = $("#inputCusId2").val();
//         customer.name = $("#inputCusName2").val();
//         customer.address = $("#inputCusAddress2").val();
//         customer.salary = $("#inputCusContact2").val();
//         getAllCustomer();
//         loadAllCustomers();
//         return true;
//     } else {
//         return false;
//     }
//
// }
//
// // btnDelete2
//
//
//
// /*=========validation part================*/
//
// $("#inputCusId").focus();
// $("#inputCusId2").focus();
//
// // customer reguler expressions
// const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
// const cusNameRegEx = /^[A-z ]{5,20}$/;
// const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
// const cusContactRegEx = /^[0-9]{10}[.]?[0-9]{1,2}$/;
//
// const cusIDRegEx2 = /^(C00-)[0-9]{1,3}$/;
// const cusNameRegEx2 = /^[A-z ]{5,20}$/;
// const cusAddressRegEx2 = /^[0-9/A-z. ,]{7,}$/;
// const cusContactRegEx2 = /^[0-9]{10}$/;
//
// let customerValidations = [];
// customerValidations.push({reg: cusIDRegEx, field: $('#inputCusId'),error:'Customer ID Pattern is Wrong : C00-001'});
// customerValidations.push({reg: cusNameRegEx, field: $('#inputCusName'),error:'Customer Name Pattern is Wrong : Ex : Nipuna'});
// customerValidations.push({reg: cusAddressRegEx, field: $('#inputCusAddress'),error:'Customer Address Pattern is Wrong : Ex : Galle 01'});
// customerValidations.push({reg: cusContactRegEx, field: $('#inputCusContact'),error:'Customer Contact Pattern is Wrong : 0782545156'});
//
// customerValidations.push({reg: cusIDRegEx2, field: $('#inputCusId2'),error:'Customer ID Pattern is Wrong : C00-001'});
// customerValidations.push({reg: cusNameRegEx2, field: $('#inputCusName2'),error:'Customer Name Pattern is Wrong : Ex : Nipuna'});
// customerValidations.push({reg: cusAddressRegEx2, field: $('#inputCusAddress2'),error:'Customer Address Pattern is Wrong : Ex : Galle 01'});
// customerValidations.push({reg: cusContactRegEx2, field: $('#inputCusContact2'),error:'Customer Contact Pattern is Wrong : 0782545156'});
//
//
// $("#inputCusId,#inputCusName,#inputCusAddress,#inputCusContact,#inputCusId2,#inputCusName2,#inputCusAddress2,#inputCusContact2").on('keyup', function (event) {
//     checkValidity();
// });
//
// $("#inputCusId,#inputCusName,#inputCusAddress,#inputCusContact,#inputCusId2,#inputCusName2,#inputCusAddress2,#inputCusContact2").on('blur', function (event) {
//     checkValidity();
// });
//
// function checkValidity() {
//     let errorCount=0;
//     for (let validation of customerValidations) {
//         if (check(validation.reg,validation.field)) {
//             textSuccess(validation.field,"");
//         } else {
//             errorCount=errorCount+1;
//             setTextError(validation.field,validation.error);
//         }
//     }
//     setButtonState(errorCount);
//
// }
//
// function check(regex, txtField) {
//     let inputValue = txtField.val();
//     return regex.test(inputValue) ? true : false;
// }
//
// function setTextError(txtField,error) {
//     if (txtField.val().length <= 0) {
//         defaultText(txtField,"");
//     } else {
//         txtField.css('border', '2px solid red');
//         txtField.parent().children('span').text(error);
//         txtField.parent().children('span').css('font-size','10px');
//         txtField.parent().children('span').css('color','red');
//     }
// }
//
// function textSuccess(txtField,error) {
//     if (txtField.val().length <= 0) {
//         defaultText(txtField,"");
//     } else {
//         txtField.css('border', '2px solid green');
//         txtField.parent().children('span').text(error);
//     }
// }
//
// function defaultText(txtField,error) {
//     txtField.css("border", "1px solid #ced4da");
//     txtField.parent().children('span').text(error);
// }
//
// function focusText(txtField) {
//     txtField.focus();
// }
//
//
// function clearAllTexts() {
//     $("#inputCusId").focus();
//     $("#inputCusId,#inputCusName,#inputCusAddress,#inputCusContact").val("");
//     checkValidity();
// }










// /*=====================================================Item----------------------------------------------------------------------*/
//
// var item = [];
// $("#btnItemSave").click(function () {
//
//     let itemCode = $("#inputItemCode").val();
//     let itemName = $("#inputItemName").val();
//     let itemQty = $("#inputItemQts").val();
//     let itemPrice = $("#inputItemPrice").val();
//
//     var itemObject = {
//         code: itemCode,
//         name: itemName,
//         qty: itemQty,
//         price: itemPrice
//     }
//
//     item.push(itemObject);
//     getAllItem();
//     loadAllItem();
//     clearAllItemTexts();
// });
//
//
// /*------------gel All Customer--------------*/
// loadAllItem();
// function loadAllItem() {
//     $("#tblAllItem").empty();
//
//     for (var items of item) {
//         var row = `<tr><td>${items.code}</td><td>${items.name}</td><td>${items.qty}</td><td>${items.price}</td></tr>`;
//
//         //then add it to the table body of customer table
//         $("#tblAllItem").append(row);
//     }
// }
//
// function getAllItem() {
//     $("#tblItem").empty();
//
//     for (var items of item) {
//         var row = `<tr><td>${items.code}</td><td>${items.name}</td><td>${items.qty}</td><td>${items.price}</td></tr>`;
//
//         $("#tblItem").append(row);
//     }
// }
//
//
// /*------------Enter key Js--------------*/
//
// $("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice,#inputItemCode2,#inputItemName2,#inputItemQts2,#inputItemPrice2").on('keydown', function (event) {
//     if (event.key == "Tab") {
//         event.preventDefault();
//     }
// });
//
//
// $("#inputItemCode").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemIDRegEx, $("#inputItemCode"))) {
//         $("#inputItemName").focus();
//     } else {
//         focusText($("#inputItemCode"));
//     }
// });
//
// $("#inputItemName").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemNameRegEx, $("#inputItemName"))) {
//         focusText($("#inputItemQts"));
//     }
// });
//
// $("#inputItemQts").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemQTYRegEx, $("#inputItemQts"))) {
//         focusText($("#inputItemPrice"));
//     }
// });
//
// $("#inputItemPrice").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemPriceRegEx, $("#inputItemPrice"))) {
//         $("#btnItemSave").focus();
//         let res = confirm("Do you want to add this Item.?");
//         if (res) {
//             clearAllItemTexts();
//         }
//     }
// });
//
//
// /*----------------*/
//
// $("#inputItemCode2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemIDRegEx2, $("#inputItemCode2"))) {
//         $("#inputItemName2").focus();
//     } else {
//         focusText($("#inputItemCode2"));
//     }
// });
//
// $("#inputItemName2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemNameRegEx2, $("#inputItemName2"))) {
//         focusText($("#inputItemQts2"));
//     }
// });
//
// $("#inputItemQts2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemQTYRegEx2, $("#inputItemQts2"))) {
//         focusText($("#inputItemPrice2"));
//     }
// });
//
// $("#inputItemPrice2").on('keydown', function (event) {
//     if (event.key == "Enter" && check(itemPriceRegEx2, $("#inputItemPrice2"))) {
//         $("#ItemSaveChange").focus();
//         let res = confirm("Do you want to add this Item.?");
//         if (res) {
//             clearAllTexts();
//         }
//     }
// });
//
//
//
// /*--------------------------*/
//
//
// /*----------search (eliye ekata)------------*/
//
// $("#btnSearchItem").on("click",function () {
//     SearchItemFunction();
// });
//
// $("#inputCode").on('keyup', function (event) {
//     if (event.code == "Enter") {
//         SearchItemFunction();
//     }
// });
//
// function SearchItemFunction(){
//     let typedId = $("#inputCode").val();
//     let Item = searchItem(typedId);
//     if (Item != null) {
//         setItemTextfieldValues(Item.code, Item.name, Item.qty, Item.price);
//     } else {
//         alert("There is no Item available for that " + typedId);
//         setItemTextfieldValues("", "", "", "");
//     }
// }
//
// function setItemTextfieldValues(code, name, qty, price) {
//     $("#inputCode").val(code);
//     $("#inputItemSerName").val(name);
//     $("#inputItemSerPrice").val(price);
// }
//
// function searchItem(cusID) {
//     for (let items of item) {
//         if (items.code == cusID) {
//             return items;
//         }
//     }
//     return null;
// }
//
// /*----------search (in search ekata)------------*/
// $("#btnItemSearch").on("click",function () {
//     SearchItemFunction2();
// });
//
//
//
// function SearchItemFunction2(){
//     let typedId = $("#inputItemCode2").val();
//     let Item = searchItem(typedId);
//     if (Item != null) {
//         setItemTextfieldValues2(Item.code, Item.name, Item.qty, Item.price);
//     } else {
//         alert("There is no Item available for that " + typedId);
//         setItemTextfieldValues2("", "", "", "");
//     }
// }
//
//
// function setItemTextfieldValues2(code, name, qty, price) {
//     $("#inputItemCode2").val(code);
//     $("#inputItemName2").val(name);
//     $("#inputItemQts2").val(qty);
//     $("#inputItemPrice2").val(price);
// }
//
// /*-----------Delete Customer----------------*/
// $("#btnItemDelete").on("click",function () {
//     let deleteID = $("#inputItemCode2").val();
//
//     let option = confirm("Do you really want to delete Item id :" + deleteID);
//     if (option){
//         if (deleteItem(deleteID)) {
//             alert("Item Successfully Deleted..");
//             setItemTextfieldValues2("", "", "", "");
//         } else {
//             alert("No such Item to delete. please check the id");
//         }
//     }
// });
//
// function deleteItem(ItemID) {
//     let Item = searchItem(ItemID);
//     if (Item != null) {
//         let indexNumber = item.indexOf(Item);
//         item.splice(indexNumber, 1);
//         getAllItem();
//         loadAllItem();
//         return true;
//     } else {
//         return false;
//     }
// }
//
//
// /*-----------Update Customer----------------*/
//
// $("#ItemSaveChange").on("click",function () {
//     let ItemCode = $("#inputItemCode2").val();
//     let response = updateItem(ItemCode);
//     if (response) {
//         alert("Item Updated Successfully");
//         setItemTextfieldValues2("", "", "", "");
//     } else {
//         alert("Update Failed..!");
//
//     }
// });
//
// function updateItem(ItemId) {
//     let Items = searchItem(ItemId);
//     if (Items != null) {
//         Items.code = $("#inputItemCode2").val();
//         Items.name = $("#inputItemName2").val();
//         Items.qty = $("#inputItemQts2").val();
//         Items.price = $("#inputItemPrice2").val();
//         getAllItem();
//         loadAllItem();
//         return true;
//     } else {
//         return false;
//     }
// }
//
// /*=========validation part================*/
//
// $("#inputItemCode").focus();
// $("#inputItemCode2").focus();
//
// // customer reguler expressions
// const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
// const itemNameRegEx = /^[A-z ]{3,20}$/;
// const itemQTYRegEx = /^[0-9]{1,4}$/;
// const itemPriceRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
//
// const itemIDRegEx2 = /^(I00-)[0-9]{1,3}$/;
// const itemNameRegEx2 = /^[A-z ]{3,20}$/;
// const itemQTYRegEx2 = /^[0-9]{1,4}$/;
// const itemPriceRegEx2 = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
//
//
// let itemValidations = [];
// itemValidations.push({reg: itemIDRegEx, field: $('#inputItemCode'),error:'Customer ID Pattern is Wrong : I00-001'});
// itemValidations.push({reg: itemNameRegEx, field: $('#inputItemName'),error:'Customer Name Pattern is Wrong : Ex : Soya'});
// itemValidations.push({reg: itemQTYRegEx, field: $('#inputItemQts'),error:'Customer Address Pattern is Wrong : Ex : 01'});
// itemValidations.push({reg: itemPriceRegEx, field: $('#inputItemPrice'),error:'Customer Contact Pattern is Wrong : 2500'});
//
// itemValidations.push({reg: itemIDRegEx2, field: $('#inputItemCode2'),error:'Customer ID Pattern is Wrong : I00-001'});
// itemValidations.push({reg: itemNameRegEx2, field: $('#inputItemName2'),error:'Customer Name Pattern is Wrong : Ex : Soya'});
// itemValidations.push({reg: itemQTYRegEx2, field: $('#inputItemQts2'),error:'Customer Address Pattern is Wrong : Ex : 01'});
// itemValidations.push({reg: itemPriceRegEx2, field: $('#inputItemPrice2'),error:'Customer Contact Pattern is Wrong : 2500'});
//
//
// $("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice,#inputItemCode2,#inputItemName2,#inputItemQts2,#inputItemPrice2").on('keyup', function (event) {
//     checkItemValidity();
// });
//
// $("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice,#inputItemCode2,#inputItemName2,#inputItemQts2,#inputItemPrice2").on('blur', function (event) {
//     checkItemValidity();
// });
//
// function checkItemValidity() {
//     let errorCount = 0;
//     for (let validation of itemValidations) {
//         if (checkItem(validation.reg, validation.field)) {
//             textItemSuccess(validation.field, "");
//         } else {
//             errorCount = errorCount + 1;
//             setItemTextError(validation.field, validation.error);
//         }
//     }
//     setButtonState(errorCount);
// }
//
// function checkItem(regex, txtField) {
//     let inputValue = txtField.val();
//     return regex.test(inputValue) ? true : false;
// }
//
// function setItemTextError(txtField,error) {
//     if (txtField.val().length <= 0) {
//         defaultItemText(txtField,"");
//     } else {
//         txtField.css('border', '2px solid red');
//         txtField.parent().children('span').text(error);
//         txtField.parent().children('span').css('font-size','10px');
//         txtField.parent().children('span').css('color','red');
//     }
// }
//
// function textItemSuccess(txtField,error) {
//     if (txtField.val().length <= 0) {
//         defaultText(txtField,"");
//     } else {
//         txtField.css('border', '2px solid green');
//         txtField.parent().children('span').text(error);
//     }
// }
//
// function defaultItemText(txtField,error) {
//     txtField.css("border", "1px solid #ced4da");
//     txtField.parent().children('span').text(error);
// }
//
// function clearAllItemTexts() {
//     $("#inputItemCode").focus();
//     $("#inputItemCode,#inputItemName,#inputItemQts,#inputItemPrice").val("");
//     checkValidity();
// }




// /*=====================================================Order----------------------------------------------------------------------*/
//
// var order = [];
// $("#btnOrderAddItem").click(function () {
//     let OId=$("#OederOID").val();
//     let date=$("#OrderDate").val();
//
//     let customerID = $("#OrderCusID").val();
//     let customerName = $("#OrderCusName").val();
//     let customerAddress = $("#OrderCusAddress").val();
//     let customerSalary = $("#OrderCusSalary").val();
//
//     let orderICode = $("#OrderICode").val();
//     let orderName = $("#OrderIName").val();
//     let orderQty = $("#OrderIQty").val();
//     let orderPrice = $("#OrderIPrice").val();
//     let orderOnQty = $("#OrderIOQty").val();
//
//     var orderObject = {
//
//         Oid:OId,
//         date:date,
//
//         id: customerID,
//         cus_name: customerName,
//         address: customerAddress,
//         contact: customerSalary,
//
//         ItemCode: orderICode,
//         Item_name: orderName,
//         qty: orderQty,
//         price: orderPrice,
//         orderQty: orderOnQty,
//         total: (orderPrice * orderOnQty)
//     }
//
//     order.push(orderObject);
//     console.log(order)
//     getLoadOrder();
//     clearAllOrderTexts();
// });
//
//
// /*------------gel All Order--------------*/
//
// function getLoadOrder() {
//     $("#orderTable").empty();
//     for (var orders of order) {
//         console.log(order);
//
//         var row = `<tr><td>${orders.Oid}</td><td>${orders.id}</td><td>${orders.date}</td><td>${orders.ItemCode}</td><td>${orders.Item_name}</td><td>${orders.price}</td><td>${orders.orderQty}</td><td>${orders.total}</td></tr>`;
//         $("#orderTable").append(row);
//     }
// }
//
// /*--------------------------*/
//
//
//
// $("#OederOID,#OrderCustomer,#OrderCusName,#OrderDate,#OrderCusID,#OrderCusSalary,#OrderCusAddress").on('keydown', function (event) {
//     if (event.key == "Tab") {
//         event.preventDefault();
//     }
// });
//
// $("#OederOID").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderOIDIDRegEx, $("#OederOID"))) {
//         $("#OrderCusName").focus();
//     } else {
//         focusText($("#OederOID"));
//     }
// });
//
// $("#OrderCusName").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderCusNameRegEx, $("#OrderCusName"))) {
//         focusText($("#OrderDate"));
//     }
// });
//
// $("#OrderDate").on('keydown', function (event) {
//     if (event.key == "Enter") {
//         focusText($("#OrderCusID"));
//     }
// });
//
// $("#OrderCusID").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderCusIDRegEx, $("#OrderCusID"))) {
//         focusText($("#OrderCusSalary"));
//     }
// });
//
// $("#OrderCusSalary").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderCusContactRegEx, $("#OrderCusSalary"))) {
//         focusText($("#OrderCusAddress"));
//     }
// });
//
// /* -----------*/
//
// $("#OrderItem,#OrderICode,#OrderIName,#OrderIPrice,#OrderIQty,#OrderIOQty,#btnAddOrder").on('keydown', function (event) {
//     if (event.key == "Tab") {
//         event.preventDefault();
//     }
// });
//
// $("#OrderItem").on('keydown', function (event) {
//     if (event.key == "Enter") {
//         $("#OrderICode").focus();
//     }
// });
//
// $("#OrderICode").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderItemCodeRegEx, $("#OrderICode"))) {
//         focusText($("#OrderIName"));
//     }
// });
//
// $("#OrderIName").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderItemNameRegEx, $("#OrderIName"))) {
//         focusText($("#OrderIPrice"));
//     }
// });
//
// $("#OrderIPrice").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderIPriceRegEx, $("#OrderIPrice"))) {
//         focusText($("#OrderIQty"));
//     }
// });
//
// $("#OrderIQty").on('keydown', function (event) {
//     if (event.key == "Enter" && check(orderIQTYRegEx, $("#OrderIQty"))) {
//         focusText($("#OrderIOQty"));
//     }
// });
//
// // $("#OrderIOQty").on('keydown', function (event) {
// //     if (event.key == "Enter" && check(orderIOQTYRegEx, $("#OrderIOQty"))) {
// //         // focusText($("#btnOrderAddItem"));
// //     }
// // });
//
//
// $("#OrderIOQty").on('keydown', function (event) {
//     let OQty = $("#OrderIOQty").val();
//     let OPrice = $("#OrderIPrice").val();
//     let OTotal=(OQty*OPrice);
//
//     $('#OrderTotal').val(OTotal);
// });
//
//
// /*----------search ()------------*/
// $("#btnSerOrder").on("click",function () {
//     SearchOrderFunction2();
// });
//
// function SearchOrderFunction2(){
//     let typedId = $("#OederOID").val();
//     let order = searchOrder(typedId);
//     if (order != null) {
//         setTextfieldValuesOrder(order.Oid, order.date, order.id, order.cus_name,order.address,order.contact,order.ItemCode,order.Item_name,order.qty,order.price,order.orderQty,order.total);
//     } else {
//         alert("There is no Order available for that " + typedId);
//         setTextfieldValuesOrder("", "", "", "");
//     }
// }
//
// function setTextfieldValuesOrder(Oid, date, id, cus_name,address,contact,ItemCode,Item_name,qty,price,orderQty,total) {
//     $("#OederOID").val(Oid);
//     $("#OrderDate").val(date);
//     $("#OrderCusID").val(id);
//     $("#OrderCusName").val(cus_name);
//     $("#OrderCusAddress").val(address);
//     $("#OrderCusSalary").val(contact);
//     $("#OrderICode").val(ItemCode);
//     $("#OrderIName").val(Item_name);
//     $("#OrderIQty").val(qty);
//     $("#OrderIPrice").val(price);
//     $("#OrderIOQty").val(orderQty);
//     $("#OrderTotal").val(total);
// }
//
//
// function searchOrder(cusID) {
//     for (let orders of order) {
//         if (orders.Oid == cusID) {
//             return orders;
//         }
//     }
//     return null;
// }
//
// /*---------------------*/
// function clearAllOrderTexts() {
//     $("#OederOID").focus();
//     $("#OederOID,#OrderDate,#OrderCusID,#OrderCusName,#OrderCusAddress,#OrderCusSalary,#OrderICode,#OrderIName,#OrderIQty,#OrderIPrice,#OrderIOQty,#OrderTotal,#OrderTotal,#OrderSubTotal,#OrderCash,#OrderDiscount,#OrderBalance").val("");
//     checkValidity();
// }
//
// /*-----------Delete Order----------------*/
// $("#btnPurchase").on("click", function () {
//     let deleteID = $("#OederOID").val();
//
//     let option = confirm("Do you really want to delete Order id :" + deleteID);
//     if (option) {
//         if (deleteOrder(deleteID)) {
//             alert("Order Successfully Deleted..");
//             setTextfieldValuesOrder("", "", "", "");
//         } else {
//             alert("No such Order to delete. please check the id");
//         }
//     }
//     console.log("hy")
// });
//
// function deleteOrder(OrderID) {
//     let orders = searchOrder(OrderID);
//     if (orders != null) {
//         let indexNumber = order.indexOf(orders);
//         order.splice(indexNumber, 1);
//         getLoadOrder();
//         clearAllOrderTexts();
//         return true;
//     } else {
//         return false;
//     }
// }
//
//
// /*=========validation part================*/
//
// $("#OederOID").focus();
//
// // customer reguler expressions
// const orderOIDIDRegEx = /^(O00-)[0-9]{1,3}$/;
//
// const orderCusIDRegEx = /^(C00-)[0-9]{1,3}$/;
// const orderCusNameRegEx = /^[A-z ]{3,20}$/;
// const orderCusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
// const orderCusContactRegEx = /^[0-9]{10}[.]?[0-9]{1,2}$/;
//
// const orderItemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
// const orderItemNameRegEx = /^[A-z ]{3,20}$/;
// const orderIQTYRegEx = /^[0-9]{1,4}$/;
// const orderIPriceRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
// const orderIOQTYRegEx = /^[0-9]{1,4}$/;
// const orderTotalRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
//
// const orderSubTotalRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
// const orderCashRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
// const orderDiscountRegEx = /^[0-9]{1,2}$/;
// const orderBalanceRegEx = /^[0-9]{1,10}[.]?[0-9]{1,2}$/;
//
//
//
// let orderValidations = [];
// orderValidations.push({reg: orderOIDIDRegEx, field: $('#OederOID'),error:'Order ID Pattern is Wrong : O00-001'});
// orderValidations.push({reg: orderCusIDRegEx, field: $('#OrderCusID'),error:'Customer ID Pattern is Wrong : C00-001'});
// orderValidations.push({reg: orderCusNameRegEx, field: $('#OrderCusName'),error:'Customer Name Pattern is Wrong : Ex : Nipuna'});
// orderValidations.push({reg: orderCusAddressRegEx, field: $('#OrderCusAddress'),error:'Customer Address Pattern is Wrong : Ex : Galle 01'});
// orderValidations.push({reg: orderCusContactRegEx, field: $('#OrderCusSalary'),error:'Customer Contact Pattern is Wrong : 0782545156'});
// orderValidations.push({reg: orderItemCodeRegEx, field: $('#OrderICode'),error:'Order ItemCode Pattern is Wrong : I00-001'});
// orderValidations.push({reg: orderItemNameRegEx, field: $('#OrderIName'),error:'Order Item Name  is Wrong : Ex : Soya'});
// orderValidations.push({reg: orderIQTYRegEx, field: $('#OrderIQty'),error:'Order Item Qty is Wrong : Ex : 01'});
// orderValidations.push({reg: orderIPriceRegEx, field: $('#OrderIPrice'),error:'Order Item Price is Wrong : Ex : 1000'});
// orderValidations.push({reg: orderIOQTYRegEx, field: $('#OrderIOQty'),error:'Order Item Qty is Wrong : Ex : 01'});
// orderValidations.push({reg: orderTotalRegEx, field: $('#OrderTotal'),error:'Order Item Price is Wrong : Ex : 1000'});
// orderValidations.push({reg: orderSubTotalRegEx, field: $('#OrderSubTotal'),error:'Order Item Price is Wrong : Ex : 1000'});
//
// orderValidations.push({reg: orderCashRegEx, field: $('#OrderCash'),error:'Order Item Price is Wrong : Ex : 1000'});
// orderValidations.push({reg: orderDiscountRegEx, field: $('#OrderDiscount'),error:'Order Item Price is Wrong : Ex : 1000'});
// orderValidations.push({reg: orderBalanceRegEx, field: $('#OrderBalance'),error:'Order Item Price is Wrong : Ex : 1000'});
//
//
//
//
// $("#OederOID,#OrderDate,#OrderCusID,#OrderCusName,#OrderCusAddress,#OrderCusSalary,#OrderICode,#OrderIName,#OrderIQty,#OrderIPrice,#OrderIOQty,#OrderTotal,#OrderTotal,#OrderSubTotal,#OrderCash,#OrderDiscount,#OrderBalance").on('keyup', function (event) {
//     checkOrderValidity();
// });
//
// $("#OederOID,#OrderDate,#OrderCusID,#OrderCusName,#OrderCusAddress,#OrderCusSalary,#OrderICode,#OrderIName,#OrderIQty,#OrderIPrice,#OrderIOQty,#OrderTotal,#OrderTotal,#OrderSubTotal,#OrderCash,#OrderDiscount,#OrderBalance").on('blur', function (event) {
//     checkOrderValidity();
// });
//
// function checkOrderValidity() {
//     let errorCount = 0;
//     for (let validation of orderValidations) {
//         if (checkOrder(validation.reg, validation.field)) {
//             textOrderSuccess(validation.field, "");
//         } else {
//             errorCount = errorCount + 1;
//             setOrderTextError(validation.field, validation.error);
//         }
//     }
// }
//
// function checkOrder(regex, txtField) {
//     let inputValue = txtField.val();
//     return regex.test(inputValue) ? true : false;
// }
//
// function setOrderTextError(txtField, error) {
//     if (txtField.val().length <= 0) {
//         defaultOrderText(txtField, "");
//     } else {
//         txtField.css('border', '2px solid red');
//         txtField.parent().children('span').text(error);
//         txtField.parent().children('span').css('font-size', '10px');
//         txtField.parent().children('span').css('color', 'red');
//     }
// }
//
// function textOrderSuccess(txtField, error) {
//     if (txtField.val().length <= 0) {
//         defaultOrderText(txtField, "");
//     } else {
//         txtField.css('border', '2px solid green');
//         txtField.parent().children('span').text(error);
//     }
// }
//
// function defaultOrderText(txtField, error) {
//     txtField.css("border", "1px solid #ced4da");
//     txtField.parent().children('span').text(error);
// }
//
// $("#btnCalculate").on("click", function () {
//     let total = $("#OrderTotal").val();
//     let discount = $("#OrderDiscount").val();
//     let cash=$("#OrderCash").val();
//     let subTotal=total-((total/100)*discount);
//     let balance=(cash-subTotal);
//     $('#OrderSubTotal').val(subTotal);
//     $('#OrderBalance').val(balance);
// });
