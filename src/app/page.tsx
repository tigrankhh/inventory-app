import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { 
  PlusIcon, 
  SearchIcon, 
  FilterIcon, 
  PackageOpen,
  Edit2,
  Trash2
} from 'lucide-react';

// --- Types ---

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  updatedAt: string;
  userId: string;
}

interface PageProps {
  searchParams: {
    query?: string;
    category?: string;
  };
}

// --- Mock Data Service (Ready for DB integration) ---

async function getInventoryData(userId: string): Promise<InventoryItem[]> {
  // Simulate database latency
  return [
    {
      id: '1',
      name: 'MacBook Pro M3',
      category: 'Electronics',
      quantity: 12,
      status: 'In Stock',
      updatedAt: '2024-03-20',
      userId,
    },
    {
      id: '2',
      name: 'Dell UltraSharp 27"',
      category: 'Peripherals',
      quantity: 2,
      status: 'Low Stock',
      updatedAt: '2024-03-19',
      userId,
    },
    {
      id: '3',
      name: 'Logitech MX Master 3S',
      category: 'Peripherals',
      quantity: 0,
      status: 'Out of Stock',
      updatedAt: '2024-03-18',
      userId,
    },
    {
      id: '4',
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      quantity: 25,
      status: 'In Stock',
      updatedAt: '2024-03-17',
      userId,
    },
  ];
}

// --- Server Component ---

export default async function InventoryPage({ searchParams }: PageProps) {
  // 1. Session Verification
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  // 2. Data Fetching (Scoped to User)
  const userId = (session.user as any).id || 'default_user';
  const rawData = await getInventoryData(userId);

  // 3. Server-side Filtering Logic
  const query = searchParams.query?.toLowerCase() || '';
  const categoryFilter = searchParams.category || 'All';

  const filteredItems = rawData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(rawData.map((i) => i.category)))];

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full min-h-screen bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inventory Management</h1>
          <p className="text-slate-500 mt-1">
            Logged in as <span className="font-medium text-slate-700">{session.user.email}</span>
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-100">
          <PlusIcon className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-slate-200 w-px h-8 hidden sm:block mx-2" />
          <FilterIcon className="w-4 h-4 text-slate-500" />
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-[200px] cursor-pointer shadow-sm">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Section */}
      {filteredItems.length > 0 ? (
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Item Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 font-semibold text-slate-900">{item.name}</td>
                    <td className="px-6 py-5">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-700 font-mono font-medium">{item.quantity} units</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-tight
                          ${item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : ''}
                          ${item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : ''}
                          ${item.status === 'Out of Stock' ? 'bg-rose-100 text-rose-700' : ''}
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
            Showing {filteredItems.length} assets available for this user session.
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/30">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 mb-6">
            <PackageOpen className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Inventory Empty</h3>
          <p className="text-slate-500 max-w-sm text-center mt-2 font-medium">
            No items match your current selection. Adjust your filters or start adding new inventory to track.
          </p>
          <button className="mt-8 text-blue-600 font-bold text-sm hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
