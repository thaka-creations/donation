import React from 'react';
import { ArrowLeft, Building, Mail, Phone, MapPin, Users, Eye, UserPlus } from 'lucide-react';
import { cookies } from 'next/headers';
import axios from 'axios';
import InstitutionClient from './InstitutionClient';

interface InstitutionProfile {
  code: string;
  zip_code: string;
  phone_number: string;
  postal_address: string;
  physical_address: string;
}

interface Institution {
  id: string;
  username: string;
  name: string;
  institution_id: string;
  profile_info: InstitutionProfile;
}

interface Donee {
  id: string;
  username: string;
  name: string;
}

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  return []; // Return empty array since this is a dynamic route that depends on authentication
}

export default async function InstitutionDetailsPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  // Get auth tokens from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const jwtToken = cookieStore.get('jwt_token')?.value;

  if (!accessToken || !jwtToken) {
    // Handle unauthenticated state
    throw new Error('Authentication required');
  }

  try {
    // Fetch data on the server
    const [institutionRes, doneesRes] = await Promise.all([
      axios.get<{ details: Institution }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/institution/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            JWTAUTH: `Bearer ${jwtToken}`,
          },
        }
      ),
      axios.get<{ results: Donee[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/institution/list-institution-donnees?user_id=${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            JWTAUTH: `Bearer ${jwtToken}`,
          },
        }
      ),
    ]);

    const institution = institutionRes.data.details;
    const donees = doneesRes.data.results;

    // Pass data to client component
    return <InstitutionClient institution={institution} initialDonees={donees} />;
  } catch (error) {
    // Handle API errors
    console.error('Error fetching institution data:', error);
    throw new Error('Failed to fetch institution data');
  }
}