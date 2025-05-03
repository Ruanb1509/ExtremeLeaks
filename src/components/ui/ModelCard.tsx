import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock } from 'lucide-react';
import type { Model } from '../../types';
import { linkvertise } from '../Linkvertise/Linkvertise';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', { 
  //     month: 'short', 
  //     day: 'numeric', 
  //     year: 'numeric' 
  //   });
  // };


  const formatViews = (views: number) => {
    return new Intl.NumberFormat('en-US', { 
      notation: 'compact',
      maximumFractionDigits: 1 
    }).format(views);
  };

  useEffect(() => {
    linkvertise("1329936", { whitelist: ["localhost"]});
  }, []);

  return (
    <a 
      href={`#/model/${model.slug}`} 
      className="group block overflow-hidden bg-dark-200 rounded-lg shadow-md max-h-fit ntransition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={model.imageUrl} 
          alt={model.name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-300/90"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-lg text-white group-hover:text-primary-400 transition-colors mb-2">
            {model.name}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center">
              <Eye size={14} className="mr-1 text-primary-500" />
              <span>{formatViews(model.views)}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ModelCard;