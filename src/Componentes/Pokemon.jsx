import {useEffect, useState} from "react";
import "../Estilos/Pokemon.css";

function Pokemon() {

    const [pokemon, setPokemon] = useState(null)
    const [numero, setNumero] = useState(1)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchpokemon = async () => {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
                .then(res => res.json())
                .then(data => setPokemon(data))
        }
        fetchpokemon()
    }, [numero])


    function sumar() {
        setNumero(numero + 1);
    }

    function restar() {
        setNumero(numero - 1);
    }

    function enviado(e) {
        e.preventDefault()
        const valor = (document.getElementById("Buscador").value)
        cambioBusqueda(valor)
    }

    function cambioBusqueda(valor) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`)
            .then(res => res.json())
            .then(data => {
                setNumero(data.id);
                setError("")
            })
            .catch(e => {
                setError("Pokemon no existente");
                console.log(e)
            })
    }

    if (!pokemon) {
        return (
            <p>Error con el pokemon actual</p>
        )
    }

    return (
        <>
            <form onSubmit={enviado}>
                <fieldset>
                    <label htmlFor="Buscador">Nombre: </label>
                    <input id="Buscador" type="text"/>
                    <label htmlFor="Buscador"> <button>Buscar</button></label>
                    <label htmlFor="Buscador" className="error"> {error}</label>
                </fieldset>
            </form>
            <div className={"Tarjeta " + pokemon.types[0].type.name}>
                <div className="informacion">
                    <h3>#{pokemon.id} {pokemon.name}</h3>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                </div>
                <div className="estadisticas">
                    <p><strong>Habilidad 1</strong>: {pokemon.abilities[0].ability.name}</p>
                    <p><strong>Habilidad
                        2</strong>: {pokemon.abilities[1] ? pokemon.abilities[1].ability.name : "No tiene"}</p>
                    <p><strong>Habilidad
                        3</strong>: {pokemon.abilities[2] ? pokemon.abilities[2].ability.name : "No tiene"}</p>
                    <p><strong>HP</strong>: {pokemon.stats[0].base_stat}</p>
                    <p><strong>Ataque</strong>: {pokemon.stats[1].base_stat}</p>
                    <p><strong>Defensa</strong>: {pokemon.stats[2].base_stat}</p>
                    <p><strong>Ataque Especial</strong>: {pokemon.stats[3].base_stat}</p>
                    <p><strong>Defensa Especial</strong>: {pokemon.stats[4].base_stat}</p>
                    <p><strong>Velocidad</strong>: {pokemon.stats[5].base_stat}</p>
                    <p>
                        <strong>Total</strong>: {pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat}
                    </p>
                </div>
            </div>
            <div className="Botones">
                <button onClick={restar} disabled={numero <= 1 || numero >= 1025}>Anterior</button>
                <button onClick={sumar} disabled={numero >= 1025}>Siguiente</button>
            </div>
        </>
    )
}

export default Pokemon
