// ejemplo de TypeScript

// Definición de una interfaz
interface Persona {
    nombre: string;
    edad: number;
    saludar: () => void;
}

// Implementación de la interfaz
const persona: Persona = {
    nombre: "Juan",
    edad: 30,
    saludar: function() {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    }
};

// Llamada al método saludar
persona.saludar();