'use client';
import { Suspense } from 'react';
import OrderSuccess from './OrderSuccess';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccess />
    </Suspense>
  );
}
