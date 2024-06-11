import React from 'react'

interface MenuItemProps {
  title: string;
  description: string;
  imageUrl: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={imageUrl} alt={title} />
        </figure>
        <div className="px-3 py-2 h-20">
          <h2 className="text-base font-black">{title}</h2>
          <p className="text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
