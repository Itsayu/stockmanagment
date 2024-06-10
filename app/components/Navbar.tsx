import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-white font-bold text-xl cursor-pointer">Niwi.ai</span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/home">
            <span className="text-white cursor-pointer">Home</span>
          </Link>
          <Link href="/">
            <span className="text-white cursor-pointer">Products</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
