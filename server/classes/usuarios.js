// {
//     id: '0dzUJQ-nTThEquKBAAAB',
//     nombre: 'Raul',
//     sala: 'Video Juegos'
// }


class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;

    }

    getPersona(id) {
        // En este Arreglo capturamos la primera posicion[0], sino encuentra devuelve undefined 
        let persona = this.personas.filter(reg => reg.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(reg => reg.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        //filtramos a todos menos esa persona(id) y reemplazamos this.personas (se excluyo ese Id)
        this.personas = this.personas.filter(reg => reg.id != id);

        return personaBorrada;

    }


}


module.exports = {
    Usuarios
}