import { X, Sparkles, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

export function RankingModal({ isOpen, onClose, onSubmit }: RankingModalProps) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* 弹窗内容 */}
      <div className="relative w-full max-w-sm bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* 春节装饰元素 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-500/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        {/* 顶部装饰条 - 加强版 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse-slow"></div>
        
        {/* 顶部榜单氛围区域 */}
        <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 pt-3 pb-4 overflow-hidden">
          {/* 背景装饰纹理 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-4 text-3xl animate-float">🏆</div>
            <div className="absolute top-3 right-8 text-2xl animate-float-delay">⭐</div>
            <div className="absolute bottom-2 left-1/3 text-xl animate-float">✨</div>
            <div className="absolute top-4 left-1/2 text-2xl animate-float-delay">🎯</div>
            <div className="absolute bottom-3 right-6 text-xl animate-float">💎</div>
          </div>
          
          {/* 光效 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 transition-all z-10 shadow-md"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          
          {/* 标题内容 */}
          <div className="relative z-10 text-center px-4">
            {/* 主标题 - 带发光效果 */}
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <Zap className="h-6 w-6 text-yellow-300 animate-pulse" />
              <h2 className="text-2xl font-black text-white drop-shadow-lg tracking-wide">
                打榜对掏
              </h2>
              <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
            </div>
            
            {/* 副标题徽章 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Trophy className="h-3.5 w-3.5 text-yellow-200" />
              <span className="text-sm font-bold text-white">冲击榜首·荣耀登顶</span>
            </div>
          </div>
        </div>
        
        {/* 内容区 */}
        <div className="relative z-10 p-4">
          {/* 输入区 */}
          <div className="mb-3">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="写下你的打榜宣言，展现你的实力与风采..."
                maxLength={100}
                className="w-full h-28 px-3 py-2.5 bg-white/90 backdrop-blur-sm border-2 border-red-200 rounded-xl text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white resize-none transition-all"
              />
              {/* 字数统计 */}
              <div className="absolute bottom-2.5 right-2.5 text-xs text-gray-400 font-medium">
                {message.length}/100
              </div>
            </div>
          </div>
          
          {/* 提示信息 */}
          <div className="mb-4 p-2.5 bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <p className="text-[13px] text-amber-800 leading-relaxed">
                打榜成功后你的感言会展示在<span className="font-bold">俱乐部首页</span>，让更多人看到你的风采！
              </p>
            </div>
          </div>
          
          {/* 底部按钮 */}
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="w-full py-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white font-bold text-[17px] rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all disabled:cursor-not-allowed relative overflow-hidden"
          >
            {/* 按钮光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <span className="relative z-10">立即打榜</span>
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @keyframes float-delay {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-5deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
