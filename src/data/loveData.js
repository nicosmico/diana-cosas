// ─── Fecha de inicio de la relación ──────────────────────────────
export const START_DATE = new Date('2025-11-29T22:10:00');

// ─── Helper: días exactos desde START_DATE ────────────────────────
export const getDaysElapsed = () => {
    const diffMs = new Date() - START_DATE;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

// ─── Equivalencias (cálculos reales) ─────────────────────────────
// Para agregar más, añadí un objeto { id, icon, getEquivalence, extraMessages } a este array.
// ⚠️  El `id` debe ser único y NUNCA cambiar — es la clave del localStorage.
// getEquivalence(days) recibe los días transcurridos y devuelve el string a mostrar.
export const EQUIVALENCES = [
    {
        id: 'tubthumping',
        icon: '🎵',
        // Tubthumping - Chumbawamba: 4 min 37 seg = 277 seg
        getEquivalence: (days) => {
            const times = Math.floor((days * 24 * 60 * 60) / 277);
            return `escuchar ${times.toLocaleString('es')} veces la canción Tubthumping de Chumbawamba. Si, esa que que tiene la portada de la wawa extraña.`;
        },
        extraMessages: ["I GET KNOCKED DOWN! 🗣️", "BUT I GET UP AGAIN 🗣️"]
    },
    {
        id: 'sex-and-the-city',
        icon: '📺',
        // Sex and the City: 94 episodios × 30 min = 2820 min
        getEquivalence: (days) => {
            const times = (days * 24 * 60 / 2820).toFixed(1);
            return `ver ${times} veces Sex and the City completa`;
        },
        extraMessages: [
            "Yo no la he visto, pero eso salía en cuando lo busqué",
            "La puse porque es tu favorita 🤓☝️"
        ]
    },
    {
        id: 'caminata',
        icon: '🚶',
        // Caminando: 15 minutos de mi casa a la suya
        getEquivalence: (days) => {
            const times = Math.floor(days * 24 * 60 / 15);
            return `caminar ${times.toLocaleString('es')} veces de mi casa a la tuya`;
        },
        extraMessages: ["Aunque siempre voy en auto, pero el resultado queda más grande si lo calculo así jaja"]
    },
];
