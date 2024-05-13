const useGetDealerHours = () =>
  // TODO: SCC-6561 Read data from cookies and call Dealer API to get hours info

  // mock data
  ({
    name: 'Honda Downtown',
    link: '#',
    hours: {
      status: 'closed',
      message: 'Opens at 9:00am',
    },
  });
export default useGetDealerHours;
