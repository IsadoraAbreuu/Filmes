import React, { useState } from "react";
import "./inputContato.css"; 
import IconeSeta from '../../assets/icons/icone-seta-botao.svg'
import Botao from '../Botao/botao'

const InputContato = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Mensagem enviada:", message);
      setMessage(""); 
    }
  };

  return (
    <div className="inputContainer">
        <input
        type="text"
        placeholder="Manda sua mensagem aqui ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mensagemInput"
      />
        <Botao
        link="/sobre"
        texto="Enviar"
        iconeSrc={IconeSeta}
        />
    </div>
  );
};

export default InputContato;
