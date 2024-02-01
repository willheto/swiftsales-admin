import { useState, useEffect } from 'react';

function useMobile(breakpoint = 850) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= breakpoint);
		};

		// Initial check
		handleResize();

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [breakpoint]);

	return isMobile;
}

export default useMobile;
