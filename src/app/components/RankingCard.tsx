import { ThumbsUp, Share2, Quote } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface RankingCardProps {
  userName: string;
  userAvatar: string;
  ranking: number;
  testimonial: string;
  likedByAvatars: string[];
  likedByNames: string[];
  totalLikes: number;
}

export function RankingCard({
  userName,
  userAvatar,
  ranking,
  testimonial,
  likedByAvatars,
  likedByNames,
  totalLikes
}: RankingCardProps) {
  return (
    <div className="h-full bg-gradient-to-br from-red-50/80 via-orange-50/60 to-yellow-50/80 rounded-lg p-2 flex flex-col relative overflow-hidden ranking-card">
      {/* 跑马灯边框效果 */}
      <div className="absolute inset-0 rounded-lg border-2 border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse-glow"></div>
      <div className="absolute inset-0 rounded-lg border-2 border-transparent ranking-border-animate"></div>
      
      {/* 春节装饰元素 */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 rounded-full -translate-y-6 translate-x-6"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 bg-yellow-500/5 rounded-full translate-y-5 -translate-x-5"></div>
      
      {/* 头部 - 用户信息 - 高度约15px */}
      <div className="flex items-center gap-1 mb-1 relative z-10 h-[15px]">
        <span className="text-[9px] text-gray-600">恭喜</span>
        <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 ring-1.5 ring-red-400/60">
          <ImageWithFallback
            src={userAvatar}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[10px] font-bold text-red-700 truncate">{userName}</span>
        <span className="text-[9px] text-gray-600">登榜</span>
      </div>
      
      {/* 榜单标题和排名 - 融合模块 - 高度约30px */}
      <div className="mb-1 relative z-10 h-[30px] flex items-center">
        <div className="relative inline-flex items-center bg-gradient-to-r from-amber-100 via-yellow-50 to-red-600 rounded-md shadow-md overflow-hidden">
          {/* 左侧：榜单名称区域 */}
          <div className="relative px-2 py-1 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-r border-amber-300/50">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTEsMTkxLDM2LDAuMSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-50"></div>
            <span className="text-[11px] font-bold text-amber-800 relative z-10">全国最有实力老板</span>
          </div>
          
          {/* 右侧：排名数字区域 */}
          <div className="inline-flex items-baseline bg-gradient-to-r from-red-600 to-red-500 px-2 py-0.5">
            <span className="text-[9px] font-medium text-white mr-0.5">第</span>
            <span className="text-[22px] font-black tracking-tight leading-none text-white">{ranking.toLocaleString()}</span>
            <span className="text-[9px] font-semibold text-white ml-0.5">名</span>
          </div>
        </div>
      </div>

      {/* 中间 - 获奖感言 - 高度约20px */}
      <div className="mb-1 relative z-10 h-[20px] flex items-center">
        <div className="relative bg-white/30 border-l-2 border-red-300/50 rounded-r pl-2 pr-1 py-1 w-full">
          <Quote className="absolute top-1 left-0.5 h-2 w-2 text-red-300/60" />
          <p className="text-[9px] text-gray-500 leading-tight truncate pl-2 italic">
            {testimonial}
          </p>
        </div>
      </div>

      {/* 底部 - 点赞和分享 - 高度约18px */}
      <div className="flex items-center justify-between relative z-10 mt-auto h-[18px]">
        {/* 左侧：点赞区域 */}
        <div className="flex items-center gap-1">
          {/* 用户头像叠加 */}
          <div className="flex items-center -space-x-1">
            {likedByAvatars.slice(0, 3).map((avatar, index) => (
              <div 
                key={index}
                className="w-3.5 h-3.5 rounded-full overflow-hidden ring-1 ring-white"
              >
                <ImageWithFallback
                  src={avatar}
                  alt={`点赞用户${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* 点赞文字 */}
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] text-gray-600">
              {likedByNames[0]}等
            </span>
            <span className="text-[9px] font-bold text-red-600">
              {totalLikes.toLocaleString()}
            </span>
            <span className="text-[9px] text-gray-600">人点赞</span>
          </div>
        </div>

        {/* 右侧：分享按钮 */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            console.log('分享榜单');
          }}
          className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white/90 rounded-full text-[9px] font-medium text-red-600 border border-red-200/60 transition-all hover:shadow-sm"
        >
          <Share2 className="h-2.5 w-2.5" />
          <span>分享</span>
        </button>
      </div>
      
      <style>{`
        @keyframes border-flow {
          0% {
            border-image: linear-gradient(90deg, 
              transparent 0%, 
              rgba(239, 68, 68, 0.8) 25%, 
              rgba(239, 68, 68, 1) 50%, 
              rgba(239, 68, 68, 0.8) 75%, 
              transparent 100%) 1;
          }
          25% {
            border-image: linear-gradient(180deg, 
              transparent 0%, 
              rgba(239, 68, 68, 0.8) 25%, 
              rgba(239, 68, 68, 1) 50%, 
              rgba(239, 68, 68, 0.8) 75%, 
              transparent 100%) 1;
          }
          50% {
            border-image: linear-gradient(270deg, 
              transparent 0%, 
              rgba(239, 68, 68, 0.8) 25%, 
              rgba(239, 68, 68, 1) 50%, 
              rgba(239, 68, 68, 0.8) 75%, 
              transparent 100%) 1;
          }
          75% {
            border-image: linear-gradient(360deg, 
              transparent 0%, 
              rgba(239, 68, 68, 0.8) 25%, 
              rgba(239, 68, 68, 1) 50%, 
              rgba(239, 68, 68, 0.8) 75%, 
              transparent 100%) 1;
          }
          100% {
            border-image: linear-gradient(90deg, 
              transparent 0%, 
              rgba(239, 68, 68, 0.8) 25%, 
              rgba(239, 68, 68, 1) 50%, 
              rgba(239, 68, 68, 0.8) 75%, 
              transparent 100%) 1;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.4), 0 0 25px rgba(239, 68, 68, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 0 35px rgba(239, 68, 68, 0.3);
          }
        }
        
        .ranking-border-animate {
          animation: border-flow 3s linear infinite;
          border-width: 2px;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
