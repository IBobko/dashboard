import React, { useEffect, useState } from 'react';

interface Item {
  companyName: string;
  rate: number;
  from: string;
  to: string;
}

function HomePage() {
  const [data, setData] = useState<Item[] | null>(null);

  useEffect(() => {

  }, []);

  return (
    <div>
      <h1>New Page</h1>

    </div>
  );
}

export default HomePage;
