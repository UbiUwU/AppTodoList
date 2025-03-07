"use strict";
// ejemplo de TypeScript
// Implementación de la interfaz
const persona = {
    nombre: "Juan",
    edad: 30,
    saludar: function () {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    }
};
// Llamada al método saludar
persona.saludar();
