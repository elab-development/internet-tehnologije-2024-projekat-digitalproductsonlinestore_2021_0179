const CategoryCard = ({ category }) => {
  const icon = iconMap[category.slug] || <FaFileAlt size={32} />;

  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{category.name}</h3>
      <p className="category-description">{category.description}</p>
    </div>
  );
};

export default CategoryCard;
