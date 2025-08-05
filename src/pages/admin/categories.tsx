import { useLoaderData }      from 'react-router';
import AdminSideBar           from '../../components/AdminSideBar';
import { useState, useReducer } from 'react';
import type { Category }      from '../../types';
import {
  categoriesURL,
  ERROR,
  FAIL,
  SUCCESS
}                             from '../../core/endpoints';
import Notification           from '../../components/NotificationBadge';
import AdminCategoryModal     from '../../components/AdminCategoryModal';
import { getToken }           from '../../utilities/functions';

interface AdminCategoriesState {
  categories: Category[],
  notificationMessage: string|null,
}


const AdminCategories = (): React.ReactNode => {

  const preLoadedCategories = useLoaderData();

  const adminCategoriesState: AdminCategoriesState = {
    categories: preLoadedCategories.data,
    notificationMessage: null,
    
  }


  const [categories, setCategories]                     = useState<Category[]>(preLoadedCategories.data);

  const [notificationMessage, setNotificationMessage]   = useState<string|null>(null);

  // States required for AdminCategoryModal component.
  const [isModalOpen, setIsModalOpen]                   = useState(false);
  const [editingCategory, setEditingCategory]           = useState<Category | null>(null);
  const [modalMode, setModalMode]                       = useState<'create' | 'edit'>('create');


  const getAllCategories = async (): Promise<void> => {
    const data = await fetch(categoriesURL)
    .then(resp => resp.json())
    .then(response => {return response})
    .catch((error: any) => console.log('Error getAllCategories(): ', error));

    if (data.status && data.status === SUCCESS) {
      setCategories(data.data);
    }

    if (data.status && data.status === FAIL || data.status === ERROR) {
      // setCategories(null);
      setNotificationMessage(data.message);
    }

  }


  const handleCreateEditCategory = async (action: 'CREATE' | 'UPDATE', category: Category): Promise<void> => {
      const storedToken = getToken();

      if (!storedToken) return;

      const parsedToken = JSON.parse(storedToken);

    if (action === 'CREATE') {
      // Add your create logic here
      const data = await fetch(categoriesURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${parsedToken.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Stringify the object
          categoryName: category.category,
        })
      })
      .then(resp => resp.json())
      .then(response => {return response})
      .catch((error: any) => console.log('Error CREATE handleCreateEditCategory(): ', error));

      if (data.status && data.status === SUCCESS) {
        setCategories([...categories, {id: data.data.id, category: category.category}]);
        setNotificationMessage(data.message);
      }

      if (data.status && data.status === FAIL || data.status === ERROR) {
        console.log('Error handleCreateEditCategory(): ', data.message)
        setNotificationMessage(data.message);
      }

    } else {
      console.log('Updating category:', category);
      // Add your update logic here
      const data = await fetch(categoriesURL + category.id, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${parsedToken.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: category.category
        })
      })
      .then(resp => resp.json())
      .then(response => {return response})
      .catch((error: any) => console.log('Error CREATE handleCreateEditCategory(): ', error));

      if (data.status && data.status === SUCCESS) {
        setCategories(
          categories.map((cat: Category) => cat.id === category.id ? {...cat, category: category.category} : cat)
        );
        setNotificationMessage(data.message);
      }

      if (data.status && data.status === FAIL || data.status === ERROR) {
        console.log('Error handleCreateEditCategory(): ', data.message)
        setNotificationMessage(data.message);
      }

      console.log('data PATCH category', data);
    }

  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setModalMode('edit');
    setEditingCategory(category);
    setIsModalOpen(true);
  };


  const deleteCategory = async (id: number): Promise<void> => {

    const storedToken = getToken();

    if (!storedToken) return;

    const parsedToken = JSON.parse(storedToken);
    const data = await fetch(categoriesURL + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${parsedToken.token}`,
      }
    })
    .then(resp => resp.json())
    .then(response => {return response})
    .catch((error: any) => console.log('Error deleteCategory(): ', error));

    console.log('delete categories', data)

    if (data.status && data.status === SUCCESS) {
      setCategories(data.data);
      setNotificationMessage(data.message);
    }

    if (data.status && data.status === FAIL || data.status === ERROR) {
      console.log('Error deleteCategory(): ', data.message)
      setNotificationMessage(`Can\'t DELETE category: ${id}, as it has products to it.`);
    }
  }


  return (
    <div className="flex min-h-screen bg-gray-100 w-full">

      { notificationMessage && <Notification message={notificationMessage} onRemoveMessage={setNotificationMessage}/> }

      <AdminCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEditCategory}
        initialCategory={editingCategory}
        mode={modalMode}
      />

      <AdminSideBar>
        <div>
          <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded" onClick={getAllCategories}>All Categories</button>
        </div>
        <div>
          <button onClick={openCreateModal} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded">Add New Category</button>
        </div>
      </AdminSideBar>

      <div className="w-full mx-auto px-4 py-6 space-y-3 overflow-y-auto">

        <div className="space-y-2">
          {categories && categories.map((category) => (
            <div 
              key={category.id}
              className="w-full bg-white rounded-md p-3 flex justify-between items-center border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="text-gray-800 truncate pr-2">{category.category}</span>
              <div className="flex space-x-2 shrink-0">
                <button
                  onClick={() => openEditModal(category)}
                  className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded hover:bg-indigo-50 transition"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AdminCategories;