import React, { useEffect }   from 'react';
import type { Category }      from '../types';

interface AdminCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (action: 'CREATE' | 'UPDATE', initialCategory: Category) => void;
  initialCategory: Category | null;
  mode?: 'create' | 'edit';
}

const AdminCategoryModal: React.FC<AdminCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialCategory = null,
  mode = 'create',
}) => {

  const [categoryName, setCategoryName] = React.useState<string>('');

  useEffect(() => {
    setCategoryName(initialCategory ? initialCategory.category : '');
  }, [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mode === 'create' ? 'CREATE' : 'UPDATE', initialCategory ? {...initialCategory, category: categoryName} : {id: 0, category: categoryName});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {mode === 'create' ? 'Create New Category' : 'Edit Category'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter category name"
                required
                autoFocus
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
              >
                {mode === 'create' ? 'Create Category' : 'Update Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryModal;