import { useLocation, Link } from 'react-router-dom';
import { CiInboxIn, CiInboxOut } from 'react-icons/ci';
import { IoBarChartOutline } from 'react-icons/io5';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-t border-gray-200 flex justify-around items-center p-3">
      <Link
        to="/"
        className={`flex flex-col items-center p-2 ${
          location.pathname === "/" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <IoBarChartOutline className="text-xl" />
        <span className="text-xs mt-1">Статистик</span>
      </Link>
      <Link
        to="/income"
        className={`flex flex-col items-center p-2 ${
          location.pathname === "/income" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <CiInboxIn className="text-xl" />
        <span className="text-xs mt-1">Приход</span>
      </Link>
      <Link
        to="/expense"
        className={`flex flex-col items-center p-2 ${
          location.pathname === "/expense" ? "text-red-500" : "text-gray-500"
        }`}
      >
        <CiInboxOut className="text-xl" />
        <span className="text-xs mt-1">Расход</span>
      </Link>
    </nav>
  );
}
export default Navigation