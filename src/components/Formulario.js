import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripro';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda}) => {

    // state del listado de Criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);

    // state para la validacion del error
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'CUP', nombre: 'Peso Cubano'},
        {codigo: 'ARG', nombre: 'Peso Argentino'}
    ];

    // Utilizar el useMoneda, es importante saber en orden en el que se importa, aunque luego se le cambie el nombre, ej.. state-Seleccionar-actualizarState, aqui lo vamos a poner con otro nombre.
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS );

    // Utilizar useCripto
    const [criptomoneda, SelectCrito] = useCripto('Elige tu criptomoneda', '', listacripto);
   
    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            
            //Limite de criptomonedas
            const amount = 10;

            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${amount}&tsym=USD`;

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // cuando el usuariohace submit

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar que ambos campos esten llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    };
    
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ?
                <Error
                    mensaje='Todos los campos son obligatorios'
                />
            :
                null
            }

            <SelectMoneda/>

            <SelectCrito/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;
