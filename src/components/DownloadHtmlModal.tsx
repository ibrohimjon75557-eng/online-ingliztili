import React, { useState } from 'react';
import { Download, Copy, Check, FileCode, X, Eye } from 'lucide-react';
import { getStandaloneSingleHtml } from '../utils/singleHtmlTemplate';
import { sound } from '../utils/sound';

interface DownloadHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadHtmlModal: React.FC<DownloadHtmlModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewCode, setViewCode] = useState(false);

  if (!isOpen) return null;

  const htmlContent = getStandaloneSingleHtml();

  const handleDownload = () => {
    sound.playClick();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'star-rewards.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(htmlContent);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Bitta HTML Fayl Kodini Olish 📄
              </h3>
              <p className="text-xs text-slate-400">
                HTML + CSS + JS barchasi bitta faylda, hech qanday server yoki o‘rnatishsiz ishlaydi!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="py-4 space-y-4 flex-1 overflow-y-auto">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="font-semibold text-amber-300 flex items-center gap-2">
              <span>⭐</span>
              <span>Ushbu fayl nimalarni o‘z ichiga oladi:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Barcha HTML struktura, zamonaviy CSS dizayn va JavaScript mantiqi</li>
              <li>Barcha topshiriqlar: Saytga kirish (+1 ⭐), Kunlik bonus (+5 ⭐), Topshiriq (+3 ⭐), Promo-kod (+10 ⭐)</li>
              <li>Virtual sovg‘alar do‘koni (Snickers, Twix, KitKat, Coca-Cola, Mystery Box, Super Gift)</li>
              <li>Mening sovg‘alarim inventari va foydalanuvchi profili</li>
              <li>To‘liq <strong>localStorage</strong> orqali ma‘lumotlar saqlanishi</li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Yuklab olish (star-rewards.html)</span>
            </button>

            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Nusxalandi!' : 'Kodni nusxalash'}</span>
            </button>
          </div>

          <div>
            <button
              onClick={() => setViewCode(!viewCode)}
              className="text-xs text-slate-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{viewCode ? 'Kodni yashirish' : 'Kodni ko‘rish'}</span>
            </button>

            {viewCode && (
              <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-60 overflow-auto font-mono text-[11px] text-slate-300 select-all">
                <pre>{htmlContent}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
