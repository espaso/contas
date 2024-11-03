window.onerror = ScriptErro;

if (screen.width < 640 || screen.height < 480) { 
	var dispositivo = true;
} else if (screen.width < 1024 || screen.height < 768) { 
	var dispositivo = true;
} else { 
	var dispositivo = false;
}

if (dispositivo) var caminho = "/storage/emulated/0/.contas/"; else var caminho = "file:///C:/Users/USER5/OneDrive/Documentos/.contas/";


var MinhaData = new Date();
var Dia = MinhaData.getDate();
var Mes = MinhaData.getMonth()+1;
var Mez = Mes;
var Ano = MinhaData.getFullYear();
var HH = MinhaData.getHours();
var MM = MinhaData.getMinutes();
var SS = MinhaData.getSeconds();

Dia = Zerado(Dia,2,"");
Mes = Zerado(Mes,2,"");
HH = Zerado(HH,2,"");
MM = Zerado(MM,2,"");
SS = Zerado(SS,2,"");

var teste = Mes;
var corrente = Ano+Mes;
var anoa = Ano;
var anou = Ano;
var ante = Mes-2;
var ulti = Mes-1;

ante=Zerado(ante,2,"");
ulti=Zerado(ulti,2,"");
if (teste==01) {ante='11';ulti='12';anoa=Ano-1;anou=Ano-1;}
if (teste==02) {ante='12';anoa=Ano-1;anou=Ano;}

var antepenultimo = anoa+ante;
var ultimomes = anou+ulti;
var mesanterior = anou+ulti;
var hoje = Ano+""+Mes+""+Dia;
var hora = HH+':'+MM+':'+SS;
var agora = hoje+""+HH+""+MM+""+SS;

function mesesAneriores(date, diff) {
  const m = new Date(date);
  m.setMonth(m.getMonth() + diff);
  return m.getFullYear()+""+Zerado(((m.getMonth() + 1)),2,"");
}

function Remuneracao(holerite) {
	var noturno = holerite*0.3;
	var hextra = 0;//holerite*0.1875;
	var dsr = (noturno+hextra)/5.5;
	var bruto = holerite+noturno+hextra+dsr;
	var adia = 0;//holerite*0.4;
	var inss = (1412*0.075)+((2666.68-1412)*0.09)+((4000.03-2666.68)*0.12)+((bruto-4000.03)*0.14);
	var irrf = (bruto*0.275)-884.96;
	var desconto = adia+inss+irrf;
	var liquido = (bruto)-(desconto);
	windows.open("","",holerite+" - "+noturno+" - "+dsr+" - "+inss+" - "+irrf+" - "+bruto+" - "+desconto+" - "+liquido);
	return liquido;
}

function Zerado(n,len,padding) {
	var sign = '',s = n;
	if (typeof n === 'number') {
		sign = n < 0 ? '-':'';
		s = Math.abs(n).toString();
	}
	if ((len -= s.length) > 0) {
		s = Array(len + 1).join(padding || '0') + s;
	}
	return sign + s;
}

const mascaraMoeda = (event) => {
  const onlyDigits = event.target.value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat)
}

const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
}

function formatamoeda(num){
	x = 0;
    if (num<0){
	    num = Math.abs(num);
	    x = 1;
    }
    if (isNaN(num)) num = "0";
    cents = Math.floor((num*100+0.5)%100);
    num = Math.floor((num*100+0.5)/100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    ret = num + ',' + cents;
    if (x == 1) ret = ' - ' + ret;return ret;
}

function arredondamoeda(num){
    return Math.round(num*Math.pow(10,2))/Math.pow(10,2);
}

function formatadata(texto) {
	if (texto!==null) {
		var extenso = texto;  
		var separa = extenso.split("/");  
		tamanho = separa.length;  
		dia = separa[tamanho-1];
	}
	if (texto !== '') {
		texto = new Date(texto);
		mes = texto.getMonth()+1;
		ano = texto.getFullYear();
		dia = Zerado(dia,2,"");
		mes = Zerado(mes,2,"");
		texto = (dia + "/" + mes + "/" + ano);
	} else {
		texto = "";
	}
	return texto;
}

function arrumadata(texto) {
	if (texto!==null || texto!=="") {
		/*var extenso = texto;  
		var separa = extenso.split("/");  
		tamanho = separa.length;
		dia = separa[tamanho-3];
		mes = separa[tamanho-2];
		ano = separa[tamanho-1];*/
		texto = texto.substr(0,4) + "/" + texto.substr(4,2) + "/" + texto.substr(6,2);
	} else {
		texto = "";
	}
	return texto;
}

function nomedomes(texto) {
	if (texto !== '') {
		if (texto == 1 || texto == 01) texto = "Janeiro";
		if (texto == 2 || texto == 02) texto = "Fevereiro";
		if (texto == 3 || texto == 03) texto = "Março";
		if (texto == 4 || texto == 04) texto = "Abril";
		if (texto == 5 || texto == 05) texto = "Maio";
		if (texto == 6 || texto == 06) texto = "Junho";
		if (texto == 7 || texto == 07) texto = "Julho";
		if (texto == 8 || texto == 08) texto = "Agosto";
		if (texto == 9 || texto == 09) texto = "Setembro";
		if (texto == 10) texto = "Outubro";
		if (texto == 11) texto = "Novembro";
		if (texto == 12) texto = "Dezembro";
		return texto;
	} else {
		return texto = "";
	}
}

function vediasemana(texto) {
	if (texto !== '') {
		datahoje = new Date(texto);
		diasemana = datahoje.getDay(texto);
		if (diasemana == 0) diasemana = "Domingo ";
		if (diasemana == 1) diasemana = "Segunda ";
		if (diasemana == 2) diasemana = "Terça ";
		if (diasemana == 3) diasemana = "Quarta ";
		if (diasemana == 4) diasemana = "Quinta ";
		if (diasemana == 5) diasemana = "Sexta ";
		if (diasemana == 6) diasemana = "Sábado ";
		if (diasemana == 7) diasemana = "Domingo ";
		return diasemana;
	} else {
		return texto = "";
	}
}

function AlteraForma(texto) {
	if (texto != null) {
		if (texto == "Alelo") texto = "AM";
		if (texto == "Amex") texto = "CA";
		if (texto == "Bradesco") texto = "BR";
		if (texto == "Brasil") texto = "BB";
		if (texto == "Caixa") texto = "CX";
		if (texto == "Cartao") texto = "CC";
		if (texto == "Contas") texto = "CH";
		if (texto == "Dinheiro") texto = "DM";
		if (texto == "Flexcar") texto = "CM";
		if (texto == "Itau") texto = "IT";
		if (texto == "Itaucard") texto = "CI";
		if (texto == "Modal") texto = "MD";
		if (texto == "Toro") texto = "TR";
		if (texto == "Refeicao") texto = "RM";
		if (texto == "Santander") texto = "SM";
		if (texto == "Visa") texto = "CV";
		return texto;
	} else {
		return texto = "";
	}
}

function DefineForma(texto) {
	if (texto != null) {
		if (texto == "AM") texto = "Alelo";
		if (texto == "CA") texto = "Amex";
		if (texto == "CX") texto = "Caixa";
		if (texto == "BR") texto = "Bradesco";
		if (texto == "BA" || texto == "BM") texto = "Brasil";
		if (texto == "AE" || texto == "CB" || texto == "CC" || texto == "VS") texto = "Cartao";
		if (texto == "CH") texto = "Contas";
		if (texto == "DA" || texto == "DL" || texto == "DM") texto = "Dinheiro";
		if (texto == "CM") texto = "Flexcar";
		if (texto == "IT") texto = "Itau";
		if (texto == "CI") texto = "Itaucard";
		if (texto == "RM") texto = "Refeicao";
		if (texto == "MD") texto = "Modal";
		if (texto == "TR") texto = "Toro";
		if (texto == "SA" || texto == "SM") texto = "Santander";
		if (texto == "CV") texto = "Visa";
		return texto;
	} else {
		return texto = "";
	}
}

function ValidaData(campo,texto) {
	if (texto!=0 && texto.length==1) {
		texto = Ano+'/'+Mes+'/0'+texto;
	} else if (texto!=00 && texto.length==2) {
		texto = Ano+'/'+Mes+'/'+texto;
	} else if (texto=="") {
		texto = "";
	}
	campo = eval(campo);
	campo.value = texto;
}

function MascaraCampo(texto, campo, mask, ponto, virgula, evento) {
	if (texto == "Moeda") {
		campo.maxLength = 10;
		var sep = 0;
		var key = '';
		var i = j = 0;
		var len = len2 = 0;
		var strCheck = '0123456789';
		var aux = aux2 = '';
		var whichCode = (window.Event) ? evento.which : evento.keyCode;
		if (whichCode == 13) return true;
		key = String.fromCharCode(whichCode);
		if (strCheck.indexOf(key) == -1) return false;
		len = campo.value.length;
		for(i = 0; i < len; i++)
		if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != virgula)) break;
		aux = '';
		for(; i < len; i++)
		if (strCheck.indexOf(campo.value.charAt(i))!=-1) aux += campo.value.charAt(i);
		aux += key;
		len = aux.length;
		if (len == 0) campo.value = '';
		if (len == 1) campo.value = '0'+ virgula + '0' + aux;
		if (len == 2) campo.value = '0'+ virgula + aux;
		if (len > 2) {
			aux2 = '';
			for (j = 0, i = len - 3; i >= 0; i--) {
				if (j == 3) {
					aux2 += ponto;
					j = 0;
				}
				aux2 += aux.charAt(i);
				j++;
			}
			campo.value = '';
			len2 = aux2.length;
			for (i = len2 - 1; i >= 0; i--)
			campo.value += aux2.charAt(i);
			campo.value += virgula + aux.substr(len - 2, len);
		}
		return false;
	} else if (texto == "Valida") {
		var key = '';
		var strCheck = '0123456789';
		var whichCode = (window.Event) ? evento.which : evento.keyCode;
		if (whichCode == 13) return true;
		key = String.fromCharCode(whichCode);
		if (strCheck.indexOf(key) == -1) return false;
	}
}

function HighlightAll(theField) {
	var tempval=eval(theField);
	tempval.focus();
	tempval.select();
}

function Maiuscula(letra) {
	letra=letra.split("");
	var tmp="";
	for (i=0;i<letra.length;i++) {
		if (letra[i-1]) {
			if (letra[i-1]==" ") {
				letra[i]=letra[i].replace(letra[i],letra[i].toUpperCase());
			}
			if (letra[i-1]=="-") {
				letra[i]=letra[i].replace(letra[i],letra[i].toUpperCase());
			}
		} else {
			letra[i]=letra[i].replace(letra[i],letra[i].toUpperCase());
		}
		tmp+=letra[i];
	}
	return tmp;
}

function captaliza(texto) {
	return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function ScriptErro(msg, url, line, col, err) {
	if (line==0) {window.onerror = null;return true/* url = "codigo.js"; err = "Erro desconhecido"; msg = "Erro desconhecido";*/}
	url = url.split("/");  
	url = url[url.length-1];
	msg = msg.split(": ");  
	msg = msg[msg.length-1];
	if (dispositivo) android.MandaSms(url+" - "+err,"21998103976",url+", "+line+"\n"+msg); else alert(url+", "+line+"\n"+msg);
	window.onerror = null;
	return true
}

function MensagemErro(msg, url, line, col, err) {
	if (line==0) {window.onerror = null;return true/* url = window.location.href; err = "Erro desconhecido"; msg = "Erro desconhecido";*/}
	url = url.split("/");  
	url = url[url.length-1];
	msg = msg.split(": ");  
	msg = msg[msg.length-1];
	if (dispositivo) android.MandaSms(url+" - "+err,"21998103976",url+", "+line+"\n"+msg); else alert(url+", "+line+"\n"+msg);
	window.onerror = null;
	return true
}

function parcelamento(valor,parcela) {
	if (parcela!=0) {
		vp = valor/parcela;
	} else {
		vp = valor;
	}
	return vp;
}
