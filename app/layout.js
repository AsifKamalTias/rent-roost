import AuthProvider from "./_components/AuthProvider";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Find your dream rental property.",
  keywords: "rental, property",
};

export default function RootLayout({ children }) {
  return (
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
  );
}
