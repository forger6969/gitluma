const ImageCard = ({ img, title, desc }) => {
    return (
      <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
  
        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
  
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition"></div>
  
       
        <div className="absolute bottom-6 left-6">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
  
     
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition p-6 text-center">
          <p className="text-gray-200">{desc}</p>
        </div>
      </div>
    );
  };
  
  export default ImageCard;