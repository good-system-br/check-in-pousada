/**
 * Customizador de Tema
 */

import React, { useState } from 'react';
import { Palette, Eye } from 'lucide-react';
import { useTenant } from '../../contexts/TenantContext';

export const ThemeCustomizer: React.FC = () => {
  const { tenant } = useTenant();
  const [colors, setColors] = useState({
    primary: tenant?.theme?.primaryColor || '#8B7355',
    secondary: tenant?.theme?.secondaryColor || '#A0826D',
    accent: tenant?.theme?.accentColor || '#C19A6B',
  });

  const presets = [
    { name: 'Clássico', primary: '#8B7355', secondary: '#A0826D', accent: '#C19A6B' },
    { name: 'Moderno', primary: '#1E3A5F', secondary: '#4A6FA5', accent: '#7B9EC6' },
    { name: 'Natureza', primary: '#2C5F2D', secondary: '#97BC62', accent: '#8FBC8F' },
    { name: 'Sunset', primary: '#FF6B6B', secondary: '#FFA07A', accent: '#FFD93D' },
  ];

  return (
    <div className="space-y-6">
      {/* Color Pickers */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Palette size={20} />
          Cores do Tema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cor Primária
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.primary}
                onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-200"
              />
              <input
                type="text"
                value={colors.primary}
                onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cor Secundária
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.secondary}
                onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-200"
              />
              <input
                type="text"
                value={colors.secondary}
                onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cor de Destaque
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.accent}
                onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-200"
              />
              <input
                type="text"
                value={colors.accent}
                onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Temas Pré-definidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setColors(preset)}
              className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-all"
            >
              <div className="flex gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: preset.primary }}
                ></div>
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: preset.secondary }}
                ></div>
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: preset.accent }}
                ></div>
              </div>
              <p className="font-semibold text-slate-900 text-sm">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Eye size={20} />
          Pré-visualização
        </h3>
        <div
          className="p-8 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          }}
        >
          <div className="bg-white rounded-xl p-6 max-w-md">
            <h4 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
              {tenant?.name}
            </h4>
            <p className="text-slate-600 mb-4">
              Esta é uma prévia de como as cores ficarão em seu aplicativo.
            </p>
            <button
              className="px-6 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: colors.accent }}
            >
              Botão de Ação
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Salvar Tema
        </button>
        <button className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-colors">
          Resetar
        </button>
      </div>
    </div>
  );
};
