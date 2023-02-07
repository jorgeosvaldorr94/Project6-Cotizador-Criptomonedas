import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import axios from 'axios';
import imagen from './log-bit3.png'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;

`;

const Heading = styled.h1`
  font-family: 'Bebas Neve', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  // state para guardar la moneda aqui en el componente principal  
  const [moneda, guardarMoneda] = useState('');
  
  // state para guardar la criptomoneda aqui en el componente principal  
  const [criptomoneda, guardarCriptomoneda] = useState('');

  //state para guardar los resultados generales
  const [resultado, guardarResultado] = useState({});

  //State para la moneda nacional
  //const [cambiar, guardarCambiar] = useState(false);

  //para el spinner
  const [cargando, guardarCargando] = useState(false);

  //
  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      //evitamos la ejecucion la primera vez
      if(moneda === '') return;

      let cambio = moneda
      if(cambio === 'CUP') {
        //guardarCambiar(true);
        cambio = 'USD';
      };
  
      //consultar la API para tener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${cambio}`;
  
      const resultado = await axios.get(url);

      //mostrar Spinner
      guardarCargando(true);

      //ocultar el spinner y mostrar resultados
      setTimeout(() => {

        //cambiar el estado de cargando
        guardarCargando(false);

        //guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][cambio]);
      }, 2500);

    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  //Mostrar spinner o resultado
  const component = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado} />
  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt='Imagen Crypto'
        />
      </div>
      <div>
        <Heading>Cotizador de Criptomonedas 'El Pavo'!!</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {component}

      </div>
    </Contenedor>
  );
}

export default App;
