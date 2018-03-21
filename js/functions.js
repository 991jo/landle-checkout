var products = [
	{
		name : "Club Mate",
		price : 1.5,
		amount : 0
	},
	{
		name : "Club Mate Cola",
		price : 1.5,
		amount : 0
	},
	{
		name : "Wulle",
		price : 2.0,
		amount : 0
	},
	{
		name : "Fanta",
		price : 2.0,
		amount : 0
	},
	{
		name : "Radler",
		price : 1.5,
		amount : 0
	},
	{
		name : "Effect",
		price : 2.0,
		amount : 0
	},
	{
		name : "Wasser",
		price : 1,
		amount : 0
	},
	{
		name : "Cola",
		price : 2.0,
		amount : 0
	}
]

function build_table(){
	for (var i in products){
		var product = products[i]

		var name = product.name
		var amount = product.amount
		var price = product.price
		var sum = amount*price || ""

		var buttons = `<div class="input-group mb-3">
	<div class="input-group-prepend">
		<button type="button" class="btn" onclick="increase(${ i })">+</button>
	</div>
	<span class="input-group-text" id="amount-${ i }">${ amount }</span>
	<div class="input-group-append">
		<button type="button" class="btn" onclick="decrease(${ i })">-</button>
	</div>
</div>`

		var table = $("#product-table tbody");

		var row = $("<tr>");
		row.attr("id",`product-row-${ i }`)
		row.append($("<td>").text(name));
		row.append($("<td>").text(price));
		row.append($("<td>").html(buttons));
		row.append($("<td>").text(sum));
		table.append(row)
	}

	update_sums()
}

function increase(num){
	products[num].amount += 1;
	$("#amount-" + num)[0].textContent = products[num].amount;

	update_sums();
}

function decrease(num){
	if (products[num].amount > 0) {
		products[num].amount -= 1
	} else {
		products[num].amount = 0;
	}

	$("#amount-" + num)[0].textContent = products[num].amount;

	update_sums();
}

function update_sums(){
	var total_price = 0;
	for( var i in products){
		product = products[i]
		var sum = product.amount * product.price;
		total_price += sum;
		var display_sum = sum || ""; //display nothing if nothing has been entered

		var row = $(`#product-row-${ i }`);
		row.find("td")[3].textContent = display_sum;
	}

	var sum = $("#sum")[0]
	sum.textContent = total_price
}

function clears(){
	// clear the data structure
	for (var i in products){
		var product = products[i];

		product.amount = 0;
	}

	// clear the table by removing all rows except the heading
	var table = $("#product-table tbody").empty();

	// rebuild the table
	build_table();
	update_sums();
}

function show_alert(alert_name){
	$("#"+ alert_name).show();
}
function hide_alert(alert_name){
	$("#"+ alert_name).hide();
}

function enter(){
	clears();
	show_alert("success-alert");
	setTimeout(hide_alert,1000, "success-alert");
}

function abort(){
	clears();
	show_alert("abort-alert");
	setTimeout(hide_alert,1000, "abort-alert");
}


build_table();
hide_alert("success-alert");
hide_alert("abort-alert");
