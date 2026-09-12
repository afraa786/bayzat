import Nav from "./Nav";
import LeadCapture from "./LeadCapture";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

export default function PageShell({ children, mainClassName = "" }) {
  return (
    <>
      <Nav />
      <main className={mainClassName}>{children}</main>
      <LeadCapture />
      <Footer />
      <CustomCursor />
    </>
  );
}
