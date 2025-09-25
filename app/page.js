import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Gift, PartyPopper, Table } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Birthday Celebration Header */}
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4 mb-6">
              <PartyPopper className="h-12 w-12 text-yellow-500" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Happy Birthday!
              </h1>
              <Gift className="h-12 w-12 text-yellow-500" />
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              Celebrating <span className="font-semibold text-purple-600">John's Special Day</span>
            </p>
            <p className="text-lg text-gray-500">Join us for an unforgettable celebration!</p>
          </div>

          {/* Event Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Date</h3>
              <p className="text-gray-600">Saturday, December 16th</p>
              <p className="text-sm text-gray-500">2023</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
              <Clock className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Time</h3>
              <p className="text-gray-600">6:00 PM - 11:00 PM</p>
              <p className="text-sm text-gray-500">Cocktails & Dinner</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Venue</h3>
              <p className="text-gray-600">Grand Ballroom</p>
              <p className="text-sm text-gray-500">123 Celebration Street</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              Party Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">150+</div>
                <div className="text-sm text-gray-600">Guests Invited</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">3</div>
                <div className="text-sm text-gray-600">Live Bands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Course Dinner</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">∞</div>
                <div className="text-sm text-gray-600">Memories</div>
              </div>
            </div>
          </div>

          {/* Action Buttons
          <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
            <Link href="/guest-list">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                <Users className="h-5 w-5 mr-2" />
                Manage Guest List
              </Button>
            </Link>
            
            <Link href="/error-correction">
              <Button variant="outline" className="w-full sm:w-auto border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg rounded-full transition-all duration-300">
                <PartyPopper className="h-5 w-5 mr-2" />
                Correction Center
              </Button>
            </Link>
          </div> */}
          {/* Action Buttons */}
<div className="flex flex-col gap-2 md:flex-row items-center justify-center">
  <Link href="/guest-list">
    <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
      <Users className="h-5 w-5 mr-2" />
      Manage Guest List
    </Button>
  </Link>
  
  <Link href="/table-overview">
    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
      <Table className="h-5 w-5 mr-2" />
      View Tables
    </Button>
  </Link>
  
  <Link href="/error-correction">
    <Button variant="outline" className="w-full sm:w-auto border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg rounded-full transition-all duration-300">
      <PartyPopper className="h-5 w-5 mr-2" />
      Correction Center
    </Button>
  </Link>
</div>

          {/* Birthday Message */}
          <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
            <blockquote className="text-lg italic text-gray-700 text-center">
              "Age is merely the number of years the world has been enjoying you. Today, we celebrate the wonderful person you are and the incredible impact you've had on all our lives!"
            </blockquote>
            <div className="text-center mt-4 text-gray-600">
              - With love from your family and friends
            </div>
          </div>
        </div>
      </section>

      {/* Floating Decorations */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="fixed top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 blur-lg animate-bounce"></div>
      <div className="fixed bottom-32 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-25 blur-xl animate-pulse delay-1000"></div>
      <div className="fixed bottom-20 right-32 w-12 h-12 bg-blue-200 rounded-full opacity-40 blur-md animate-bounce delay-500"></div>
    </div>
  );
}