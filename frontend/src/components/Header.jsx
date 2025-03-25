const Header = () => {
  return (
    <header className="header text-center p-4 border-b-2 border-black">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl">DAYANANDA SAGAR COLLEGE OF ENGINEERING</h2>
        <p className="text-sm italic">(An Autonomous Institute affiliated to Visvesvaraya Technological University (VTU), Belagavi, Approved by AICTE and UGC, Accredited by NAAC with 'A' grade & ISO 9001-2015 Certified Institution)</p>
        <h3 className="font-bold text-lg">Department of Information Science and Engineering</h3>
      </div>
      <h1 className="text-2xl mt-4">Course Allotment Tool</h1>
      <nav className="mt-2">
        <a href="/" className="mx-2">Home</a>
        <a href="/upload" className="mx-2">Upload</a>
        <a href="/rules" className="mx-2">Guidelines</a>
      </nav>
    </header>
  );
};

export default Header;


