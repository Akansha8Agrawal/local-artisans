import React, { useState } from 'react';

const AddItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [seoTags, setSeoTags] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is where your friend's backend logic will go
    // For now, we'll just log the data to the console
    console.log({
      itemName,
      seoTags,
      description,
      file: selectedFile,
    });
    
    alert('Item details submitted for UI review! Check the console.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-lg shadow-xl border border-gray-200">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Add a New Craft Item
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the details below to add your item to our collection.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              id="item-name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="seo-tags" className="block text-sm font-medium text-gray-700">SEO Tags (comma-separated)</label>
            <input
              id="seo-tags"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500"
              value={seoTags}
              onChange={(e) => setSeoTags(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-48 h-auto rounded-lg shadow-md" />
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Submit Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;