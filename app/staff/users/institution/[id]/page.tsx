import React from 'react';
import InstitutionClient from './InstitutionClient';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}
export async function generateStaticParams() {
  return [];
}



export default async function InstitutionDetailsPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  // Resolve the params promise
  const resolvedParams = await params;
  
  return <InstitutionClient id={resolvedParams.id} />;
}