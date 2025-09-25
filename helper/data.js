import { faker } from "@faker-js/faker";



 const usedCodes = new Set();

  const getUniqueCode = () => {
    let code;
    do {
      code = `BDAY${faker.string.numeric(3)}`;
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
  };


export function generateFakeUsers(count = 10) {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    access_code: getUniqueCode(),
    arrived: false,
    plus_ones: faker.number.int({ min: 1, max: 2 }),

  }));
}


export function calculateTableStats(guests) {
  const tables = {};
  
  guests.forEach(guest => {
    const tableNum = guest.tableNum || 'No Table'; // Use 'No Table' for guests without table assignment
    
    if (!tables[tableNum]) {
      tables[tableNum] = {
        tableNum,
        totalGuests: 0,
        arrivedGuests: 0,
        guestCount: 0,
        arrivedCount: 0
      };
    }
    
    // Each guest counts as 1 + their plus_ones
    const guestTotal = (parseInt(guest.plus_ones) || 0);
    
    tables[tableNum].totalGuests += guestTotal;
    tables[tableNum].guestCount += 1;
    
    if (guest.arrived) {
      tables[tableNum].arrivedGuests += guestTotal;
      tables[tableNum].arrivedCount += 1;
    }
  });
  
  // Convert to array and sort by table number
  return Object.values(tables).sort((a, b) => {
    if (a.tableNum === 'No Table') return 1;
    if (b.tableNum === 'No Table') return -1;
    return a.tableNum - b.tableNum;
  });
}