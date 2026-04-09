const FeatureCard = ({ title, desc, phase }) => {
    return (
      <div className="relative bg-[#111827] p-6 rounded-2xl border border-gray-800 group overflow-hidden">
  
        <p className="text-xs text-gray-400 mb-2">{phase}</p>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
  
      
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-center p-4">
          <p className="text-sm text-white">
            instruction for your proect
          </p>
        </div>
      </div>
    );
  };
  
  export default FeatureCard;