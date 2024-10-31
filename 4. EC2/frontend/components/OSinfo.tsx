import { useEffect, useState } from 'react';

interface OSdata {
  type: string
  hostname: string
  cpu_num: number
  total_mem: string
}

const OSinfo = () => {
  const LOADING_WORD = 'Loading...'
  const [data, setData] = useState<OSdata | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/os');
      const result = await response.json() as OSdata;
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <h1 className="title">About OS</h1>
      <section className="card">
        <h2 className="sub-title">OS Type</h2>
        <p className="type">{data?.type ?? LOADING_WORD}</p>
        <h2 className="sub-title">Name</h2>
        <p className="hostname">{data?.hostname ?? LOADING_WORD}</p>
        <h2 className="sub-title">CPU Number</h2>
        <p className="cpu-num">{data?.cpu_num ?? LOADING_WORD} Core</p>
        <h2 className="sub-title">Total Memory</h2>
        <p className="total-mem">{data?.total_mem ?? LOADING_WORD}</p>
      </section>
    </div>
  );
}

export default OSinfo;