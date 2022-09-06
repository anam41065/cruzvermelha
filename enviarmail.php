<?php

$email_cliente = "email_para_onde_querem_enviar_o_formulario@hotmail.com"; 

include "email.php";

foreach($_POST as $var => $val){ ${$var} = trim($val);}

$mailserv = new email();

if (!$mailserv->is_mail($email)){ 
    $msg =  "<b>Erro:</b> O email que inseriu não está correcto.";
} else if ($mailserv->html_mail($email, $email_cliente, $assunto, "<b>Nome:</b> $nome<br>\n<b>E-mail:</b> $email<br><b>Assunto:</b> $assunto<br>\n<br>\n$mensagem")){
    $msg = "O sua mensagem foi enviada. Entraremos em contacto consigo logo que possivel.";
} else {
    $msg = "<b>Erro:</b> Não foi possível de momento enviar a sua mensagem.";
}
   
print utf8_encode($msg);

?>