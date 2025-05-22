import React from 'react';
import InstitutionClient from './InstitutionClient';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function InstitutionDetailsPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  // Resolve the params promise
  const resolvedParams = await params;
  
  return <InstitutionClient institutionId={resolvedParams.id} />;
}