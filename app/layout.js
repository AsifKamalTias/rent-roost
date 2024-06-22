import { GlobalProvider } from "@/contexts/GlobalContext";
import AuthProvider from "./_components/AuthProvider";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photoswipe/lib/photoswipe.css';
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
  title: "Rent Roost | Find The Perfect Rental",
  description: "Find your dream rental property.",
  keywords: "rental, property",
};

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <ToastContainer />
            <Header />
            <main className="min-h-[80vh]">{children}</main>
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
