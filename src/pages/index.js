import { useState } from 'react';
import Head from 'next/head';

import { RoomAllocation, RoomRequest } from '@/components';
import { AppLayout } from '@/layouts';

const Home = () => {
  const [request, setRequest] = useState();
  const { rooms, ...guest } = request ?? {};

  return (
    <>
      <Head>
        <title>ROOME</title>
      </Head>
      <main className="flex size-full items-center justify-center p-4 md:p-8">
        <AppLayout>
          {request ? (
            <RoomAllocation
              guest={guest}
              rooms={rooms}
              // onChange={(res) => console.log(res)}
              onCancel={() => setRequest()}
            />
          ) : (
            <RoomRequest onSubmit={setRequest} />
          )}
        </AppLayout>
      </main>
    </>
  );
};

export default Home;
