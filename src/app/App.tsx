import { useState, useEffect, useRef } from 'react';
import { Home, ShoppingCart, User, Heart, Search, Keyboard, Mouse, Headphones, Monitor, Armchair, Gamepad2, Package, Users, Volume2, Gift } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ProductDetail } from '@/app/components/ProductDetail';
import { ProfilePage } from '@/app/components/ProfilePage';
import { RankingCard } from '@/app/components/RankingCard';

// 榜单活动数据
const rankingData = {
  userName: '权威之子',
  userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
  ranking: 19423,
  testimonial: '感谢大家对我的信任，我喜欢这个平台。',
  likedByAvatars: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  ],
  likedByNames: ['难言', '小明', '王芳'],
  totalLikes: 3211
};

// Banner数据 - 三个横向滑动的卡片
const banners = [
  {
    id: 1,
    type: 'ranking' as const, // 特殊类型：榜单活动
    title: '榜单活动',
    subtitle: '实力老板排行榜'
  },
  {
    id: 2,
    type: 'image' as const,
    image: 'https://images.unsplash.com/photo-1628089700970-0012c5718efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHJnYiUyMGxpZ2h0c3xlbnwxfHx8fDE3Njk2MjExMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: '游戏装备',
    subtitle: '打造专属战场'
  },
  {
    id: 3,
    type: 'image' as const,
    image: 'https://images.unsplash.com/photo-1759701547467-a54a5e86a4f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudCUyMGFyZW5hfGVufDF8fHx8MTc2OTU4NjUxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: '限时优��',
    subtitle: '全场5折起'
  }
];

// 商城分类数��
const mallCategories = [
  { 
    id: 1, 
    name: '游戏装备', 
    icon: Package,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200'
  },
  { 
    id: 2, 
    name: '游戏陪玩', 
    icon: Users,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200'
  }
];

// 通知消息数据
const notifications = [
  { id: 1, message: '恭喜用户 ***123 购买了机械键盘 RGB，获得50元优惠券' },
  { id: 2, message: '热门活动：电竞装备全场5折起，限时24小时' },
  { id: 3, message: '新品上架：专业电竞显示器 240Hz，首发特惠中' },
  { id: 4, message: '恭喜用户 ***456 参与集卡活动，赢取游戏手柄一个' },
  { id: 5, message: '系统公告：今日下单满299元包邮，晚8点抽奖送好礼' }
];

// 导航分类数据 - 电竞商品分类
const categories = [
  { id: 1, name: '键盘', icon: Keyboard },
  { id: 2, name: '鼠标', icon: Mouse },
  { id: 3, name: '耳机', icon: Headphones },
  { id: 4, name: '显示器', icon: Monitor },
  { id: 5, name: '座椅', icon: Armchair },
  { id: 6, name: '外设', icon: Gamepad2 }
];

// 电竞商品数据
const products = [
  {
    id: 1,
    name: '机械键盘 RGB',
    price: 599,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3Njk1ODY5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '键盘',
    sales: 2341,
    images: [
      'https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3Njk1ODY5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3Njk1ODY5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3Njk1ODY5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['高配版', '标准版', '基础版']
  },
  {
    id: 2,
    name: '电竞鼠标 Pro',
    price: 399,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1758179760225-570a13f7139d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGVzcG9ydHN8ZW58MXx8fHwxNzY5NjIxMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '鼠标',
    sales: 3156,
    images: [
      'https://images.unsplash.com/photo-1758179760225-570a13f7139d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGVzcG9ydHN8ZW58MXx8fHwxNzY5NjIxMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb3VzZSUyMGdhbWluZ3xlbnwxfHx8fDE3Mzg0MTU5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['专业版', '标准版']
  },
  {
    id: 3,
    name: '游戏耳机 7.1',
    price: 799,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1581310118098-898fd1e56f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0JTIwbWljcm9waG9uZXxlbnwxfHx8fDE3Njk2MTYwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '耳机',
    sales: 1876,
    images: [
      'https://images.unsplash.com/photo-1581310118098-898fd1e56f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0JTIwbWljcm9waG9uZXxlbnwxfHx8fDE3Njk2MTYwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['7.1环绕声', '立体声']
  },
  {
    id: 4,
    name: '电竞显示器 144Hz',
    price: 1999,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1616757857818-5c6eea38ee17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwc2NyZWVufGVufDF8fHx8MTc2OTYwNzYzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: '显示器',
    sales: 1234,
    images: [
      'https://images.unsplash.com/photo-1616757857818-5c6eea38ee17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwc2NyZWVufGVufDF8fHx8MTc2OTYwNzYzOXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['27英寸', '24英寸']
  },
  {
    id: 5,
    name: '电竞椅 人体工学',
    price: 1299,
    originalPrice: 1899,
    image: 'https://images.unsplash.com/photo-1551033541-2075d8363c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY5NTI1MDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '座椅',
    sales: 987,
    images: [
      'https://images.unsplash.com/photo-1551033541-2075d8363c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY5NTI1MDU0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['豪华版', '标准版', '基础版']
  },
  {
    id: 6,
    name: '游戏鼠标垫 RGB',
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1548030415-e1eb1c684c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXBhZCUyMGRlc2t8ZW58MXx8fHwxNzY5NTI0Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '外设',
    sales: 4532,
    images: [
      'https://images.unsplash.com/photo-1548030415-e1eb1c684c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXBhZCUyMGRlc2t8ZW58MXx8fHwxNzY5NTI0Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['大号', '中号', '小号']
  },
  {
    id: 7,
    name: '游戏手柄 无线',
    price: 349,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1644571580638-84dba624fa7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwY29uc29sZXxlbnwxfHx8fDE3Njk2MTk1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '外设',
    sales: 2678,
    images: [
      'https://images.unsplash.com/photo-1644571580638-84dba624fa7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwY29uc29sZXxlbnwxfHx8fDE3Njk2MTk1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['无线版', '有线版']
  },
  {
    id: 8,
    name: '游戏笔记本 RTX',
    price: 8999,
    originalPrice: 10999,
    image: 'https://images.unsplash.com/photo-1606625000171-fa7d471da28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk2MDk2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: '外设',
    sales: 856,
    images: [
      'https://images.unsplash.com/photo-1606625000171-fa7d471da28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk2MDk2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    specs: ['RTX 4060', 'RTX 3060']
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [visibleCategory, setVisibleCategory] = useState('全部'); // 跟踪当前可见的分类
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Banner自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  // 通知消息自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNotificationIndex((prev) => (prev + 1) % notifications.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  // 按分类分组商品
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category.name] = products.filter(p => p.category === category.name);
    return acc;
  }, {} as { [key: string]: typeof products });

  // 筛选商品
  const filteredProducts = selectedCategory === '全部' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // 设置Intersection Observer监听分类区域（仅在全部模式下）
  useEffect(() => {
    if (selectedCategory !== '全部') {
      setVisibleCategory(selectedCategory);
      return;
    }

    // 在全部模式下，监听各个分类区域
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 找到当前最可见的分类
        let maxRatio = 0;
        let mostVisibleCategory = '全部';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const categoryName = entry.target.getAttribute('data-category');
            if (categoryName) {
              mostVisibleCategory = categoryName;
            }
          }
        });
        
        if (maxRatio > 0.1) {
          setVisibleCategory(mostVisibleCategory);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-120px 0px -60% 0px'
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [selectedCategory]);

  // 点击分类
  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === '全部') {
      setSelectedCategory('全部');
      setVisibleCategory('全部');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (selectedCategory === '全部') {
      // 在全部模式下，只滚动到对应区域，不切换模式
      const element = categoryRefs.current[categoryName];
      if (element) {
        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      // 切换到其他分类
      setSelectedCategory(categoryName);
      setVisibleCategory(categoryName);
    }
  };

  // 如果选中了商品，显示商品详情页
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  // 渲染"我的"页面
  if (activeTab === 'profile') {
    return (
      <>
        <ProfilePage onOrderClick={(orderId) => console.log('Order clicked:', orderId)} />
        
        {/* 底部导航栏 - 简约现代设计 */}
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-lg border-t border-gray-100">
          <div className="grid grid-cols-3 gap-0 px-4 py-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className="flex flex-col items-center gap-0.5 py-2 relative transition-all duration-300"
            >
              {/* 选中指示器 */}
              {activeTab === 'home' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              )}
              
              <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                activeTab === 'home' ? '-translate-y-0.5' : ''
              }`}>
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                  activeTab === 'home' 
                    ? 'bg-blue-50' 
                    : ''
                }`}>
                  <Home className={`h-5 w-5 transition-all duration-300 ${
                    activeTab === 'home' 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <span className={`text-[11px] transition-all duration-300 ${
                  activeTab === 'home' 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-500'
                }`}>首页</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('lottery')}
              className="flex flex-col items-center gap-0.5 py-2 relative transition-all duration-300"
            >
              {/* 选中指示器 */}
              {activeTab === 'lottery' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-rose-600 rounded-full"></div>
              )}
              
              <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                activeTab === 'lottery' ? '-translate-y-0.5' : ''
              }`}>
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                  activeTab === 'lottery' 
                    ? 'bg-pink-50' 
                    : ''
                }`}>
                  <Gift className={`h-5 w-5 transition-all duration-300 ${
                    activeTab === 'lottery' 
                      ? 'text-pink-600' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <span className={`text-[11px] transition-all duration-300 ${
                  activeTab === 'lottery' 
                    ? 'text-pink-600 font-semibold' 
                    : 'text-gray-500'
                }`}>抽奖</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className="flex flex-col items-center gap-0.5 py-2 relative transition-all duration-300"
            >
              {/* 选中指示器 */}
              {activeTab === 'profile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
              )}
              
              <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                activeTab === 'profile' ? '-translate-y-0.5' : ''
              }`}>
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                  activeTab === 'profile' 
                    ? 'bg-purple-50' 
                    : ''
                }`}>
                  <User className={`h-5 w-5 transition-all duration-300 ${
                    activeTab === 'profile' 
                      ? 'text-purple-600' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <span className={`text-[11px] transition-all duration-300 ${
                  activeTab === 'profile' 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-500'
                }`}>我的</span>
              </div>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-10 bg-white px-4 py-2 shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 border border-gray-200">
          <Search className="h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索电竞装备..." 
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>

      {/* 活动区域 - 左边Banner + 右边活动入口 */}
      <div className="bg-white px-4 py-2">
        <div className="flex gap-2 h-[110px]">
          {/* 左边：Banner自动轮播 */}
          <div className="flex-1 overflow-hidden relative rounded-lg">
            {banners.map((banner, index) => (
              <div 
                key={banner.id} 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {banner.type === 'ranking' ? (
                  // 榜单活动卡片
                  <RankingCard {...rankingData} />
                ) : (
                  // 普通图片banner
                  <div className="relative h-full rounded-lg overflow-hidden shadow-sm">
                    <ImageWithFallback 
                      src={banner.image!} 
                      alt={banner.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h3 className="text-white text-sm mb-0.5">{banner.title}</h3>
                      <p className="text-gray-200 text-xs">{banner.subtitle}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* 指示器 */}
            <div className="absolute bottom-2 right-2 flex gap-1 z-10">
              {banners.map((_, index) => (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentBannerIndex 
                      ? 'bg-white w-4' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* 右边：活动入口 - 方形规整按钮 */}
          <div className="flex flex-col gap-2 w-[90px]">
            {/* 活动1：集卡活动 */}
            <button className="relative flex-1 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg overflow-hidden shadow-sm border border-orange-200">
              {/* 红点提示 */}
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-lg z-10"></div>
              
              <div className="h-full flex flex-col items-center justify-center p-2">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-1.5 shadow-sm">
                  <span className="text-xl">🎴</span>
                </div>
                <div className="text-xs font-bold text-gray-800 leading-tight">集卡活动</div>
                <div className="mt-0.5 text-[10px] text-orange-600 font-medium">赢好礼</div>
              </div>
            </button>
            
            {/* 活动2：打榜对掏 */}
            <button className="relative flex-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden shadow-sm border border-purple-200">
              {/* 红点提示 */}
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-lg z-10"></div>
              
              <div className="h-full flex flex-col items-center justify-center p-2">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-1.5 shadow-sm">
                  <span className="text-xl">🏆</span>
                </div>
                <div className="text-xs font-bold text-gray-800 leading-tight">打榜对掏</div>
                <div className="mt-0.5 text-[10px] text-purple-600 font-medium">冲榜位</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 通知滚动播报 */}
      <div className="bg-orange-50 px-4 py-2 border-y border-orange-100 mt-1.5">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 bg-orange-500 rounded-full p-1">
            <Volume2 className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="relative h-5">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`absolute inset-0 flex items-center transition-all duration-500 ${
                    index === currentNotificationIndex
                      ? 'opacity-100 translate-y-0'
                      : index < currentNotificationIndex
                      ? 'opacity-0 -translate-y-5'
                      : 'opacity-0 translate-y-5'
                  }`}
                >
                  <p className="text-xs text-gray-700 truncate">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 商城分类模块 - 游戏装备和游戏陪玩 */}
      <div className="bg-white px-4 py-2 mt-1.5">
        <div className="flex gap-6">
          {mallCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                className="flex items-center gap-2"
              >
                <IconComponent className={`h-6 w-6 ${category.iconColor}`} />
                <span className="text-sm text-gray-800">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 紧凑的分类导航 - 单行，吸顶 */}
      <div className="sticky top-[53px] z-10 bg-white px-4 py-2 border-b border-gray-200 shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => handleCategoryClick('全部')}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
              selectedCategory === '全部' && visibleCategory === '全部'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            全部
          </button>
          {categories.map((category) => {
            const isActive = selectedCategory === '全部' 
              ? visibleCategory === category.name 
              : selectedCategory === category.name;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 商品列表 */}
      <div className="px-4 py-2">
        {selectedCategory === '全部' ? (
          // 全部分类 - 按分类分组显示
          <>
            {categories.map((category) => {
              const categoryProducts = groupedProducts[category.name];
              if (!categoryProducts || categoryProducts.length === 0) return null;
              
              return (
                <div 
                  key={category.name}
                  ref={(el) => (categoryRefs.current[category.name] = el)}
                  data-category={category.name}
                  className="mb-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-base text-gray-800">{category.name}</h3>
                    <span className="text-xs text-gray-500">
                      {categoryProducts.length} 件
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    {categoryProducts.map((product) => (
                      <div 
                        key={product.id} 
                        onClick={() => setSelectedProduct(product)}
                        className="overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm"
                      >
                        <div className="relative aspect-square">
                          <ImageWithFallback 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 backdrop-blur-sm shadow-sm"
                          >
                            <Heart className="h-3.5 w-3.5 text-gray-600" />
                          </button>
                        </div>
                        <div className="p-2.5">
                          <h4 className="mb-1.5 text-sm text-gray-800 line-clamp-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-end gap-1.5">
                              <span className="text-base text-red-600">
                                ¥{product.price}
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                ¥{product.originalPrice}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {product.sales}销量
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          // 单个分类显示
          <>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base text-gray-800">{selectedCategory}</h3>
              <span className="text-xs text-gray-500">
                共 {filteredProducts.length} 件
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <div className="relative aspect-square">
                    <ImageWithFallback 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 backdrop-blur-sm shadow-sm"
                    >
                      <Heart className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-2">
                    <h4 className="mb-1 text-base text-gray-800 line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-end gap-1.5">
                        <span className="text-lg font-bold text-red-600">
                          ¥{product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ¥{product.originalPrice}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {product.sales}销量
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 底部导航栏 - 简约现代设计 */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-lg border-t border-gray-100">
        <div className="grid grid-cols-3 gap-0 px-4 py-1.5">
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center gap-0.5 py-2 relative transition-all duration-300"
          >
            {/* 选中指示器 */}
            {activeTab === 'home' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            )}
            
            <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
              activeTab === 'home' ? '-translate-y-0.5' : ''
            }`}>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                activeTab === 'home' 
                  ? 'bg-blue-50' 
                  : ''
              }`}>
                <Home className={`h-5 w-5 transition-all duration-300 ${
                  activeTab === 'home' 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`} />
              </div>
              <span className={`text-[11px] transition-all duration-300 ${
                activeTab === 'home' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-500'
              }`}>首页</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('lottery')}
            className="flex flex-col items-center gap-0.5 py-2 relative transition-all duration-300"
          >
            {/* 选中指示器 */}
            {activeTab === 'lottery' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-rose-600 rounded-full"></div>
            )}
            
            <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
              activeTab === 'lottery' ? '-translate-y-0.5' : ''
            }`}>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                activeTab === 'lottery' 
                  ? 'bg-pink-50' 
                  : ''
              }`}>
                <Gift className={`h-5 w-5 transition-all duration-300 ${
                  activeTab === 'lottery' 
                    ? 'text-pink-600' 
                    : 'text-gray-400'
                }`} />
              </div>
              <span className={`text-[11px] transition-all duration-300 ${
                activeTab === 'lottery' 
                  ? 'text-pink-600 font-semibold' 
                  : 'text-gray-500'
              }`}>抽奖</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center gap-0.5 py-2 relative transition-all duration-300"
          >
            {/* 选中指示器 */}
            {activeTab === 'profile' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
            )}
            
            <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
              activeTab === 'profile' ? '-translate-y-0.5' : ''
            }`}>
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                activeTab === 'profile' 
                  ? 'bg-purple-50' 
                  : ''
              }`}>
                <User className={`h-5 w-5 transition-all duration-300 ${
                  activeTab === 'profile' 
                    ? 'text-purple-600' 
                    : 'text-gray-400'
                }`} />
              </div>
              <span className={`text-[11px] transition-all duration-300 ${
                activeTab === 'profile' 
                  ? 'text-purple-600 font-semibold' 
                  : 'text-gray-500'
              }`}>我的</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
