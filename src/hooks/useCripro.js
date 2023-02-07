import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 0rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    font-family: 'Bebas Neue', cursive;
    color: #000;
    text-align: center;
    font-size: 1rem;
    margin-top: 0rem;
    display: block;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
`;

const useCripto = (label, stateInicial, opciones) => {

    // State del Custom Hook
    const [ state, actualizarState] = useState(stateInicial);

    const SelectCrito = () => (
        <>
            <Label>{label}</Label>
            <Select
                onChange={(opt) => actualizarState(opt.target.value)}
                value={state}
            >
                <option value="">- Seleccione -</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </>
    )

    // Retornar satate, interfaz y fnc que modifica el state
    return [state, SelectCrito, actualizarState];
};

export default useCripto;

