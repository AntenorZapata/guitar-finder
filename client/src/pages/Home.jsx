import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div />
  );
}

export default Home;