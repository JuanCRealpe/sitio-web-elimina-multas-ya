export interface Bloque {
    _id: string;
    tipo: 'titulo' | 'subtitulo' | 'texto' | 'imagen' | 'video' | 'archivo' | 'boton-externo' | 'boton-interno' | 'boton-curso'; // ← agregados 'video' y 'boton-curso'
    contenido: string | null;
    nombre: string | null;
    url: string | null;
    redirige: any;
}

export interface Step {
    _id: string;
    courseId: string;
    titulo: string;
    orden: number;
    bloques: Bloque[];
}