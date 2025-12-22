import { useState, useEffect } from 'react';

/**
 * Custom hook para determinar cuántas cards mostrar en el carousel
 * según el tamaño de la pantalla
 * 
 * @returns número de cards a mostrar (1 para móvil, 2 para tablet, 3 para desktop)
 */
export const useResponsiveCards = () => {
    const [cardsToShow, setCardsToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 768) { 
                setCardsToShow(1);
            } else if (width >= 768 && width < 1024) {
                setCardsToShow(2);
            } else {
                setCardsToShow(3);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return cardsToShow;
};
