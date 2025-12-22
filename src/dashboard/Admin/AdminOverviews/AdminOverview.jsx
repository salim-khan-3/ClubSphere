import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { auth } from '../../../firebase/firebase.init'; 

const AdminOverview = () => {

    
    const getAdminToken = async () => {
        const user = auth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        return null;
    };

    
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const token = await getAdminToken();
            const res = await axios.get('https://club-sphere-server-six.vercel.app/admin/overview-stats', {
                headers: { authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    });

    const { data: chartData = [], isLoading: chartLoading } = useQuery({
        queryKey: ['admin-chart'],
        queryFn: async () => {
            const token = await getAdminToken();
            const res = await axios.get('https://club-sphere-server-six.vercel.app/admin/chart-data', {
                headers: { authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    });

    if (statsLoading || chartLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <header className="mb-10">
                <h2 className="text-4xl font-extrabold text-gray-800">Dashboard</h2>
                <p className="text-gray-500 mt-2">Welcome back! Here is what's happening today.</p>
            </header>

            {/* --- Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Users" value={stats.totalUsers} color="bg-blue-600" />
                <StatCard title="Total Clubs" value={stats.totalClubs} color="bg-emerald-600" />
                <StatCard title="Memberships" value={stats.totalMembership} color="bg-amber-600" />
                <StatCard title="Revenue" value={`$${stats.totalPayments}`} color="bg-slate-800" />
            </div>

            {/* --- Recharts Section --- */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-700 mb-8">Memberships per Club Distribution</h3>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                            />
                            <YAxis 
                                allowDecimals={false} 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                            />
                            <Tooltip 
                                cursor={{ fill: '#f9fafb' }} 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="value" barSize={45} radius={[10, 10, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};


const StatCard = ({ title, value, color }) => (
    <div className={`${color} p-6 rounded-3xl shadow-lg text-white`}>
        <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{title}</p>
        <h4 className="text-4xl font-bold mt-2">{value}</h4>
    </div>
);

export default AdminOverview;