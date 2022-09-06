<?php
 
//Class para criar listagens
 
class email { 
    public function is_mail($email){
        return (preg_match("/^([a-z]|[0-9]|\.|-|_)+@([a-z]|[0-9]|\.|-|_)+\.([a-z]|[0-9]){2,3}$/si",$email, $arr_vars) && !preg_match("/(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/si", $email, $arr_vars))? true : false;
    }
    public function html_mail($de, $para, $assunto, $mensagem, $replyto = false){
        $cabecalhos = "MIME-Version: 1.0\n";
        $cabecalhos .= "Content-type: text/html; charset=iso-8859-1\n";
        $cabecalhos .= "From: $de\n";
        if ($replyto == true){ $cabecalhos .= "Reply-To: $de\n";}
                
        if (mail($para, $assunto, $mensagem, $cabecalhos)){
            return true;
        } else {
            return false;
        } 
    }
}
 
?>
