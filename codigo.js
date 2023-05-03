window.onerror = ScriptErro;

if (/(android|bb\d+|meego).+mobile/i.test(navigator.userAgent||navigator.vendor)) var dispositivo = true; else var dispositivo = false;

if (dispositivo) var caminho = "/storage/emulated/0/.contas"; else var caminho = "../../../../../../../.contas";
//var caminho = "/storage/emulated/0/.contas";

var banco = "contas";
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
var corrente = "A"+Ano+Mes;
var anoa = Ano;
var anou = Ano;
var ante = Mes-2;
var ulti = Mes-1;

ante=Zerado(ante,2,"");
ulti=Zerado(ulti,2,"");
if (teste==01) {ante='11';ulti='12';anoa=Ano-1;anou=Ano-1;}
if (teste==02) {ante='12';anoa=Ano-1;anou=Ano;}
var antepenultimo = "B"+anoa+ante;
var ultimomes = "B"+anou+ulti;
var mesanterior = "A"+anou+ulti;
var hoje = Ano+'/'+Mes+'/'+Dia;
var hora = HH+':'+MM+':'+SS;
var agora = Ano+""+Mes+""+Dia+""+HH+""+MM+""+SS;

var LimiteVisa = 0, LimiteItaucard = 0;

var Conexao = window.openDatabase(banco, "1", "Contas", 5000000);
Conexao.transaction(function(tabela) {
	//tabela.executeSql("DROP TABLE CONTROLE");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS AGENDA (Codigo INTEGER, Tarefa TEXT, Data REAL, Tipo TEXT, Descricao TEXT)");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS ALTERA (Codigo INTEGER, Tabela TEXT, Descricao TEXT, Valor TEXT, Edita TEXT)");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS VISA (Codigo INTEGER, Tipo TEXT, Data REAL, Forma TEXT, Descricao TEXT, Valor REAL, Parcelas INTEGER, Quitado INTEGER)");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS CONTROLE (Codigo INTEGER, Agenda INTEGER, Backup INTEGER, Visa INTEGER, Corrente INTEGER, Mensal INTEGER, Moeda REAL, Limite REAL, Limitau REAL, Atualiza INTEGER, Anterior INTEGER, MesAntes TEXT, MesAtual TEXT, Data REAL, Hora REAL)");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS DIARIO (Codigo INTEGER)");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS MENSAL (Codigo INTEGER, Registro TEXT, Tipo TEXT, Data REAL, Forma TEXT, Descricao TEXT, Valor REAL, Vencimento INTEGER, Parcelas INTEGER, Mensalidade REAL, Resta INTEGER)");
	tabela.executeSql("CREATE TABLE IF NOT EXISTS "+corrente+" (Codigo INTEGER, Registro TEXT, Data REAL, Tipo TEXT, Forma TEXT, Descricao TEXT, Valor REAL)");
	tabela.close;
}); 
Conexao = null;

function Remuneracao(holerite) {
	var adianta = 0;//holerite*0.4;
	var noturno = holerite*0.3;
	var hextra = holerite*0.1875;
	var dsr = (noturno+hextra)/5.5;
	var inss = holerite*0.09;
	var irrf = (holerite*0.225)-636.13;
	return ((holerite+noturno+hextra+dsr)-(adianta+inss+irrf));
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
	if (texto!=null) {
		var extenso = texto;  
		var separa = extenso.split("/");  
		tamanho = separa.length;  
		dia = separa[tamanho-1];
	}
	if (texto != '') {
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
	if (line==0) {url = "codigo.js"; err = "Erro desconhecido"; msg = "Erro desconhecido";}
	url = url.split("/");  
	url = url[url.length-1];
	msg = msg.split(": ");  
	msg = msg[msg.length-1];
	if (dispositivo) android.MandaSms(url+" - "+err,"21998103976",url+", "+line+"\n"+msg); else alert(url+", "+line+"\n"+msg);
	window.onerror = null;
	return true
}

function MensagemErro(msg, url, line, col, err) {
	if (line==0) {url = window.location.href; err = "Erro desconhecido"; msg = "Erro desconhecido";}
	url = url.split("/");  
	url = url[url.length-1];
	msg = msg.split(": ");  
	msg = msg[msg.length-1];
	if (dispositivo) android.MandaSms(url+" - "+err,"21998103976",url+", "+line+"\n"+msg); else alert(url+", "+line+"\n"+msg);
	window.onerror = null;
	return true
}

var Consulta = "SELECT * FROM "+corrente
var SaldoBRanterior=0,EntradaBRanterior=0,SaidaBRanterior=0;
var SaldoDManterior=0,EntradaDManterior=0,SaidaDManterior=0;
var SaldoCXanterior=0,EntradaCXanterior=0,SaidaCXanterior=0;
var SaldoMDanterior=0,EntradaMDanterior=0,SaidaMDanterior=0;
var SaldoITanterior=0,EntradaITanterior=0,SaidaITanterior=0;
var cs = 0;
var DataSaldo = new Date();
var hh = DataSaldo.getHours();
var mm = DataSaldo.getMinutes();
hh = Zerado(hh,2,"");
mm = Zerado(mm,2,"");
var Conexao = window.openDatabase(banco, "1", "Contas", 5000000);
Conexao.transaction(function(tabela) {
//Informacao Mes Anterior
	tabela.executeSql(Consulta, [], function(tabela, dados) {if (dados.rows.length<1) {
//Saldo
		tabela.executeSql("SELECT * FROM "+mesanterior, [], function(tabela, dados) {
			for (var i=0; i<dados.rows.length; i++) {
//Saldo Bancos
				if (dados.rows.item(i).Registro=='Receita' && dados.rows.item(i).Forma=='BR') {
					EntradaBRanterior = EntradaBRanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Despesa' && dados.rows.item(i).Forma=='BR') {
					SaidaBRanterior = SaidaBRanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Receita' && dados.rows.item(i).Forma=='CX') {
					EntradaCXanterior = EntradaCXanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Despesa' && dados.rows.item(i).Forma=='CX') {
					SaidaCXanterior = SaidaCXanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Receita' && dados.rows.item(i).Forma=='MD') {
					EntradaMDanterior = EntradaMDanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Despesa' && dados.rows.item(i).Forma=='MD') {
					SaidaMDanterior = SaidaMDanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Receita' && dados.rows.item(i).Forma=='IT') {
					EntradaITanterior = EntradaITanterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Despesa' && dados.rows.item(i).Forma=='IT') {
					SaidaITanterior = SaidaITanterior + dados.rows.item(i).Valor;
				}
//Saldo Especie
				if (dados.rows.item(i).Registro=='Receita' && dados.rows.item(i).Forma=='DM') {
					EntradaDManterior = EntradaDManterior + dados.rows.item(i).Valor;
				}
				if (dados.rows.item(i).Registro=='Despesa' && dados.rows.item(i).Forma=='DM') {
					SaidaDManterior = SaidaDManterior + dados.rows.item(i).Valor;
				}
			}
			SaldoBRanterior = arredondamoeda(EntradaBRanterior-SaidaBRanterior);
			SaldoDManterior = arredondamoeda(EntradaDManterior-SaidaDManterior);
			SaldoCXanterior = arredondamoeda(EntradaCXanterior-SaidaCXanterior);
			SaldoMDanterior = arredondamoeda(EntradaMDanterior-SaidaMDanterior);
			SaldoITanterior = arredondamoeda(EntradaITanterior-SaidaITanterior);
			datasaldo = Ano+"/"+Mes+"/01";
			dsaldo = Ano+""+Mes+""+Dia+""+hh+""+mm+""+Zerado(cs++,2,"");
			tabela.executeSql("INSERT INTO "+corrente+" (Codigo, Registro, Data, Tipo, Forma, Descricao, Valor) VALUES (?,?,?,?,?,?,?)", [dsaldo, 'Receita', datasaldo, 'Saldo', 'BR', 'Bradesco', SaldoBRanterior]);
			if (dispositivo) android.MandaSms("Saldo "+nomedomes(ulti),"21998103976",nomedomes(ulti)+" "+formatadata(datasaldo)+"\nSaldo Bradesco\nBradesco R$ "+formatamoeda(SaldoBRanterior));
			dsaldo = Ano+""+Mes+""+Dia+""+hh+""+mm+""+Zerado(cs++,2,"");
			tabela.executeSql("INSERT INTO "+corrente+" (Codigo, Registro, Data, Tipo, Forma, Descricao, Valor) VALUES (?,?,?,?,?,?,?)", [dsaldo, 'Receita', datasaldo, 'Saldo', 'CX', 'Caixa', SaldoCXanterior]);
			if (dispositivo) android.MandaSms("Saldo "+nomedomes(ulti),"21998103976",nomedomes(ulti)+" "+formatadata(datasaldo)+"\nSaldo Caixa\nCaixa R$ "+formatamoeda(SaldoCXanterior));
			dsaldo = Ano+""+Mes+""+Dia+""+hh+""+mm+""+Zerado(cs++,2,"");
			tabela.executeSql("INSERT INTO "+corrente+" (Codigo, Registro, Data, Tipo, Forma, Descricao, Valor) VALUES (?,?,?,?,?,?,?)", [dsaldo, 'Receita', datasaldo, 'Saldo', 'MD', 'Modal', SaldoMDanterior]);
			if (dispositivo) android.MandaSms("Saldo "+nomedomes(ulti),"21998103976",nomedomes(ulti)+" "+formatadata(datasaldo)+"\nSaldo Modal\nModal R$ "+formatamoeda(SaldoMDanterior));
			dsaldo = Ano+""+Mes+""+Dia+""+hh+""+mm+""+Zerado(cs++,2,"");
			tabela.executeSql("INSERT INTO "+corrente+" (Codigo, Registro, Data, Tipo, Forma, Descricao, Valor) VALUES (?,?,?,?,?,?,?)", [dsaldo, 'Receita', datasaldo, 'Saldo', 'IT', 'Itau', SaldoITanterior]);
			if (dispositivo) android.MandaSms("Saldo "+nomedomes(ulti),"21998103976",nomedomes(ulti)+" "+formatadata(datasaldo)+"\nSaldo Itau\nItau R$ "+formatamoeda(SaldoITanterior));
			dsaldo = Ano+""+Mes+""+Dia+""+hh+""+mm+""+Zerado(cs++,2,"");
			tabela.executeSql("INSERT INTO "+corrente+" (Codigo, Registro, Data, Tipo, Forma, Descricao, Valor) VALUES (?,?,?,?,?,?,?)", [dsaldo, 'Receita', datasaldo, 'Saldo', 'DM', 'Dinheiro', SaldoDManterior]);
			if (dispositivo) android.MandaSms("Saldo "+nomedomes(ulti),"21998103976",nomedomes(ulti)+" "+formatadata(datasaldo)+"\nSaldo Dinheiro\nDinheiro R$ "+formatamoeda(SaldoDManterior));
		});
//Lancamento Futuro
		tabela.executeSql("SELECT * FROM MENSAL", [], function(tabela, dados) { 
			for (var i=0; i<dados.rows.length; i++) {
				anom = Ano;
				mesm = Mes;
				var tipo = "Mensal";
				var descricao = dados.rows.item(i).Descricao;
				if (descricao=="Adiantamento") {
					var mensalidade = dados.rows.item(i).Mensalidade*0.4;
				} else if (descricao=="Pagamento") {
					var mensalidade = Remuneracao(dados.rows.item(i).Mensalidade);
				} else {
					var mensalidade = dados.rows.item(i).Mensalidade;
				}
				if (dados.rows.item(i).Parcelas>0 && dados.rows.item(i).Resta==0) {
					tabela.executeSql("DELETE FROM MENSAL WHERE Codigo = "+dados.rows.item(i).Codigo);
					tabela.executeSql("UPDATE VISA SET Quitado = 1 WHERE Codigo = "+dados.rows.item(i).Codigo);
				} else {
                    if (dados.rows.item(i).Data<anom+"/"+mesm+"/01") {
    					if (dados.rows.item(i).Parcelas>0 && dados.rows.item(i).Resta>0) {
    						var restante = dados.rows.item(i).Resta - 1;
							if (dados.rows.item(i).Tipo=="Visa" || dados.rows.item(i).Tipo=="Contas" || dados.rows.item(i).Tipo=="Itaucard") {
								tipo = dados.rows.item(i).Tipo;
							}
    						tabela.executeSql("UPDATE MENSAL SET Resta = "+restante+" WHERE Codigo = "+dados.rows.item(i).Codigo);
    						parcela = dados.rows.item(i).Parcelas - restante;
    						if (dados.rows.item(i).Parcelas>1) descricao = descricao+" "+parcela+"/"+dados.rows.item(i).Parcelas;
    					}
    					var data = anom+"/"+mesm+"/"+Zerado(dados.rows.item(i).Vencimento,2,"");
    					if (dados.rows.item(i).Vencimento==31) {
    						if (mesm==02) data = anom+"/"+mesm+"/28";
    						if (mesm==04 || mesm==06 || mesm==09 || mesm==11) data = anom+"/"+mesm+"/30";
    					} else {
    						if (dados.rows.item(i).Vencimento>=28) {
    							if (mesm==01 || mesm==03 || mesm==05 || mesm==07 || mesm==08 || mesm==10 || mesm==12) data = anom+"/"+mesm+"/31";
    						}
    					}
    					var somar = 0;
    					if (dados.rows.item(i).Registro=="Despesa") {
    						if (vediasemana(data).substr(0,3)=="Sáb") somar = 2;
    						if (vediasemana(data).substr(0,3)=="Dom") somar = 1;
    					} else {
    						if (vediasemana(data).substr(0,3)=="Sáb") somar = -1;
    						if (vediasemana(data).substr(0,3)=="Dom") somar = -2;
    					}
    					ndata = parseInt(data.substr(8,2))+parseInt(somar);
						if (ndata>=31) {
    						if (mesm==02) ndata = 28;
    						if (mesm==04 || mesm==06 || mesm==09 || mesm==11) ndata = 30;
    						if (mesm==01 || mesm==03 || mesm==05 || mesm==07 || mesm==08 || mesm==10 || mesm==12) ndata = 31;
    					} else {
    						if (ndata>=28) {
    							if (mesm==02) ndata = 28;
    							if (mesm==04 || mesm==06 || mesm==09 || mesm==11) ndata = 30;
    							if (mesm==01 || mesm==03 || mesm==05 || mesm==07 || mesm==08 || mesm==10 || mesm==12) ndata = 31;
    						}
    					}
    					data = data.substr(0,8)+""+Zerado(ndata,2,"");
   						if (dados.rows.item(i).Tipo=="Visa" || dados.rows.item(i).Tipo=="Contas" || dados.rows.item(i).Tipo=="Itaucard") {
							tipo = dados.rows.item(i).Tipo;
						}
    					if (dados.rows.item(i).Registro=="Receita") tipo = dados.rows.item(i).Tipo;
 						if (dados.rows.item(i).Descricao.split(' ')[0]=="Fies") {
							if (mesm!=03 && mesm!=06 && mesm!=09 && mesm!=12) tipo = "Fies";
						}
						if (mesm.toString()==Mes && tipo!="Fies") {
							dsaldo = Ano+""+Mes+""+Dia+""+hh+""+mm+""+Zerado(cs++,2,"");
							tabela.executeSql("INSERT INTO "+corrente+" (Codigo, Registro, Data, Tipo, Forma, Descricao, Valor) VALUES (?,?,?,?,?,?,?)", [dsaldo, dados.rows.item(i).Registro, data, tipo, dados.rows.item(i).Forma, descricao, arredondamoeda(mensalidade)]);
						}
    				}
				}
			}
		});
//Backup ultimo Mes
		tabela.executeSql("SELECT * FROM CONTROLE", [], function(tabela, dados) {  
			//alert(dados.rows.item(0).MesAtual+" = "+mesanterior);
			if (dados.rows.item(0).MesAtual==mesanterior) window.location.replace("../paginas/backup.htm");
		});
	}});
	tabela.close;
});  
Conexao = null;
