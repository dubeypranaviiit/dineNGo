'use client';
import React from 'react';
import AllReservation from '@/components/admin/reservation-info/AllReservation';

const ApprovedBookingsPage = () => {
  return (
    <div>
      <AllReservation filterStatus="confirmed" />
    </div>
  );
};

export default ApprovedBookingsPage;
