import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
const Navbar = dynamic(() => import("@/components/Header"), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '200px' }} />,
});

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    <>

        <Navbar />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <main>{children}</main>
      
        <Footer key="layout-footer" />
       
    </>
  )
};

export default Layout;
