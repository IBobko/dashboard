import React, { useEffect, useState } from 'react';

function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/parse')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>New Page</h1>
      {data ? (
        data.title.map((item, index) => (
          <div key={index}>
            <h2>{item.companyName}</h2>
            <p>Rate: {item.rate}</p>
            <p>From: {item.from}</p>
            <p>To: {item.to}</p>
          </div>
        ))
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default HomePage;
