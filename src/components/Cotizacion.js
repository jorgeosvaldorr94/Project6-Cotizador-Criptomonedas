import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;


const Cotizacion = ({resultado}) => {

    //validar que el objeto resultado no este vacio
    if(Object.keys(resultado).length === 0) return null;

    function getFormattedNumber(str) {

        let result = str.replace(/[^0-9.,\s]+/g, '');

        if (!/^[$]/.test(result)) {       
            result = "$" + result;
        }
        return result;
      }
      
    const input = resultado.PRICE;
    const result = getFormattedNumber(input);

    return ( 
        <ResultadoDiv>            
            <Precio>EL precio justo ahora es: <span>{result}</span></Precio>           
            <Info>EL precio más alto del día es: <span>{resultado.HIGHDAY}</span></Info>           
            <Info>EL precio más bajo del día es: <span>{resultado.LOWDAY}</span></Info>           
            <Info>Variación las últimas 24h: <span>{resultado.CHANGEPCT24HOUR}</span></Info>           
            <Info>última actualización: <span>{resultado.LASTUPDATE}</span></Info>           
        </ResultadoDiv>
     );
}
 
export default Cotizacion;
