import Banner from "./components/Banner";
import Header from "./components/Header";
import "../styles/globals.css";

export const metadata = {
  title: "Modernbizhub Blog",
  description:
    "We review tools and software useful for web developers and internet entrepeneurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*BANNER*/}
      <body className="max-w-7xl mx-auto">
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}
