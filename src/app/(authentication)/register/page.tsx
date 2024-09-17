"use client"
import FormRegistration from "@/components/FormRegistration";
import Head from "next/head";

export default function App() {


  return (
    <>
      <Head>
        <title>BookFinder - Cadastrar</title>
        <meta name="description" content="Crie sua conta no BookFinder" />
      </Head>
      <FormRegistration></FormRegistration>
    </>
  );
}
