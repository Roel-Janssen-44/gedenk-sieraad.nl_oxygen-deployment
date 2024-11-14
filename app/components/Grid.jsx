'use client';

import * as React from 'react';

export default function Grid({children}) {
  return (
    <div
      className={`w-full flex flex-col items-center sm:flex-row flex-wrap justify-center sm:justify-between gap-2`}
    >
      {children}
    </div>
  );
}
