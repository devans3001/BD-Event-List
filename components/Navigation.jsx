

// components/Navigation.js
import React from 'react';
import { Button } from './ui/button';
import { Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Home className="h-6 w-6" />
            Guest Manager
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/guest-list">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Guest List
              </Button>
            </Link>
            
            <Link href="/error-correction">
              <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-200">
                <AlertTriangle className="h-4 w-4" />
                Correction Center
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}