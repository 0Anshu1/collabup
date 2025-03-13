import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-blue-400 hover:scale-105 transition-transform duration-300">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M21 14h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2zM4 18c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.29c-.68.46-1.45.82-2.28 1.05C16.32 16.5 14.24 17 12 17s-4.32-.5-5.72-1.24c-.83-.23-1.6-.59-2.28-1.05V18zm.14-2.93c.34.14.69.26 1.06.36C7.16 16.1 9.45 16.5 12 16.5s4.84-.4 6.8-1.07c.37-.1.72-.22 1.06-.36C20.57 14.55 21 13.82 21 13v-2c0-.18-.04-.36-.1-.54-.68.54-1.45.97-2.28 1.27-2.1.74-4.85 1.27-6.62 1.27s-4.52-.53-6.62-1.27c-.83-.3-1.6-.73-2.28-1.27-.06.18-.1.36-.1.54v2c0 .82.43 1.55 1.14 2.07zM12 3C8.03 3 4.83 4.46 4.14 6.29 3.95 6.7 4 7.16 4 7.5V9c0 1.1 1.34 2.11 3.48 2.77C9.5 12.33 10.85 12.5 12 12.5s2.5-.17 4.52-.73C18.66 11.11 20 10.1 20 9V7.5c0-.34.05-.8-.14-1.21C19.17 4.46 15.97 3 12 3z"/>
      </svg>
      <span className="text-xl font-semibold">CollabUp</span>
    </Link>
  );
}