import React from "react";
import FiltroGenero from '../FiltroGenero/filtroGenero'
import IconeTodos from '../../assets/icons/todos-filtro.svg'
import IconeTerror from '../../assets/icons/terror-filtro.svg'


export default function SecaoFiltroGenero() {
    return(
        <>
        <div className="seila">
            <FiltroGenero 
            label="Todos" 
            icone={IconeTodos} 
        />
        <FiltroGenero 
            label="Todos" 
            icone={IconeTerror} 
        />
        </div>
        
        </>
        
        
    )
}