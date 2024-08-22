"use client";
import CalendarComponent from "@/components/calendar";
import { Navbar } from "@/components/navbar";

export default function Calendar() {
  return (
    <section className="flex flex-col w-full h-full bg-fixed bg-cover bg-repeat-y">
      <Navbar />
      <CalendarComponent />
    </section>
  );
}