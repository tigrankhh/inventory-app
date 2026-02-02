"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../libsupabase'; // ПУТЬ ИСПРАВЛЕН
import { 
  Plus, 
  Search, 
  Package, 
  ChevronRight, 
  Camera, 
  QrCode, 
  Settings,
  Bell,
  LogOut,
  RefreshCcw,
  LayoutDashboard
} from 'lucide-react';

export default function InventorySystem() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
    }
  }

  // Здесь остальная часть твоего UI...
  // (Я сократил код для краткости, но ты вставь свой полный код интерфейса, 
  // ГЛАВНОЕ сохрани верхнюю строку импорта '../libsupabase')
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Pro 🚀</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="p-4 bg-gray-800 rounded-xl border border-gray-700">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
