// Criando a lista de compras
var list = [];

// Salvando os Dados em Json
function saveListStorage(list){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}

// Identifica o Registro Salvo
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}
initListStorage();

//Criando a Tabela no Front-End
function setList(list){
	var table = '<thead><tr><td></td><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td></td><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatQtd(list[key].qtd) +'</td><td>'+ formatValor(list[key].valor) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Editar</button><button class="btn btn-default" onclick="deleteData('+key+');">Apagar</button></td></tr>';
	}
	table += '</tbody>';

	document.getElementById('listTable').innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

// Formatando o Campo Descrição
function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

// Formatando o Campo Quantidade
function formatQtd(qtd){
	return parseInt(qtd);
}

// Formatando o Campo Valor
function formatValor(valor){
	var str = parseFloat(valor).toFixed(2) + "";
	str = str.replace(".",",");
	str = "R$ " + str;
	return str;
}

// Atualizando o Valor Total
function getTotal(list){
	var total = 0;
	for(var key in list){
		total += list[key].valor * list[key].qtd;
	}
	document.getElementById("totalValue").innerHTML = formatValor(total);
}


// Criando um Registro Novo
function addData(){
//	if(!validation()){
//		return;
//	}
	var desc = document.getElementById("desc").value;
	var qtd = document.getElementById("qtd").value;
	var valor = document.getElementById("valor").value;

	list.unshift({"desc":desc, "qtd":qtd, "valor":valor});
	setList(list);
	resetForm();
}

// Limpando os Campos do Formulário
function resetForm(){
	document.getElementById("desc").value = "";
	document.getElementById("qtd").value = "";
	document.getElementById("valor").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	document.getElementById("inputIDUpdate").innerHTML = "";
}

// Apagando os Registros
function deleteData(id){
	if(confirm("Confirma Exclusão(S/N)?")){
		if(id == list.length - 1){
			list.pop();
		}
		else if(id == 0){
			list.shift();
		}
		else{
			var arrAuxIni = list.slice(0,id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}

// Apagando Todos os Registros
function deleteList(){
	if(confirm("Deseja Apagar Todos os Registros(S/N)?")){
		list = [];
		setList(list);
	}
}

// Editando os Registros
function setUpdate(id){
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("qtd").value = obj.qtd;
	document.getElementById("valor").value = obj.valor;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";
	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function updateData(){
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var qtd = document.getElementById("qtd").value;
	var valor = document.getElementById("valor").value;
	list[id] = ({"desc":desc, "qtd":qtd, "valor":valor});
	setList(list);
	resetForm();
}



















//Criando o Cabeçalho do Front-End
function setConfig(){
	var texts = {
		"title":"Carrinho de Compras"
	};
	document.title = texts.title;
	document.getElementById("navTitle").innerHTML = texts.title;
}
setConfig();

