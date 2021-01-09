function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 text-center text-xs p-3 absolute bottom-0 w-full">
      &copy; Copyright {thisYear}
    </footer>
  );
}

export default Footer;
