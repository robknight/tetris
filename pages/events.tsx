import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { Heading } from "../components/Typography";

interface Props {
  events: any[]
}

export default function Home({ events }: Props) {
  return (
    <Layout>
      <Head>
        <title>Nextjs x Supabase</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>Upcoming events</Heading>
 
      <div>
          <div>
            {events.map((event) => {
              return <div key={event.id}><Link href={`/event/${event.id}`}>{ event.name }</Link></div>
            })}
          </div>
      </div>
    </Layout>
  );
 }

 const fetchEvents = async () => {
  // const user = supabase.auth.user();
   try {
     const { data, error } = await supabase
       .from("events")
       .select("*");

     if (error) throw error;
     console.log(data);
     return data;
   } catch (error) {
     console.log(error);
     return null;
   }
 };

export async function getServerSideProps() {
  const events = await fetchEvents();

  return {
    props: {
      events
    }
  }
}