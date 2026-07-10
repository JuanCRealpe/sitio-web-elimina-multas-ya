export interface Bloque {
    _id: string;
    tipo: 'titulo' | 'subtitulo' | 'texto' | 'imagen' | 'archivo' | 'boton-externo' | 'boton-interno';
    contenido: string | null;
    nombre: string | null;
    url: string | null;
    redirige: string | null;
}

export interface Step {
    _id: string;
    courseId: string;
    titulo: string;
    orden: number;
    bloques: Bloque[];
}