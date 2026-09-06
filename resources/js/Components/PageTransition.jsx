import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function PageTransition({ children }) {
    const { url } = usePage();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState('enter');
    const previousUrl = useRef(null);

    useEffect(() => {
        if (previousUrl.current === null) {
            previousUrl.current = url;
            setDisplayChildren(children);
            return;
        }

        if (previousUrl.current === url) {
            // Keep local UI state (such as tabs and forms) in sync with the
            // latest render. The cached children are only needed during a
            // page-to-page transition.
            setDisplayChildren(children);
            return;
        }

        previousUrl.current = url;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            setDisplayChildren(children);
            setTransitionStage('enter');
            return;
        }

        setTransitionStage('leave');
        const timeout = setTimeout(() => {
            setDisplayChildren(children);
            setTransitionStage('enter');
        }, 120);

        return () => clearTimeout(timeout);
    }, [url, children]);

    return (
        <div
            className={`transform-gpu transition-[opacity,transform] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none ${transitionStage === 'enter' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[4px]'}`}
        >
            {displayChildren}
        </div>
    );
}
