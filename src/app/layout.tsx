import { ToastContainer } from "react-toastify";
import "./globals.css";
import LayoutProvider from "@/components/provider/LayoutProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      {children}
      <ToastContainer />
    </LayoutProvider>
  );
}
