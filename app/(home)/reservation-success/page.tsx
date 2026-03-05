'use client';

import { Suspense } from 'react';
import ReservationSuccess from './ReservationSuccess';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservationSuccess />
    </Suspense>
  );
}
