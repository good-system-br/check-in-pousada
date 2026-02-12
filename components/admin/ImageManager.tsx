/**
 * Gerenciador de Imagens
 */

import React from 'react';
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useTenant } from '../../contexts/TenantContext';

export const ImageManager: React.FC = () => {
  const { tenant } = useTenant();

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Upload de Imagens</h3>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-700 font-medium mb-2">
            Arraste imagens ou clique para fazer upload
          </p>
          <p className="text-sm text-slate-500">
            PNG, JPG ou WEBP (máx. 5MB por imagem)
          </p>
        </div>
      </div>

      {/* Current Images */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Imagens Atuais</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tenant?.images.welcome.map((img, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200"
            >
              <img
                src={img}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100">
                  <ImageIcon size={18} />
                </button>
                <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Logo da Pousada</h3>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-xl border-2 border-slate-200 flex items-center justify-center bg-slate-50">
            {tenant?.images.logo ? (
              <img
                src={tenant.images.logo}
                alt="Logo"
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <ImageIcon className="w-12 h-12 text-slate-300" />
            )}
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2 block">
              Upload Nova Logo
            </button>
            <p className="text-sm text-slate-500">
              Recomendado: 512x512px, fundo transparente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
