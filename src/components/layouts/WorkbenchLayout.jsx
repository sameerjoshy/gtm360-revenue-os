
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Database,
    Crosshair,
    Activity,
    ChevronRight,
    ShieldCheck,
    TrendingUp
} from 'lucide-react';

const WorkbenchLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white">
                        G
                    </div>
                    <span className="font-bold text-lg tracking-tight">GTM-360</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <p className="sr-only">Main Navigation</p>

                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Revenue Swarms
                    </div>

                    <NavLink
                        to="/agent-workbench"
                        end
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <LayoutDashboard size={18} />
                        <span className="text-sm font-medium">Control Center</span>
                    </NavLink>

                    <NavLink
                        to="/agents/sniper"
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Crosshair size={18} />
                        <span className="text-sm font-medium">Sniper Queue</span>
                    </NavLink>

                    <NavLink
                        to="/agents/sales"
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Activity size={18} />
                        <span className="text-sm font-medium">Sales War Room</span>
                    </NavLink>

                    <NavLink
                        to="/agents/expansion"
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <TrendingUp size={18} />
                        <span className="text-sm font-medium">Expansion Radar</span>
                    </NavLink>

                    <div className="mt-6 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        RevOps Grid
                    </div>

                    <NavLink
                        to="/agents/revops"
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <ShieldCheck size={18} />
                        <span className="text-sm font-medium">System Health</span>
                    </NavLink>

                    <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md cursor-not-allowed opacity-70">
                        <Database size={18} />
                        <span className="text-sm font-medium">Dossiers</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 px-3 py-2 w-full text-left text-slate-400 hover:text-white transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Exit to Website</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                {/* Top Header (App Context) */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Organization</span>
                        <ChevronRight size={14} />
                        <span className="font-semibold text-slate-900">Your Workspace</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                            <Settings size={16} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            JD
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default WorkbenchLayout;
