import React, {useState} from 'react';
import PropTypes from 'prop-types';
const Formulario = ({guardarBusquedaLetra}) => {

    const [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    });

    const [error, guardarError] = useState(false);

    const {artista, cancion} = busqueda;

    // funcion que lee el contenido de los input
    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
    
    // consultar las API
    const buscarInformacion = e => {
        e.preventDefault();

        if(artista.trim() === '' || cancion.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        // pasar al componente principal

        guardarBusquedaLetra(busqueda);
    } 
    return ( 
        <div className='bg-info'>
            {error ? <p className='alert alert-danger text-center p-2'>Todos los campos son obligatorios</p> : null}
            <div className='container'>
                <div className='row'>
                    <form
                        onSubmit={buscarInformacion}
                        className='col card text-white bg-transparent mb-5 pt-5 pb-2'
                    >
                        <fieldset>
                            <legend className='text-center'>Buscador de canciones</legend>
                                <div className='row'> 
                                <div className='col-md-6'> 
                                    <div className='form-group'>
                                        <label>Artista</label>
                                        <input 
                                            onChange={actualizarState}
                                            value={artista}
                                            type='text'
                                            className='form-control'
                                            name='artista'
                                            placeholder='Nombre Artista'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Cancion</label>

                                        <input 
                                            onChange={actualizarState}
                                            type='text'
                                            className='form-control'
                                            name='cancion'
                                            placeholder='Nombre Cancion'
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type='submit'
                                className='bt btn-primary float-lg-right'
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

Formulario.propTypes = {
    guardarBusquedaLetra: PropTypes.object.isRequired
}

export default Formulario;