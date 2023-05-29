import React from 'react';

export default function Footer() {
  return (
    <div className="hidden px-3 pb-1 pt-2 text-center text-xs text-black/50 dark:text-white/50 md:block md:px-4 md:pb-4 md:pt-3 fa">
      <a
        href="https://plusgpt.ir"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        {import.meta.env.VITE_APP_TITLE || 'PlusGPT '}      در دسترس همگی

      </a>

    </div>
  );
}
