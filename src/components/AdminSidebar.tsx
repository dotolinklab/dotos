
import { Book, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-sidebar border-r shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-bold text-purple-800">알파고 관리자</h1>
      </div>
      <nav className="px-3 py-2">
        <NavLink
          to="/admin/blog"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive 
                ? "bg-purple-100 text-purple-900" 
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
          end
        >
          <LayoutDashboard size={20} />
          새 포스트 작성
        </NavLink>
        <NavLink
          to="/admin/blog/posts"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive 
                ? "bg-purple-100 text-purple-900" 
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Book size={20} />
          포스트 관리
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
