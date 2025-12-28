import { useState, useEffect } from 'react';


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
