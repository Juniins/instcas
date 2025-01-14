
$(document).ready(() => {
  
  //$('#pop-up').hide();
    
  let nomes = ['Carlos', 'Joel', 'Sandro', 'Pedro', 'José', 'Cleber', 'Diego', 'Bruno', 'Vitor', 'Camyle', 'Sabrina','Martin', 'Michel', 'Felipe', 'Ariel'];
  
  let valores = ['R$ 1.500', 'R$ 3.045', 'R$ 1.855', 'R$ 1.205', 'R$ 6.450', 'R$ 2.090', 'R$5.000', 'R$ 953,75', 'R$ 1.962', 'R$ 987,54'];
  
  setInterval(() => {
    
    let pessoas = nomes[Math.floor(Math.random() * nomes.length)];
    let resgate = valores[Math.floor(Math.random() * valores.length)];
    
    $('#pessoas').text(pessoas);
    $('#dinheiro').text(resgate);
    
    $('#pop-up').fadeIn().delay(4000).fadeOut();
  }, 8000);


});
