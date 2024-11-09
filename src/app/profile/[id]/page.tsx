import React from 'react'

async function page(props: any) {
  const params = await props.params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1>Your Details</h1>
        <h2 className='p-3 text-orange-300'>{params.id}</h2>
    </div>
  );
}

export default page
