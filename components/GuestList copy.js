'use client';

import { useState, useEffect } from 'react';
import GuestItem from './GuestItem';
import QuickCheckIn from './QuickCheckIn';
import { useGuests, useQuickCheckIn, useUpdateGuestArrival } from './useGuest';

export default function GuestList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'arrived', 'notArrived'
  const [checkInMethod, setCheckInMethod] = useState('name'); // 'name' or 'code'
  const [quickCheckIn, setQuickCheckIn] = useState('');
   const [checkInError, setCheckInError] = useState('');

  const {data:guests=[],isLoading,error} = useGuests()
   const updateGuestMutation = useUpdateGuestArrival();
  const quickCheckInMutation = useQuickCheckIn();

  // console.log(data,"data")

    const handleStatusChange = (guestId, arrived) => {
    updateGuestMutation.mutate({ id: guestId, arrived });
  };


  const handleQuickCheckIn = async () => {
    if (!quickCheckIn.trim()) return;

    setCheckInError('');
    try {
      await quickCheckInMutation.mutateAsync({
        identifier: quickCheckIn.trim(),
        method: checkInMethod
      });
      setQuickCheckIn('');
    } catch (err) {
      setCheckInError(err.message);
    }
  };

  const filteredGuests = guests.filter(guest => {
    // Search filter
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.accessCode.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      filter === 'all' ? true :
        filter === 'arrived' ? guest.arrived :
          filter === 'notArrived' ? !guest.arrived : true;

    return matchesSearch && matchesStatus;
  });

  const arrivedCount = guests.filter(guest => guest.arrived).length;
  const notArrivedCount = guests.length - arrivedCount;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading guests...</div>
      </div>
    );
  }

    if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading guests: {error.message}</div>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          🎉 Birthday Party Guest List
        </h1>
        <p className="text-gray-600">Manage guest arrivals for the special celebration</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-bold text-2xl">{guests.length}</p>
            <p className="text-blue-600">Total Guests</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-bold text-2xl">{arrivedCount}</p>
            <p className="text-green-600">Arrived</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-orange-800 font-bold text-2xl">{notArrivedCount}</p>
            <p className="text-orange-600">Not Arrived</p>
          </div>
        </div>
      </div>


      {/* CHECK LATER  */}
      {/* <QuickCheckIn checkInError={checkInError} quickCheckIn={quickCheckIn} handleQuickCheckIn={handleQuickCheckIn} setQuickCheckIn={setQuickCheckIn} setCheckInMethod={setCheckInMethod} checkInMethod={checkInMethod} quickCheckInMutation={quickCheckInMutation}/> */}

      {/* Search and Filter Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or access code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${filter === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            All Guests ({guests.length})
          </button>
          <button
            onClick={() => setFilter('arrived')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${filter === 'arrived'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Arrived ({arrivedCount})
          </button>
          <button
            onClick={() => setFilter('notArrived')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${filter === 'notArrived'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Not Arrived ({notArrivedCount})
          </button>
        </div>
      </div>

      {/* Guest List */}
      <div className="space-y-4">
        {filteredGuests.map(guest => (
          <GuestItem 
            key={guest.id} 
            guest={guest} 
            onStatusChange={handleStatusChange}
            isLoading={updateGuestMutation.isPending}
          />
        ))}

        {filteredGuests.length === 0 && (
          <div className="text-center p-8 text-gray-500 bg-white rounded-lg">
            {searchTerm ? 'No guests found matching your search.' : `No guests in the ${filter} category.`}
          </div>
        )}
      </div>
    </div>
  );
}