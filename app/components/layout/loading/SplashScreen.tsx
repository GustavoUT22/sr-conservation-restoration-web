'use client';

import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'enter' | 'idle' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // Logo entra → espera → sale
    const idle = setTimeout(() => setPhase('idle'), 600);
    const exit = setTimeout(() => setPhase('exit'), 2000);
    const done = setTimeout(() => setPhase('done'), 2800);

    return () => {
      clearTimeout(idle);
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`${styles.splash} ${phase === 'exit' ? styles.splashExit : ''}`}>
      <span className={`${styles.logo} ${phase !== 'enter' ? styles.logoVisible : ''}`}>
        S.R
      </span>
    </div>
  );
}