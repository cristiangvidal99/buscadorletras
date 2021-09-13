import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Letra from './components/Letra';
import Info from './components/Info';
import axios from 'axios';

function App() {

  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  useEffect( () => {
    if(Object.keys(busquedaLetra).length === 0) return;

    const consultarApi = async () => {
      const {artista, cancion} = busquedaLetra;

      const urlLyricsApi = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlAudiodbApi = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      
      const [letra, informacion] = await Promise.all([
        await axios.get(urlLyricsApi),
        await axios.get(urlAudiodbApi)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
    }
    consultarApi();

  }, [busquedaLetra, info]);

  return (
   <Fragment>
     <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <Info 
              info={info}
            />
          </div>
          <div className='col-md-6'>
            <Letra 
              letra={letra}
            />
          </div>
        </div>
      </div>
      
    </Fragment>
  );
}

export default App;
