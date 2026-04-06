import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen font-sans flex flex-col text-slate-800">
            <Header />

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-3 lg:px-8 lg:pb-8 lg:pt-4 animate-fade-in relative z-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default DashboardLayout;
